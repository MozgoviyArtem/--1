const postService = require("./Post.service")
const postController = {
    getAllPosts : (req,res) => {
        const filter = req.query.filter;
        const responceData = postService.getAllPosts(filter)
        if (responceData.status == "error"){
            res.status(400).json(responceData.message);
            return
        }
        res.status(200).json(responceData)
    },
    getPostsByID: () =>{

    },
    createPostsPost: (req,res) =>{
        const data = req.body;

        res.status(201).json(post);
    }
}

module.exports = postController