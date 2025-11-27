import { prisma } from "../database/prisma.service"
import { Request,Response } from "express"
import { Prisma } from "../generated/prisma/browser"

export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

export type CreatePostData = Omit<Post, 'id'>

export type UpdatePostData = Partial<Omit<Post, 'id'>>

export type PostKeys = keyof Post

export interface PostServiceContract{
    delete(id: number): unknown
    getAllPost: (take? : number) => Post[]
    getProductById: (id: number) => Post | undefined
    createPost: (data: CreatePostData) => Promise<Post | null>
    updatePost: (id: number, data: UpdatePostData) => Promise<Post | null>
}

  export interface PostsControllerContract{
    getAllPosts: (
      req: Request<void,Post[] | string,void, { take? : string}>,
      res: Response<Post[] | string>
    ) => void

    getPostById: (
        req: Request<{id: string}, Post | string, object>,
        res: Response<Post | string>
        ) => void

    createPost: (
    req: Request<object, string, CreatePostData>,
    res: Response<string>
    ) => Promise<void>

    updatePost: (
    req: Request<{id: string}, string, UpdatePostData>,
    res: Response<string>
    ) => Promise<void>
}
export type post = Prisma.PostGetPayload<{}>;
export type PostWithTag = Prisma.PostGetPayload<{
  include:{
    tags: true
  }
}>
export type CreatePost = Prisma.PostCreateInput;
export type CreatePostUnceked = Omit<Prisma.PostUncheckedCreateInput, 'id'>
export type UpdatePost = Prisma.PostUpdateInput;
export type UpdatePostUnchecked = Prisma.PostUncheckedUpdateInput
export interface PostRepositoriuContract{
  create(data: CreatePostUnceked): Promise<PostWithTag>;
  update(id: number, data:UpdatePostUnchecked): Promise<PostWithTag>;
  delete(id: number): Promise<Post>;
  getAll(): Promise<PostWithTag[]>;
  getById(id: number): Promise< PostWithTag | null>;
}