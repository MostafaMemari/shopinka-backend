import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Cart, CartItem } from 'generated/prisma';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemRepository } from './repositories/cardItem.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { CartItemMessages } from './enums/cart-item-messages.enum';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository
  ) { }

  async me(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { userId }, include: { items: true } })

    if (cart) return cart

    return this.cartRepository.create({ data: { userId }, include: { items: true } })
  }

  async clear(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOneOrThrow({ where: { userId } })

    return this.cartRepository.update({
      where: { userId },
      data: { items: { deleteMany: { cartId: cart.id } } },
      include: { items: true }
    })
  }

  async addItem(userId: number, createCartItemDto: CreateCartItemDto): Promise<{ message: string, cartItem: CartItem }> {
    const { quantity, productId, productVariantId } = createCartItemDto

    if (productId && productVariantId) throw new BadRequestException()

    const existingCartItem = await this.cartItemRepository.findOne({ where: { OR: [{ productId }, { productVariantId }] } })

    if (existingCartItem) throw new ConflictException()

    const cart = await this.cartRepository.findOneOrThrow({ where: { userId } })

    const product = productId && await this.productRepository.findOneOrThrow({ where: { id: productId } })
    const productVariant = productVariantId && await this.productVariantRepository.findOneOrThrow({ where: { id: productVariantId } })

    if (product && product.quantity < quantity) throw new BadRequestException()
    if (productVariant && productVariant.quantity < quantity) throw new BadRequestException()

    const newCartItem = await this.cartItemRepository.create({
      data: { ...createCartItemDto, cartId: cart.id },
      include: { product: true, productVariant: true }
    })

    return { message: CartItemMessages.CreatedCartItemSuccess, cartItem: newCartItem }
  }

  async removeItem(userId: number, cartItemId: number): Promise<{ message: string, cartItem: CartItem }> {
    await this.cartItemRepository.findOneOrThrow({ where: { id: cartItemId, cart: { userId } } })

    const removeCartItem = await this.cartItemRepository.delete({ where: { id: cartItemId } })

    return { message: CartItemMessages.RemovedCartItemSuccess, cartItem: removeCartItem }
  }

  async updateItem(userId: number, cartItemId: number, updateCartItemDto: UpdateCartItemDto): Promise<{ message: string, cartItem: CartItem }> {
    const { quantity } = updateCartItemDto

    const cartItem = await this.cartItemRepository.findOneOrThrow({
      where: { id: cartItemId, cart: { userId } },
      include: { product: true, productVariant: true }
    })

    if (cartItem['product'] && cartItem['product']?.quantity < quantity) throw new BadRequestException()
    if (cartItem['productVariant'] && cartItem['productVariant']?.quantity < quantity) throw new BadRequestException()

    const updatedCartItem = await this.cartItemRepository.update({ where: { id: cartItemId }, data: { quantity } })

    return { message: CartItemMessages.UpdatedCartItemSuccess, cartItem: updatedCartItem }
  }
}
