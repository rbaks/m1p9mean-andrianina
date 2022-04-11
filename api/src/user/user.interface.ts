import {Document} from "mongoose";
import {Role} from "src/auth/auth.interface";

export type UserPublicData = Readonly<{
  id: string;
  email: string;
  isActive: boolean;
  role: Role;
}>;

export type UserMethods = {
  getPublicData: () => UserPublicData;
};

export type User = Readonly<{
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: string;
  isActive: boolean;
  activationExpires: string;
  activationToken: string;
  role: Role;
}> &
  UserMethods &
  Document;
