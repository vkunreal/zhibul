import { UserWithRolesRaw } from '../interfaces';

export const transformUserWithRoles = (user: UserWithRolesRaw) => {
  const { roles, ...userData } = user;

  return {
    ...userData,
    roles: Array.isArray(roles) ? roles.map((item: any) => item.role.name) : [],
  };
};
