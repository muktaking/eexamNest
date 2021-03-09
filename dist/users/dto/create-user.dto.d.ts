import { Gender } from "../user.model";
import { RolePermitted } from "../user.model";
export declare class createUserDto {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    gender: Gender;
    role: RolePermitted;
}
