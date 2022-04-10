import {Controller, Get, Post, Param, Body} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {ApiTags} from "@nestjs/swagger";
import {CreateDishDto} from "./dish.interface";
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
}
