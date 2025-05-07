import { GetListParams } from './common.interface';
import { Role, RoleApi } from './role.interface';

export interface UserColumns {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: string;
  operation: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatar: string;
  role: RoleApi;
  permissions: string[];
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatar: string;
  role: RoleApi;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserCreateParams {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  identityId: string;
  dateOfBirth: string;
}

export interface AssignPermissionParams {
  id: number;
  role: number;
  permissions: number[];
}

export interface GetUsersParams extends GetListParams {
  search: string;
  status: string | null;
}
