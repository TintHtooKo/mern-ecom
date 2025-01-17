const express = require("express");
const ProductController = require("../controller/ProductController");
const upload = require("../helper/upload");
const router = express.Router();

router.get('/',ProductController.index)
router.post('/create',ProductController.create)
router.get('/detail/:id',ProductController.detail)
router.patch('/update/:id',ProductController.update)
router.delete('/delete/:id',ProductController.delete)
router.post('/upload/:id',upload.single('image'),ProductController.upload)

module.exports = router