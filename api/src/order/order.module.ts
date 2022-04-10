import {Module} from "@nestjs/common";
import {DishModel} from "../dish/dish.model";
import {DishService} from "../dish/dish.service";
import {OrderController} from "./order.controller";
import {OrderModel} from "./order.model";
import {OrderService} from "./order.service";

@Module({
  imports: [OrderModel, DishModel],
  providers: [OrderService, DishService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
