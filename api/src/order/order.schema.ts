import * as mongoose from "mongoose";
import {Order} from "./order.interface";

export const OrderSchema = new mongoose.Schema<Order>(
  {
    dishes: [
      {
        dishId: {type: String, required: true},
        quantity: {type: Number, required: true},
      },
    ],
    client: {type: String, required: true},
  },
  {timestamps: true},
);

/**
 * Methods.
 */
OrderSchema.methods.getPublicData = function () {
  const {dishes, client} = this;
  return {dishes, client};
};
