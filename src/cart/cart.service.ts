import { BadGatewayException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { MessagesWsModule } from "./../messages-ws/messages-ws.module";

import { CreateCartItemDto } from './dto/create-cart.dto';

import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';

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


  ) {}
 
// metodo para cargar tabla de carro de compras por usuario 

   async addItemToCart(createCartItemDto: CreateCartItemDto, @GetUser() user: User) {
    const { productId, quantity } = createCartItemDto;
    const product = await this.productRepository.findOne(productId); // Obtener el product
    const totalAmount = await this.calculateItemTotal(product.price,quantity) //calculamos el total por item 

    // Buscar el carrito del usuario => llamamos al metodo privado para buscar el carrito del usuario 
    const cart = await this.getCartByUser(user)

    if (cart) {
      // Verificar si el producto ya está en el carrito
      const existingCartItem = await this.cartItemRepository.findOne({
        where: { cart: { id: cart.id } , product: { id: productId } },
      });

      if (existingCartItem) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        //actualizamos la cantidad el item 
        existingCartItem.quantity += quantity;

        //llamamos nuevamente a la funcion de calculo del total del item y lo actualizamos 
        existingCartItem.itemAmount = await this.calculateItemTotal(existingCartItem.price, existingCartItem.quantity); 
        await this.cartItemRepository.save(existingCartItem);
        return  existingCartItem

      } 
      else {
        // Si el producto no está en el carrito, crear un nuevo item
       
        const newCartItem = this.cartItemRepository.create({
          cart,
          product:{ id: productId },
          quantity,
          price: product.price,
          itemAmount: totalAmount,
        });
        await this.cartItemRepository.save(newCartItem);
        return newCartItem 
      }
    } else {
      // Si el usuario no tiene un carrito, crear uno y agregar el item
      const newCart = this.cartRepository.create({ user });
      await this.cartRepository.save(newCart);

      const newCartItem = this.cartItemRepository.create({
        cart: newCart,
        product:{ id: productId },
        quantity,
        price: product.price,
        itemAmount: totalAmount,
      });
      await this.cartItemRepository.save(newCartItem);
      return newCartItem ;
     
    }
  }


  
//metodo cuando  el usuario realiza la compra y la enviamos a la tabla de orden 
async placeOrder(user: User) {

    // Leer el carrito y los items asociados al usuario
    const cart = await this.getCartByUser(user);
    if (!cart.items) {
    throw new Error('El carrito no tiene items.');
    }
    const items = cart.items;
      

      // Calcular el totalAmount de los items
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += Number(item.itemAmount);  // la función Number() garantiza que los números se sumen y no que se concatenen 
     
    }

    // Crear la orden y guardarla en la base de datos
    const order = new Order();
    order.user = user; // Asignar el usuario correspondiente
    order.totalAmount = totalAmount;  // Asignamos el valor de la sumatoria total 
    // console.log (order)

    // Llama al método createOrder del servicio OrdersService
    const createdOrder = await this.orderService.createOrder(order, items);
    
    // Limpiar el carrito
    await this.clearCart(user);

    return createdOrder;
  }


    
  
  
  
  
  
  // creacion de metodo privado de manejo de errores 
  private handleException (error:any)  {
    if (error.code === '23505')
    throw new BadGatewayException(error.detail);
    
    
    this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, Check Server Logs')

  }

  
// Metodo para calcular el total por item
private async calculateItemTotal(price,quantity) {
  let totalAmount = 0;
        totalAmount += price * quantity;
        return totalAmount;
      }

// Metodo para calcular el total Carrito //SIN USO 
private  async calculateAmountTotal(items) {
   // Calcular el totalAmount de los items
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += Number(item.itemAmount);  // la función Number() garantiza que los números se sumen y no que se concatenen 
     
    }}

//meotodo para limpiar el carro del usuario 
private async clearCart(user: User) {
  // Encuentra el carrito del usuario
  const cart = await this.cartRepository.findOne({ where: { user: { id: user.id }} });
   if (cart) {
   // Borra el carrito y gracias al método CASCADE se borran los items relacionados 
   await this.cartRepository.remove(cart);
   return 'This cart was Remove'
  }
  else {
    return 'Cart user not Found'
  }
}

// Buscar el carrito del usuario y los items del carrito 
private async getCartByUser(user: User): Promise<Cart> {
  // console.log (user)
  //buscamos el carro por el ID y devolvemos el carro con los Items en un arreglo relacional
  // TODO! Solucionar Bug al querer hacer place Order a un carrito vacio 
 const cart = await this.cartRepository.findOne({ where: { user: { id: user.id } }, 
  relations:['items']}); 
   // console.log(cart) 
 return cart;
}
}