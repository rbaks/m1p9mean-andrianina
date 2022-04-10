import {Module} from "@nestjs/common";
import {OrderController} from "./order.controller";
import {OrderModel} from "./order.model";
import {OrderService} from "./order.service";

@Module({
  imports: [OrderModel],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
