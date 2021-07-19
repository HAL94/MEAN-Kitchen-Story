import { User } from "src/app/models/user.interface";

export interface LoginResponse {
    message?: string;
    accessToken?: string;
    user?: User;
    expiresIn?: number;
    passwordChanged?: boolean;
}