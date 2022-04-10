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
      });

      return dish;
    } catch {
      throw DishAlreadyExistsException();
    }
  }

  async findById(id: string): Promise<Dish> {
    const dish = await this.dishModel.findById(id);

    if (!dish) {
      throw DishNotFoundException();
    }

    return dish!;
  }

  async findByName(name: string): Promise<Dish> {
    const dish = await this.dishModel.findOne(
      {name: name.toLowerCase()},
      "+description",
    );

    if (!dish) {
      throw DishNotFoundException();
    }

    return dish!;
  }
}
