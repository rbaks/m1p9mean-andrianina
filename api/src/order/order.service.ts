import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {CreateOrderDto, Order} from "./order.interface";
import {OrderNotFoundException} from "../common/exceptions";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel("Order") private readonly orderModel: Model<Order>,
  ) {}
  /**
   * Makes order
   */
  async create(createDish: CreateOrderDto): Promise<Order> {
    try {
      const dish = await this.orderModel.create({
        dishes: createDish.dishes,
        client: createDish.client,
      });

      return dish;
    } catch {
      throw Error(`Error making order.`);
    }
  }

  async find(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find({});
      return orders;
    } catch {
      throw new Error("Error retrieving orders.");
    }
  }

  async findById(id: string): Promise<Order> {
    const dish = await this.orderModel.findById(id);

    if (!dish) {
      throw OrderNotFoundException();
    }

    return dish;
  }
}
