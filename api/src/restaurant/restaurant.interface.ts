import {MaxLength} from "class-validator";
import {Document} from "mongoose";

export type Restaurant = {
  name: string;
} & Document;

export class CreateRestaurantDto {
  @MaxLength(255)
  readonly name!: string;
}
