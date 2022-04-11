import {Controller, Get, Post, Param, Body, Put} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";

@ApiTags("dish")
@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find() {
    return this.userService.find();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.userService.findById(id);
  }
}
