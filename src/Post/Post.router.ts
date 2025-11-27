import { Router } from 'express'
import { PostController } from "../Post/Post.controller"
import { prisma } from "../database/prisma.service"

export const PostRouter = Router()

PostRouter.get("/posts", PostController.getAllPosts)
PostRouter.get("/posts/:id", PostController.getProductById)
PostRouter.post("/posts", PostController.createProduct)
PostRouter.patch("/posts/:id", PostController.updateProduct)