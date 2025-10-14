import { Post, CreatePostData, UpdatePostData } from '../Post/Post.types'
import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../data/posts.json')

function readData(): Post[] {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function writeData(posts: Post[]): void {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))
}

export function updatePost(id: number, newData: UpdatePostData): Post | null {
  const posts = readData()
  const postIndex = posts.findIndex(p => p.id === id)
  if (postIndex === -1) return null

  posts[postIndex] = { ...posts[postIndex], ...newData }
  writeData(posts)
  return posts[postIndex]
}