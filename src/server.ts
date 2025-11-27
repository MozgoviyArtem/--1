import express from 'express'
import PostRoutes from '../src/Post/Post.router'
import { skip } from 'node:test'
import { prisma } from "./database/prisma.service"
import { tagRouter } from './tags/tag.controller'
import { PostRouter } from '../src/Post/Post.router'

const app = express()
app.use(tagRouter)
app.use(PostRouter)
app.use(express.json())
app.use(PostRoutes)

const HOST = "localhost"
const PORT = 8001

app.listen(PORT,HOST,() =>{
   console.log('Server running on http://localhost:8001')
})


