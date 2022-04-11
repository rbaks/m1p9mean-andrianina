import {Module} from "@nestjs/common";

import {UserMailerService} from "./user.mailer.service";
import {UserService} from "./user.service";
import {UserModel} from "./user.model";
import {UserController} from "./user.controller";

@Module({
  imports: [UserModel],
  providers: [UserMailerService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
