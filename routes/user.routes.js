const router = require('express').Router()
const authController = require('../controllers/auth.controller');
const userController  = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');

const multer = require('multer');
const upload = multer()

//auth
router.post('/register', authController.signUp);
router.post("/login",  authController.signIn);
router.get("/logout", authController.logout);

//user db
router.get("/friend/:userId", userController.friendUser)
router.get("/" , userController.getUserParams)
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);


//upload

router.post("/upload", upload.single("file"), uploadController.uploadProfil);


module.exports = router;