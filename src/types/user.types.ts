// import { project } from "./project.types";

export type userRole = 'Reviewer'| 'Submitter';

export interface User{
    id: number;
    email: string;
    name: string;
    role: userRole;
    password_hash: string;
}

export type new_user = Omit<User, 'id'>