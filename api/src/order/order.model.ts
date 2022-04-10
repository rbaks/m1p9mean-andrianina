import {MongooseModule} from "@nestjs/mongoose";
import {OrderSchema} from "./order.schema";

export const OrderModel = MongooseModule.forFeature([
  {name: "Order", schema: OrderSchema},
]);
