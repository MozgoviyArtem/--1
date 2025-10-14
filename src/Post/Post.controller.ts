import { Request, Response } from 'express'
import { updatePost } from '../Post/Post.service'
import { UpdatePostData } from '../Post/Post.types'

export const patchPost = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const data: UpdatePostData = req.body

  if (data.title && typeof data.title !== 'string') {
    return res.status(400).json({ error: 'title must be a string' })
  }

  const updated = updatePost(id, data)
  if (!updated) {
    return res.status(404).json({ error: 'Post not found' })
  }

  return res.status(200).json(updated)
}
