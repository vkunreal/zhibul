import { User, UserWithRoles } from 'src/shared/models/User';

export interface FindUserWhere {
  id?: string;
  phoneNumber?: string;
}

export interface FindUserOptions {
  where: FindUserWhere;
  withRoles?: boolean;
}

export interface UserWithRolesRaw extends User {
  roles: {
    role: {
      name: string;
    };
  }[];
}

export type UserResult = User | UserWithRoles | null;
