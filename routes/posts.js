import express from "express";
import {getFeedPost,getUserPost,likePost} from "../controllers/posts.js"
import { verify } from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";



const router = express.Router()

    
/*READ POSTS */
router.get("/",verifyToken,getFeedPost);
router.get("/:userId/post",verifyToken,getUserPost);

/*UPDATE*/
router.patch("/:id/like",verifyToken,likePost)

export default router ;
