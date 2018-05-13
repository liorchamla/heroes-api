import { User } from './user.model';

export interface AuthData {
    token: string;
    user: User;
    status: string;
    message?: string;
}
