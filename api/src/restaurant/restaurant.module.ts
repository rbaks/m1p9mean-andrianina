import {Module} from "@nestjs/common";
import {RestaurantController} from "./restaurant.controller";
import {RestaurantModel} from "./restaurant.model";
import {RestaurantService} from "./restaurant.service";

@Module({
  imports: [RestaurantModel],
  providers: [RestaurantService],
  controllers: [RestaurantController],
  exports: [RestaurantService],
})
export class RestaurantModule {}
