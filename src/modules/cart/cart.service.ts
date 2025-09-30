import { BadRequestException, Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Cart, CartItem, ProductStatus } from '@prisma/client';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemRepository } from './repositories/cardItem.repository';
import { CartItemMessages } from './enums/cart-item-messages.enum';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { PrismaService } from '../prisma/prisma.service';

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

    return cart;
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
      include: { cart: true, product: true, productVariant: true },
    });
    return pagination(paginationDto, cartItems);
  }

  async addItem(userId: number, createCartItemDto: CreateCartItemDto): Promise<{ message: string; cartItem: CartItem }> {
    return this.prismaService.$transaction(async (prisma) => {
      const { quantity, productId, productVariantId } = createCartItemDto;

      if (productId && productVariantId) {
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
          OR: [{ productId }, { productVariantId }],
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

        cartItem = await prisma.cartItem.create({
          data: { ...createCartItemDto, cartId: cart.id },
          include: { product: true, productVariant: true },
        });
      }

      return { message: CartItemMessages.CreatedCartItemSuccess, cartItem };
    });
  }

  async addItems(userId: number, items: CreateCartItemDto[]): Promise<{ message: string; cartItems: CartItem[] }> {
    return this.prismaService.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
        include: { items: true },
      });

      const createdOrUpdatedItems: CartItem[] = [];

      const productIds = items.filter((item) => item.productId).map((item) => item.productId!);
      const productVariantIds = items.filter((item) => item.productVariantId).map((item) => item.productVariantId!);

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
        const { productId, productVariantId, quantity } = item;

        if (productId && productVariantId) {
          throw new BadRequestException(CartItemMessages.OneFailedAllowed);
        }

        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            OR: [{ productId }, { productVariantId }],
          },
          include: { product: true, productVariant: true },
        });

        if (existingCartItem) {
          const newQuantity = existingCartItem.quantity + quantity;

          if (productId) {
            const product = products.find((p) => p.id === productId);
            if (!product || product.quantity < newQuantity) {
              throw new BadRequestException(CartItemMessages.ProductNotAvailable);
            }
          }

          if (productVariantId) {
            const productVariant = productVariants.find((pv) => pv.id === productVariantId);
            if (!productVariant || productVariant.quantity < newQuantity) {
              throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);
            }
          }

          const updatedItem = await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: newQuantity },
            include: { product: true, productVariant: true },
          });

          createdOrUpdatedItems.push(updatedItem);
        } else {
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

          const newItem = await prisma.cartItem.create({
            data: { ...item, cartId: cart.id },
            include: { product: true, productVariant: true },
          });

          createdOrUpdatedItems.push(newItem);
        }
      }

      return { message: CartItemMessages.CreatedCartItemSuccess, cartItems: createdOrUpdatedItems };
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
        const { productId, productVariantId, quantity } = item;

        if (productId && productVariantId) {
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

        const createdItem = await prisma.cartItem.create({
          data: {
            ...item,
            cartId: cart.id,
          },
          include: { product: true, productVariant: true },
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
      include: { product: true, productVariant: true },
    });

    if (cartItem['product'] && cartItem['product']?.quantity < quantity)
      throw new BadRequestException(CartItemMessages.ProductNotAvailable);

    if (cartItem['productVariant'] && cartItem['productVariant']?.quantity < quantity)
      throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);

    const updatedCartItem = await this.cartItemRepository.update({ where: { id: cartItemId }, data: { quantity } });

    return { message: CartItemMessages.UpdatedCartItemSuccess, cartItem: updatedCartItem };
  }
}
