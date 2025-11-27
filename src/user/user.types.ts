import { Prisma } from "../generated/prisma/browser";
import { Request, Response } from "express";
import { ErrorResponse } from "../genericitipes/errors.types";

export type User = Prisma.PostGetPayload<{}>
export type UserWithoutPassword = Prisma.PostGetPayload<{ omit: { password: true } }>
export type LoginCredentials = {
    email: string
    password: string
}
export type RegisterCredentials = {
    email: string
    password: string
    username: string
}

export interface UserAuthenticationResponse{
    token: string
}


export type UserCreate = Prisma.PostUncheckedCreateInput
export interface UserControllerContract {
    login(request: Request<object, ErrorResponse | UserAuthenticationResponse, LoginCredentials>, response: Response<ErrorResponse | UserAuthenticationResponse>): Promise<void>;
    register(request: Request<object, ErrorResponse | UserAuthenticationResponse, RegisterCredentials>, response: Response<ErrorResponse | UserAuthenticationResponse>): Promise<void>;
    me(request: Request<object, ErrorResponse | UserWithoutPassword, object, object, {userId: number}>, response: Response<ErrorResponse | UserWithoutPassword, {userId: number}>): Promise<void>
}

export interface UserServiceContract {
    login(credentials: LoginCredentials): Promise<string>;
    register(credentials: RegisterCredentials): Promise<string>;
    me(userId: number): Promise<UserWithoutPassword>
}

export interface UserRepositoryContract {
    fin(userId: number): unknown;
    getUserByEmail(email: string): Promise<User | null>
    createUser(userData: UserCreate): Promise<User>
    getUserWithoutPasswordById(id: number): Promise<UserWithoutPassword | null>
}