import { Roles } from '@prisma/client';

export interface userPayload {
  id: number;
  phone_number: string;
  role: Roles;
}
