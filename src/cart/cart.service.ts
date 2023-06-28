import { BadGatewayException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { CreateCartItemDto } from './dto/create-cart.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Order } from 'src/orders/entities/order.entity';

import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entities/user.entity';





@Injectable()
export class CartService {

  // creamos variable privada logger  para manejar los errores en la consola de NEST 
  private readonly logger = new Logger('ProductService')

constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    private readonly orderService: OrdersService, 

    private productRepository: ProductsService,

    private readonly productsService: ProductsService


  ) {}
 
// Metodo para calcular el total de la factura 
  async calculateCartTotal(cart: Cart): Promise<number> {  
  let totalAmount = 0;

  if ( cart.items.length > 0) //  verifica si el carro tiene items antes de ejecutar la función 
  {
    for (const item of cart.items){
      console.log(item)
      if (item.product && item.product.id) {
      const product = await this.productsService.findOne(item.product.id);
      console.log(product)
      totalAmount += item.price * item.quantity;
    }
  }
  }
  else{
    console.log(totalAmount)
  }
  return totalAmount;
}


  //  metodo cuando  el usuario realiza la compra y la enviamos a la tabla de orden 
  async placeOrder(@GetUser() user: User): Promise<Order> {
    console.log(user)
   
    try {    
      const cart = await this.cartRepository.findOne(
      { where: { user: { id: user.id } } , 
        relations: ['items', 'user'] });

    const totalAmount = await this.calculateCartTotal(cart);
        console.log(cart)
    const order = new Order();
    // order.totalAmount = totalAmount;
    order.user = cart.user;

    await this.orderService.createOrder(order, cart.items);

    // Limpiar el carrito de compras
    cart.items = [];
    // cart.totalAmount = 0;
    await this.cartRepository.save(cart);

    return order;
    } 
 
   catch (error) {
  
  this.handleException(error)
     
    }
  }

// metodo para cargar tabla de carro de compras por usuario 

   async addItemToCart(createCartItemDto: CreateCartItemDto, @GetUser() user: User) {
    const { productId, quantity } = createCartItemDto;

    // Buscar el carrito del usuario
    const cart = await this.cartRepository.findOne({ where: { user: { id: user.id } } });

    if (cart) {
      // Verificar si el producto ya está en el carrito
      const existingCartItem = await this.cartItemRepository.findOne({
        where: { cart: { id: cart.id } , product: { id: productId } },
      });

      if (existingCartItem) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        existingCartItem.quantity += quantity;
        await this.cartItemRepository.save(existingCartItem);
        return  { message:' Item Updated '}
      } 
      else {
        // Si el producto no está en el carrito, crear un nuevo item
        const product = await this.productRepository.findOne(productId); // Obtener el producto
        const newCartItem = this.cartItemRepository.create({
          cart,
          product:{ id: productId },
          quantity,
          price: product.price,
        });
        await this.cartItemRepository.save(newCartItem);
        return newCartItem 
      }
    } else {
      // Si el usuario no tiene un carrito, crear uno y agregar el item
      const product = await this.productRepository.findOne(productId); // Obtener el producto
      const newCart = this.cartRepository.create({ user });
      await this.cartRepository.save(newCart);

      const newCartItem = this.cartItemRepository.create({
        cart: newCart,
        product:{ id: productId },
        quantity,
        price: product.price,
      });
      await this.cartItemRepository.save(newCartItem);
      return newCartItem 
    }

    return { message: 'Item added to cart successfully' };
  }



  // creacion de metodo privado de manejo de errores 
  private handleException (error:any)  {
    if (error.code === '23505')
    throw new BadGatewayException(error.detail);
    
    
    this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, Check Server Logs')

  }

}
