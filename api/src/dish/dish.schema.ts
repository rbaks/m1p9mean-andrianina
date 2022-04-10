import * as mongoose from "mongoose";
import {Dish} from "./dish.interface";

export const DishSchema = new mongoose.Schema<Dish>(
  {
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
  },
  {timestamps: true},
);

/**
 * Methods.
 */
DishSchema.methods.getPublicData = function () {
  const {name, description, price} = this;
  return {name, description, price};
};
