import {MongooseModule} from "@nestjs/mongoose";
import {RestaurantSchema} from "./restaurant.schema";

export const RestaurantModel = MongooseModule.forFeature([
  {name: "Restaurant", schema: RestaurantSchema},
]);
