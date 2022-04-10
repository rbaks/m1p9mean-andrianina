import {Controller, Get, Post, Param, Body} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {ApiTags} from "@nestjs/swagger";
import {CreateOrderDto} from "./order.interface";
import {OrderService} from "./order.service";

@ApiTags("dish")
@Controller("api/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }

  @Get()
  find() {
    return this.orderService.find();
  }

  @Get("/:orderId")
  getById(@Param("orderId") orderId: string) {
    return this.orderService.findById(orderId);
  }
}
