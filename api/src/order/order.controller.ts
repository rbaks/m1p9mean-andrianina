import {Controller, Get, Post, Param, Body} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {ApiTags} from "@nestjs/swagger";
import {CreateOrderDto, DishOrder} from "./order.interface";
import {OrderService} from "./order.service";
import {DishService} from "../dish/dish.service";
import {DishNotEnoughException} from "../common/exceptions";
import {InjectConnection} from "@nestjs/mongoose";
import {Connection} from "mongoose";

@ApiTags("dish")
@Controller("api/orders")
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly dishService: DishService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Post()
  async create(@Body() createOrder: CreateOrderDto) {
    console.log("Start session");

    const session = await this.connection.startSession();
    console.log("End Start session");
    let order;

    try {
      session.startTransaction();

      createOrder.dishes.forEach(async (dishOrder: DishOrder) => {
        const currDish = await this.dishService.findById(dishOrder.dishId);

        if (dishOrder.quantity > currDish.quantity)
          throw DishNotEnoughException();

        order = await this.orderService.create(createOrder);
        await this.dishService.incrementDecrement(
          dishOrder.dishId,
          dishOrder.quantity * -1,
        );
      });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`${error}`);
    }

    await session.endSession();
    return order;
  }

  @Get()
  find() {
    return this.orderService.find();
  }

  @Get("/:orderId")
  getById(@Param("orderId") orderId: string) {
    return this.orderService.findById(orderId);
  }

  waitForMongooseConnection() {
    return new Promise<void>(resolve => {
      const conn = this.connection;
      if (conn.readyState === 1) {
        resolve();
        return;
      }
      console.log(
        "Mongoose connection is not ready. Waiting for open or reconnect event.",
      );
      let resolved = false;
      const setResolved = () => {
        console.log(
          "Mongoose connection became ready. promise already resolved: " +
            resolved,
        );
        if (!resolved) {
          console.log("Resolving waitForMongooseConnection");
          resolved = true;
          resolve();
        }
      };
      this.connection.once("open", setResolved);
      this.connection.once("reconnect", setResolved);
    });
  }
}
