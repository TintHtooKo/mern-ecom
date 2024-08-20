const express = require("express");
const CategoryController = require("../controller/CategoryController");
const router = express.Router()

router.get('/', CategoryController.index)
router.post('/create',CategoryController.create)
router.get('/detail/:id',CategoryController.detail)
router.patch('/update/:id',CategoryController.update)
router.delete('/delete/:id',CategoryController.delete)

module.exports = router