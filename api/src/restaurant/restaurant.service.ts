import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {
  RestaurantAlreadyExistsException,
  RestoNotFoundException,
} from "../common/exceptions";
import {CreateRestaurantDto, Restaurant} from "./restaurant.interface";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel("Restaurant")
    private readonly restaurantModel: Model<Restaurant>,
  ) {}
  /**
   * Creates restaurant
   * @throws duplicate key error when
   */
  async create(createResto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const resto = await this.restaurantModel.create({
        name: createResto.name,
      });

      return resto;
    } catch {
      throw RestaurantAlreadyExistsException();
    }
  }

  async find(): Promise<Restaurant[]> {
    try {
      const restos = await this.restaurantModel.find({});
      return restos;
    } catch {
      throw new Error("Error retrieving dishes.");
    }
  }

  async findById(id: string): Promise<Restaurant> {
    const resto = await this.restaurantModel.findById(id);

    if (!resto) {
      throw RestoNotFoundException();
    }

    return resto;
  }

  async findByName(name: string): Promise<Restaurant> {
    const resto = await this.restaurantModel.findOne({
      name: name.toLowerCase(),
    });

    if (!resto) {
      throw RestoNotFoundException();
    }

    return resto;
  }

  async update(id: string, _name: string) {
    return await this.restaurantModel.findByIdAndUpdate(
      {_id: id},
      {name: _name},
    );
  }

  async delete(restaurantId: string) {
    return await this.restaurantModel.findByIdAndDelete({_id: restaurantId});
  }
}
