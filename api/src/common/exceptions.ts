import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";

export const EmailAlreadyUsedException = () =>
  new ConflictException("Email already in use.");

export const UserNotFoundException = () =>
  new NotFoundException("Requested user does not exist.");

export const ActivationTokenInvalidException = () =>
  new ForbiddenException("Activation token is invalid or has expired.");

export const PasswordResetTokenInvalidException = () =>
  new ForbiddenException("Password reset token is invalid or has expired.");

export const LoginCredentialsException = () =>
  new UnauthorizedException("Login credentials are wrong.");

export const DishNotFoundException = () =>
  new NotFoundException("Requested dish doest not exist.");

export const DishAlreadyExistsException = () =>
  new ConflictException("Dish already exists.");

export const RestaurantAlreadyExistsException = () =>
  new ConflictException("Restaurant already exists.");

export const RestoNotFoundException = () =>
  new NotFoundException("Requested restaurant doest not exist.");

export const OrderNotFoundException = () =>
  new NotFoundException("Requested order doest not exist.");

export const DishNotEnoughException = () =>
  new ForbiddenException("Not enough dishes to make order.");
