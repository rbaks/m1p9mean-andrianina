import { Role } from './roles';

export class User {
  id: string;
  email: string;
  isActive: boolean;
  role: Role;
  token?: string;
}
