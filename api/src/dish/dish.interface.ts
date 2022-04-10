import {IsInt, Max, MaxLength, Min} from "class-validator";
import {Document} from "mongoose";

export type DishPublicData = Readonly<{
  name: string;
  description: string;
  price: number;
}>;

export type DishMethods = {
  getPublicData: () => DishPublicData;
};

export type Dish = {
  name: string;
  description: string;
  price: number;
} & Document &
  DishMethods;

export class CreateDishDto {
  @MaxLength(255)
  readonly name!: string;

  @MaxLength(255)
  readonly description!: string;

  @IsInt()
  @Min(0)
  @Max(1000000)
  readonly price!: number;
}
