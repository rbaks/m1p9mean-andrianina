import * as mongoose from "mongoose";
import {Restaurant} from "./restaurant.interface";

export const RestaurantSchema = new mongoose.Schema<Restaurant>(
  {
    name: {type: String, required: true, unique: true},
  },
  {timestamps: true},
);

/**
 * Methods.
 */
RestaurantSchema.methods.getPublicData = function () {
  const {name} = this;
  return {name};
};
