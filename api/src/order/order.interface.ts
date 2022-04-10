import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import {Type} from "class-transformer";
import {Document} from "mongoose";

export class DishOrder {
  @IsString()
  readonly dishId!: string;
  @IsInt()
  @Min(0)
  @Max(1000000)
  readonly quantity!: number;
}

export type Order = {
  dishes: DishOrder[];
  client: string;
} & Document;

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => DishOrder)
  readonly dishes!: DishOrder[];

  @IsString()
  @MaxLength(255)
  readonly client!: string;
}
