import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import { CreatePostData, Post, PostServiceContract, UpdatePostData } from "./Post.types";
import { PrismaClient as PC } from "../generated/prisma/client";
import { PrismaClient } from "../generated/prisma/client";
import { CreatePostUnceked, UpdatePostUnchecked} from "../Post/Post.types";
import { prisma } from "../database/prisma.service";
import { PostRepository } from "../Post/post.repositoriy";

const repositori = new PostRepository();

export const postService = {
  async getAll() {
    return repositori.getAll();
  },

  async getById(id: number) {
    return repositori.getById(id);
  },

  async create(data) {
    return repositori.create(data);
  },

  async update(id, data) {
    return repositori.update(id, data);
  },

  async delete(id) {
    return repositori.delete(id);
  },
};

const prisma = new PrismaClient();

export const postsService = {
  async create(data: CreatePostUnceked) {
    try {
      return await prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          tags: data.tagIds
            ? { connect: data.tagIds.map(id => ({ id })) }
            : undefined,
        },
        include: { tags: true },
      });
    } catch (error) {
      throw error;
    }
  },

  async update(id: number, data: UpdatePostUnchecked) {
    try {
      return await prisma.post.update({
        data: {
          title: data.title,
          content: data.content,
          tags: data.tagIds
            ? { set: data.tagIds.map(id => ({ id })) }
            : undefined,
        },
        include: { tags : true },
      });
    } catch (error) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      return await prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

const postPath = path.join(__dirname, "posts.json")
const posts: Post[] = JSON.parse(fs.readFileSync(postPath,"utf-8"))

export const Client = new PC()

export const PostService: PostServiceContract ={
    getAllPost : (skip:number, take?: number) => {
        try {
            const getAllPost = //ne &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        } catch (error) {
            console.log(error)
            return null
        }
        if ( !skip && take ){
            return posts.slice(0,take)
        };
        return posts.slice(skip, take ? skip + take :undefined)
    },
    getPostById : (PostId:number)=>{
        return posts.find((p) => p.id === PostId);
    },
    createPost : async (data: CreatePostData) => {
        try {
            const userPost = {...data, id: posts.length +1};
            posts.push(userPost);
            await fsPromises.writeFile(postPath, JSON.stringify(posts, null, 4));
            return userPost;
        }
        catch(error){
            console.log(error);
            return null;
        }
    },
    updatePost: async(id:number, data:UpdatePostData)=> {
        const findingPost = PostService.getProductById(id);
        if(!findingPost){
            return null
        }
        try {
            const updatePost = {...findingPost, ...data}
            posts.splice(id -1,1, updatePost)
            await fsPromises.writeFile(postPath, JSON.stringify(posts, null, 4))
            return updatePost
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}