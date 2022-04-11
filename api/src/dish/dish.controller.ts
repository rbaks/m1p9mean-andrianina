import {Controller, Get, Post, Param, Body, Put, Delete} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {ApiTags} from "@nestjs/swagger";
import {CreateDishDto, Dish} from "./dish.interface";
import {DishService} from "./dish.service";

@ApiTags("dish")
@Controller("api/dishes")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  create(@Body() dish: CreateDishDto) {
    return this.dishService.create(dish);
  }

  @Get()
  find() {
    return this.dishService.find();
  }

  @Get("/:dishId")
  getById(@Param("dishId") dishId: string) {
    return this.dishService.findById(dishId);
  }

  @Delete("/:dishId")
  delete(@Param("dishId") dishId: string) {
    return this.dishService.delete(dishId);
  }

  @Put("/:dishId")
  update(@Param("dishId") dishId: string, @Body() body: Dish) {
    return this.dishService.update(dishId, body);
  }

  @Post("/:dishId/incdec")
  addRemove(@Param("dishId") dishId: string, @Body() body: {quantity: number}) {
    return this.dishService.incrementDecrement(dishId, body.quantity);
  }
}
