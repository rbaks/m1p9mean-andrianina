import * as mongoose from "mongoose";

import {User} from "./user.interface";

export const UserSchema = new mongoose.Schema<User>(
  {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: {type: Boolean, default: false},
    activationToken: String,
    activationExpires: Date,
    role: {
      type: String,
      enum: ["Customer", "Admin", "Delivery", "Restaurant"],
      required: true,
    },
  },
  {timestamps: true},
);

/**
 * Methods.
 */
UserSchema.methods.getPublicData = function () {
  const {id, email, isActive} = this;
  return {id, email, isActive};
};
