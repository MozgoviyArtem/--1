import { Client } from "../database/prisma.service"
import { UserRepositoryContract } from "./user.types"

export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email) {
        try {
            return await Client.user.findUnique({
                where: { email }
            })
        } catch (error) {
            console.log(error)
            throw error

        }
    },
    async createUser(userData) {
        try {
            return await Client.user.create({
                data: userData
            })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    async getUserWithoutPasswordById(id) {
        try {
            return await Client.user.findUnique({
                where: { id },
                omit: {
                    password: true
                }
            })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    fin: function (userId: number): unknown {
        throw new Error("Function not implemented.")
    }
}