const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer()

router.get('/', postController.readPost);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/profile/:pseudo' , postController.getUserPost)
router.patch('/like-post/:id', postController.likePost); //.patch sert a intervenir dans un array qui est a l'interrieur de notre element (le tableau des likes de notre user ici)
router.patch('/unlike-post/:id', postController.unlikePost);



// comments

router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;