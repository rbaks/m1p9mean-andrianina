import {Controller, Get, Post, Param, Body, Put, Delete} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {ApiTags} from "@nestjs/swagger";
import {CreateRestaurantDto} from "./restaurant.interface";
import {RestaurantService} from "./restaurant.service";

@ApiTags("dish")
@Controller("api/restaurants")
export class RestaurantController {
  constructor(private readonly restauranServie: RestaurantService) {}

  @Post()
  create(@Body() resto: CreateRestaurantDto) {
    return this.restauranServie.create(resto);
  }

  @Get()
  find() {
    return this.restauranServie.find();
  }

  @Get("/:restaurantId")
  getById(@Param("restaurantId") restaurantId: string) {
    return this.restauranServie.findById(restaurantId);
  }

  @Put("/:restaurantId")
  update(
    @Param("restaurantId") restaurantId: string,
    @Body() body: {name: string},
  ) {
    return this.restauranServie.update(restaurantId, body.name);
  }

  @Delete("/:restaurantId")
  delete(@Param("restaurantId") restaurantId: string) {
    return this.restauranServie.delete(restaurantId);
  }
}
