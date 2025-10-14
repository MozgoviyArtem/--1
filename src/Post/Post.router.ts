import { Router } from 'express'
import { patchPost } from '../Post/Post.controller'

const router = Router()

router.patch('/posts/:id', patchPost)

export default router