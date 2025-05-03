import { userPayload } from '../interfaces/express-user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: userPayload;
    }
  }
}
