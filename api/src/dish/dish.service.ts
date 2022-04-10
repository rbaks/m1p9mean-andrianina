import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {CreateDishDto, Dish} from "./dish.interface";
import {
  DishAlreadyExistsException,
  DishNotFoundException,
} from "../common/exceptions";

@Injectable()
export class DishService {
  constructor(@InjectModel("Dish") private readonly dishModel: Model<Dish>) {}
  /**
   * Creates dish
   * @throws duplicate key error when
   */
  async create(createDish: CreateDishDto): Promise<Dish> {
    try {
      const dish = await this.dishModel.create({
        name: createDish.name,
        description: createDish.description,
        price: createDish.price,
        quantity: createDish.quantity,
      });

      return dish;
    } catch {
      throw DishAlreadyExistsException();
    }
  }

  async find(): Promise<Dish[]> {
    try {
      const dishes = await this.dishModel.find({});
      return dishes;
    } catch {
      throw new Error("Error retrieving dishes.");
    }
  }

  async findById(id: string): Promise<Dish> {
    const dish = await this.dishModel.findById(id);

    if (!dish) {
      throw DishNotFoundException();
    }

    return dish;
  }

  async findByName(name: string): Promise<Dish> {
    const dish = await this.dishModel.findOne(
      {name: name.toLowerCase()},
      "+description",
    );

    if (!dish) {
      throw DishNotFoundException();
    }

    return dish;
  }

  async incrementDecrement(id: string, qtt: number) {
    try {
      return await this.dishModel.findOneAndUpdate(
        {_id: id},
        {$inc: {quantity: qtt}},
      );
    } catch (error) {
      throw new Error(`Error changing dish quantity. ${error}`);
    }
  }
}
