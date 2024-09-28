import express from 'express';
import { signupUser, loginUser } from '../controller/user.contoller.js';
import { getImage, uploadImage } from '../controller/image-controller.js';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPost,
    updatePost
} from '../controller/post-controller.js';
import upload from '../utils/upload.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import {
    newComment,
    getComments,
    deleteComment
} from '../controller/comment-controller.js';

const router = express.Router();

// User Signup Route
router.post('/signup', signupUser);
router.post('/login', loginUser);

// File Upload Route
router.post('/file/upload', upload.single('file'), async (req, res) => {
    // Check if the upload was successful
    if (!req.file) {
        return res.status(400).json({ message: "File upload failed. No file received." });
    }
    
    // Call the original uploadImage function
    await uploadImage(req, res);
});

// Get Image Route
router.get('/file/:filename', getImage);

// Post Routes
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

// Comment Routes
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;
