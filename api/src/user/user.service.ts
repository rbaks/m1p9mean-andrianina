import {Model} from "mongoose";
import {v4 as uuid} from "uuid";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import config from "../config";
import {hashPassword} from "../common/auth";
import {
  UserNotFoundException,
  EmailAlreadyUsedException,
  PasswordResetTokenInvalidException,
  ActivationTokenInvalidException,
} from "../common/exceptions";

import {User} from "./user.interface";
import {UserMailerService} from "./user.mailer.service";
import {Role} from "src/auth/auth.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly userMailer: UserMailerService,
  ) {}
  /**
   * Creates user and sends activation email.
   * @throws duplicate key error when
   */
  async create(
    email: string,
    password: string,
    role: Role,
    origin: string,
  ): Promise<User> {
    try {
      const user = await this.userModel.create({
        email: email.toLowerCase(),
        password: await hashPassword(password),
        activationToken: uuid(),
        activationExpires: Date.now() + config.auth.activationExpireInMs,
        role: role,
      });

      return user;
    } catch {
      throw EmailAlreadyUsedException();
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw UserNotFoundException();
    }

    return user;
  }

  async find(): Promise<User[]> {
    const users = await this.userModel.find({});
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne(
      {email: email.toLowerCase()},
      "+password",
    );

    if (!user) {
      throw UserNotFoundException();
    }

    return user;
  }

  async activate(userId: string, activationToken: string) {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
          activationToken,
          isActive: false,
        },
        {
          isActive: true,
          activationToken: undefined,
          activationExpires: undefined,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .where("activationExpires")
      .gt(Date.now())
      .exec();

    if (!user) {
      throw ActivationTokenInvalidException();
    }

    return user;
  }

  async forgottenPassword(email: string, origin: string) {
    const user = await this.userModel.findOneAndUpdate(
      {
        email: email.toLowerCase(),
      },
      {
        passwordResetToken: uuid(),
        passwordResetExpires: Date.now() + config.auth.passwordResetExpireInMs,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      throw UserNotFoundException();
    }
  }

  async resetPassword(
    email: string,
    passwordResetToken: string,
    password: string,
  ) {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          email: email.toLowerCase(),
          passwordResetToken,
        },
        {
          password: await hashPassword(password),
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .where("passwordResetExpires")
      .gt(Date.now())
      .exec();

    if (!user) {
      throw PasswordResetTokenInvalidException();
    }

    return user;
  }
}
