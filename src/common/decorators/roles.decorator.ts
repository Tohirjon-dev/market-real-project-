import { SetMetadata } from '@nestjs/common';

export const RolesDeco = (...roles: string[]) => SetMetadata('roles', roles);
