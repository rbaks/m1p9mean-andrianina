import {MongooseModule} from "@nestjs/mongoose";
import {DishSchema} from "./dish.schema";

export const DishModel = MongooseModule.forFeature([
  {name: "Dish", schema: DishSchema},
]);
