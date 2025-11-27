import { Request, response, Response, Router } from 'express'
import { PostService } from "../Post/Post.service"
import { updatedPost } from '../Post/Post.service'
import { PostsControllerContract, UpdatePostData } from '../Post/Post.types'
import { create } from 'domain'
import { CreatePost, UpdatePost } from "../Post/Post.types";
import { PostRouter } from './Post.router'
import { Prisma } from '../generated/prisma/client'
import { prisma } from "../database/prisma.service"

PostRouter.post("/posts", async (require, response)=>{
    const body: CreatePost= require.body
})

PostRouter.post("/posts", async(req:Request, res:Response) => {
  const body: CreatePost = req.body;
});

PostRouter.delete("/posts/:id", async (req: Request, res:Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await PostService.delete(id);

    res.json(deleted);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Пост не знайдено" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

export const PostController : PostsControllerContract = {
    PostRouter.delete("/posts/:id", async (req:Request, res:Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await Prisma.post.delete({
      where: { id },
    });

    res.json(deleted);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Пост не найден" });
    }

    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

    getAllPosts: (req:Request, res:Response) => {
        const take = Number (req.query.take);
        const skip = Number (req.query.skip);


        try{
            const result = PostService.getAlllPosts(skip,take);
            res.status(200).json(result);
        }
        catch(error){
            console.error(error);
            res.status(500).json("Server Error")
        }
    },
    getPostByld: (req: Request<{id: string }>, res:Response) =>{
        const PostId = +req.params.id;

        if(isNaN(PostId)) {
            res.status(400).json("PostId must be a number");
            return;
        }
        const post = PostService.getProductById(PostId);

        if(!post){
            res.status(400).json("No post with such id");
            return;
        }
        res.status(200).json(post)
    },
    createPost: async(req,res) =>{
        console.log(req.body)
        const body = req.body
        if(!body){
            res.status(422).json('Body is required')
            return
        }
        if(!body.name){
            res.status(422).json('Name is required')
            return
        }
        if(!body.price){
            res.status(422).json('Price is required')
            return
        }
        if(!body.category){
            res.status(422).json('Category is required')
            return
        }
        const newPost = await PostService.createPost(body)
        if(!newPost){
            res.status(500).json("Post creation failed")
            return
        }
        res.status(201).json('Successfully created')           
    },
    async updatePost(req,res){
        if(!req.params.id){
            res.status(400).json('Id id required')
            return;
        }
        const id = +req.params.id
        if(isNaN(id)){
            res.status(400).json('Id must be Intenger')
            return
        }
        const body = req.body
        if(!body){
            res.status(422).json('Body is required')
            return
        }
        const updatingPost= await PostService.updatePost(id,body)
        if(!updatingPost){
            res.status(500).json("Post updating Failed")
            return
        }
        res.status(200).json('Successfully updated')
    }

}


// export const patchPost = (req: Request, res: Response) => {
//   const id = Number(req.params.id)
//   const data: UpdatePostData = req.body

//   if (data.title && typeof data.title !== 'string') {
//     return res.status(400).json({ error: 'title must be a string' })
//   }

//   const updated = updatePost(id, data)
//   if (!updated) {
//     return res.status(404).json({ error: 'Post not found' })
//   }

//   return res.status(200).json(updated)
// }
