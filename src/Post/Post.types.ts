export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

export type CreatePostData = Omit<Post, 'id' | 'createdAt'>

export type UpdatePostData = Partial<Omit<Post, 'id' | 'createdAt'>>

export type PostKeys = keyof Post