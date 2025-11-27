// import { UserServiceContract } from "./user.types"
import { UserRepository } from "../user/user.repositoriy"
import sign from "jsonwebtoken"
import { env } from "../config/env"
import { StringValue } from 'ms'
import { compare, hash } from "bcryptjs"
import { UserServiceContract } from "./user.types"
// 

export const UserService: UserServiceContract = {
    async login(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)

        if (!user) {
            throw new Error('NOT_FOUND')
        }
        const isMatch = await compare(credentials.password, user.password)
        if (!isMatch) {
            throw new Error('WRONG_CREDENTIALS')
        }  

        const token = sign({ id: user.id }, env.JWT_ACCESS_SECRET_KEY, { expiresIn: env.JWT_EXPIRES_IN as StringValue })

        return token
    },
    async register(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)
        if (user) {
            throw new Error(`USER_EXISTS`)
        }
        

        const hashedPassword = await hash(credentials.password, 10)

        const hashedCredentials = {
            ...credentials,
            password: hashedPassword
        }
        const newUser = await UserRepository.createUser(hashedCredentials)
        const token = sign({ id: newUser.id }, env.JWT_ACCESS_SECRET_KEY, { expiresIn: env.JWT_EXPIRES_IN as StringValue })
        return token
    },
    async me(userId){
        const user = await UserRepository.fin(userId)

        if (!user) {
            throw new Error('NOT_FOUND')
        }
        return user
    }

}