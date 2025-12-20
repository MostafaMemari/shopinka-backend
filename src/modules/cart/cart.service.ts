import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Cart, CartItem, ProductStatus } from '@prisma/client';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemRepository } from './repositories/cardItem.repository';
import { CartItemMessages } from './enums/cart-item-messages.enum';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { PrismaService } from '../prisma/prisma.service';
import { calculateCartTotal } from 'src/common/utils/functions.utils';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async me(userId: number) {
    const cart = await this.prismaService.cart.findFirst({
      where: { userId },
      include: {
        items: {
          orderBy: { createdAt: 'desc' },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                type: true,
                salePrice: true,
                basePrice: true,
                mainImage: { select: { fileUrl: true } },
              },
            },
            customSticker: {
              select: {
                id: true,
                finalPrice: true,
                lines: true,
                previewImage: { select: { fileUrl: true } },
                material: { select: { name: true, surface: true, colorCode: true } },
                font: { select: { displayName: true } },
              },
            },
            productVariant: {
              select: {
                id: true,
                salePrice: true,
                basePrice: true,
                product: {
                  select: {
                    name: true,
                    type: true,
                    mainImage: { select: { fileUrl: true } },
                    slug: true,
                  },
                },
                attributeValues: {
                  select: { name: true, colorCode: true, buttonLabel: true },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) return null;

    const payablePrice = calculateCartTotal(cart.items);

    return {
      payablePrice,
      ...cart,
    };
  }

  async clear(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOneOrThrow({ where: { userId } });

    return this.cartRepository.update({
      where: { userId },
      data: { items: { deleteMany: { cartId: cart.id } } },
      include: { items: true },
    });
  }

  async findAllItems(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    await this.cartRepository.findOneOrThrow({ where: { userId } });

    const cartItems = await this.cartItemRepository.findAll({
      where: { cart: { userId } },
      include: { cart: true, product: true, productVariant: true, customSticker: true },
    });
    return pagination(paginationDto, cartItems);
  }

  async addItem(userId: number, createCartItemDto: CreateCartItemDto): Promise<{ message: string; cartItem: CartItem }> {
    return this.prismaService.$transaction(async (prisma) => {
      const { quantity, productId, productVariantId, customStickerId } = createCartItemDto;

      const items = [productId, productVariantId, customStickerId];

      if (items.filter((item) => typeof item == 'number').length !== 1) {
        throw new BadRequestException(CartItemMessages.OneFailedAllowed);
      }

      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
        include: { items: true },
      });

      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          OR: [{ productId }, { productVariantId }, { customStickerId }],
        },
        include: { product: true, productVariant: true },
      });

      let cartItem: CartItem;

      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + quantity;

        if (productId && existingCartItem.product?.quantity < newQuantity) {
          throw new BadRequestException(CartItemMessages.ProductNotAvailable);
        }
        if (productVariantId && existingCartItem.productVariant?.quantity < newQuantity) {
          throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);
        }

        cartItem = await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: newQuantity },
          include: { product: true, productVariant: true },
        });
      } else {
        if (productId) {
          const product = await prisma.product.findFirst({
            where: { id: productId, status: ProductStatus.PUBLISHED },
          });
          if (!product || product.quantity < quantity) {
            throw new BadRequestException(CartItemMessages.ProductNotAvailable);
          }
        }

        if (productVariantId) {
          const productVariant = await prisma.productVariant.findFirst({
            where: { id: productVariantId },
          });
          if (!productVariant || productVariant.quantity < quantity) {
            throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);
          }
        }

        if (customStickerId) {
          const customSticker = await prisma.customSticker.findFirst({ where: { id: customStickerId } });
          if (!customSticker) throw new NotFoundException(CartItemMessages.NotFoundCustomSticker);
        }

        cartItem = await prisma.cartItem.create({
          data: { ...createCartItemDto, cartId: cart.id },
          include: { product: true, productVariant: true, customSticker: true },
        });
      }

      return { message: CartItemMessages.CreatedCartItemSuccess, cartItem };
    });
  }

  async addItems(
    userId: number,
    items: CreateCartItemDto[],
    options?: { systemMode?: boolean },
  ): Promise<{ message: string; cartItems: CartItem[] }> {
    const systemMode = options?.systemMode ?? false;

    return this.prismaService.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
        include: { items: true },
      });

      const createdOrUpdatedItems: CartItem[] = [];

      const productIds = items.filter((i) => i.productId).map((i) => i.productId!);
      const productVariantIds = items.filter((i) => i.productVariantId).map((i) => i.productVariantId!);
      const customStickerIds = items.filter((i) => i.customStickerId).map((i) => i.customStickerId!);

      const products = productIds.length
        ? await prisma.product.findMany({
            where: { id: { in: productIds }, status: ProductStatus.PUBLISHED },
          })
        : [];

      const productVariants = productVariantIds.length
        ? await prisma.productVariant.findMany({
            where: { id: { in: productVariantIds } },
          })
        : [];

      for (const item of items) {
        const { productId, productVariantId, customStickerId, quantity } = item;

        const definedCount = [productId, productVariantId, customStickerId].filter((v) => typeof v === 'number').length;
        if (definedCount !== 1) {
          if (!systemMode) {
            throw new BadRequestException(CartItemMessages.OneFailedAllowed);
          }
          continue;
        }

        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            ...(productId && { productId }),
            ...(productVariantId && { productVariantId }),
            ...(customStickerId && { customStickerId }),
          },
        });

        const newQuantity = existingCartItem ? existingCartItem.quantity + quantity : quantity;

        if (productId) {
          const product = products.find((p) => p.id === productId);
          if (!product || product.quantity < newQuantity) {
            if (!systemMode) {
              throw new BadRequestException(CartItemMessages.ProductNotAvailable);
            }
            continue;
          }
        }

        if (productVariantId) {
          const variant = productVariants.find((v) => v.id === productVariantId);
          if (!variant || variant.quantity < newQuantity) {
            if (!systemMode) {
              throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);
            }
            continue;
          }
        }

        if (existingCartItem) {
          const updatedItem = await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: newQuantity },
            include: { product: true, productVariant: true, customSticker: true },
          });
          createdOrUpdatedItems.push(updatedItem);
        } else {
          const newItem = await prisma.cartItem.create({
            data: { ...item, cartId: cart.id },
            include: { product: true, productVariant: true, customSticker: true },
          });
          createdOrUpdatedItems.push(newItem);
        }
      }

      return {
        message: CartItemMessages.CreatedCartItemSuccess,
        cartItems: createdOrUpdatedItems,
      };
    });
  }

  async replaceCartItems(userId: number, items: CreateCartItemDto[]): Promise<{ message: string; cartItems: CartItem[] }> {
    return this.prismaService.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      const createdItems: CartItem[] = [];

      const productIds = items.filter((item) => item.productId).map((item) => item.productId!);
      const productVariantIds = items.filter((item) => item.productVariantId).map((item) => item.productVariantId!);
      const customStickerIds = items.filter((item) => item.customStickerId).map((item) => item.customStickerId!);

      const products = productIds.length
        ? await prisma.product.findMany({
            where: { id: { in: productIds }, status: ProductStatus.PUBLISHED },
          })
        : [];

      const productVariants = productVariantIds.length
        ? await prisma.productVariant.findMany({
            where: { id: { in: productVariantIds } },
          })
        : [];

      const customStickers = customStickerIds.length
        ? await prisma.customSticker.findMany({
            where: { id: { in: customStickerIds } },
          })
        : [];

      for (const item of items) {
        const { productId, productVariantId, quantity, customStickerId } = item;

        const items = [productId, productVariantId, customStickerId];

        if (items.filter((item) => typeof item == 'number').length !== 1) {
          throw new BadRequestException(CartItemMessages.OneFailedAllowed);
        }

        if (productId) {
          const product = products.find((p) => p.id === productId);
          if (!product || product.quantity < quantity) {
            throw new BadRequestException(CartItemMessages.ProductNotAvailable);
          }
        }

        if (productVariantId) {
          const productVariant = productVariants.find((pv) => pv.id === productVariantId);
          if (!productVariant || productVariant.quantity < quantity) {
            throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);
          }
        }

        if (customStickerId) {
          const customSticker = await prisma.customSticker.findFirst({ where: { id: customStickerId } });
          if (!customSticker) throw new NotFoundException(CartItemMessages.NotFoundCustomSticker);
        }

        const createdItem = await prisma.cartItem.create({
          data: {
            ...item,
            cartId: cart.id,
          },
          include: { product: true, productVariant: true, customSticker: true },
        });

        createdItems.push(createdItem);
      }

      return {
        message: CartItemMessages.ReplacedCartItemsSuccess,
        cartItems: createdItems,
      };
    });
  }

  async removeItem(userId: number, cartItemId: number): Promise<{ message: string; cartItem: CartItem }> {
    await this.cartRepository.findOneOrThrow({ where: { userId } });
    await this.cartItemRepository.findOneOrThrow({ where: { id: cartItemId, cart: { userId } } });

    const removeCartItem = await this.cartItemRepository.delete({ where: { id: cartItemId } });

    return { message: CartItemMessages.RemovedCartItemSuccess, cartItem: removeCartItem };
  }

  async updateItem(
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<{ message: string; cartItem: CartItem }> {
    const { quantity } = updateCartItemDto;

    await this.cartRepository.findOneOrThrow({ where: { userId } });

    const cartItem = await this.cartItemRepository.findOneOrThrow({
      where: { id: cartItemId, cart: { userId } },
      include: { product: true, productVariant: true, customSticker: true },
    });

    if (cartItem['product'] && cartItem['product']?.quantity < quantity)
      throw new BadRequestException(CartItemMessages.ProductNotAvailable);

    if (cartItem['productVariant'] && cartItem['productVariant']?.quantity < quantity)
      throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);

    const updatedCartItem = await this.cartItemRepository.update({ where: { id: cartItemId }, data: { quantity } });

    return { message: CartItemMessages.UpdatedCartItemSuccess, cartItem: updatedCartItem };
  }
}
