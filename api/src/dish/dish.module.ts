import {Module} from "@nestjs/common";
import {DishController} from "./dish.controller";

import {DishModel} from "./dish.model";
import {DishService} from "./dish.service";

@Module({
  imports: [DishModel],
  providers: [DishService],
  controllers: [DishController],
  exports: [DishService],
})
export class DishModule {}
