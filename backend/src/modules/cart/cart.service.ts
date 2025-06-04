import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Cart, CartItem, ProductStatus } from '@prisma/client';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemRepository } from './repositories/cardItem.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ProductRepository } from '../product/repositories/product.repository';
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
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async me(userId: number): Promise<any> {
    const cart = await this.prismaService.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, salePrice: true, basePrice: true, mainImage: { select: { fileUrl: true } } },
            },
            productVariant: {
              select: {
                id: true,
                mainImage: true,
                salePrice: true,
                basePrice: true,
                product: { select: { name: true, mainImage: { select: { fileUrl: true } } } },
              },
            },
          },
        },
      },
    });

    return {
      cart,
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
      include: { cart: true, product: true, productVariant: true },
    });
    return pagination(paginationDto, cartItems);
  }

  async addItem(userId: number, createCartItemDto: CreateCartItemDto): Promise<{ message: string; cartItem: CartItem }> {
    const { quantity, productId, productVariantId } = createCartItemDto;

    if (productId && productVariantId) throw new BadRequestException(CartItemMessages.OneFailedAllowed);

    const existingCartItem = await this.cartItemRepository.findOne({ where: { OR: [{ productId }, { productVariantId }] } });

    if (existingCartItem) throw new ConflictException(CartItemMessages.AlreadyExistsCartItem);

    let cart = (await this.cartRepository.findOne({
      where: { userId },
      include: { items: { include: { product: true, productVariant: true } } },
    })) as any;

    if (!cart) await this.cartRepository.create({ data: { userId } });

    const product =
      productId && (await this.productRepository.findOneOrThrow({ where: { id: productId, status: ProductStatus.PUBLISHED } }));
    const productVariant = productVariantId && (await this.productVariantRepository.findOneOrThrow({ where: { id: productVariantId } }));

    if (product && product.quantity < quantity) throw new BadRequestException(CartItemMessages.ProductNotAvailable);
    if (productVariant && productVariant.quantity < quantity) throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);

    const newCartItem = await this.cartItemRepository.create({
      data: { ...createCartItemDto, cartId: cart.id },
      include: { product: true, productVariant: true },
    });

    return { message: CartItemMessages.CreatedCartItemSuccess, cartItem: newCartItem };
  }

  async addItems(userId: number, items: CreateCartItemDto[]): Promise<{ message: string; cartItems: CartItem[] }> {
    return this.prismaService.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
        include: { items: true },
      });

      const createdItems: CartItem[] = [];

      for (const item of items) {
        const { productId, productVariantId, quantity } = item;

        if (productId && productVariantId) throw new BadRequestException(CartItemMessages.OneFailedAllowed);

        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            OR: [{ productId }, { productVariantId }],
          },
        });

        if (existingCartItem) throw new ConflictException(CartItemMessages.AlreadyExistsCartItem);

        if (productId) {
          const product = await prisma.product.findFirst({
            where: { id: productId, status: ProductStatus.PUBLISHED },
          });

          if (!product || product.quantity < quantity) throw new BadRequestException(CartItemMessages.ProductNotAvailable);
        }

        if (productVariantId) {
          const productVariant = await prisma.productVariant.findFirst({
            where: { id: productVariantId },
          });

          if (!productVariant || productVariant.quantity < quantity)
            throw new BadRequestException(CartItemMessages.ProductVariantNotAvailable);
        }

        const newItem = await prisma.cartItem.create({
          data: { ...item, cartId: cart.id },
          include: { product: true, productVariant: true },
        });

        createdItems.push(newItem);
      }

      return { message: CartItemMessages.CreatedCartItemSuccess, cartItems: createdItems };
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
