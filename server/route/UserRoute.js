const express = require("express");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

router.get('/',UserController.index)
router.post('/create',UserController.create)
router.post('/login',UserController.login)
router.get('/detail/:id',UserController.detail)
router.patch('/update/:id',UserController.update)
router.delete('/delete/:id',UserController.delete)
router.post('/logout',UserController.logout)
router.get('/me',AuthMiddleware,UserController.me)

module.exports = router