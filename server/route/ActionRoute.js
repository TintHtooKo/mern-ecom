const express = require("express");
const ActionController = require("../controller/ActionController");
const router = express.Router();

router.get('/',ActionController.index)
router.post('/create',ActionController.create)
router.get('/detail/:id',ActionController.detail)
router.patch('/update/:id',ActionController.update)
router.delete('/delete/:id',ActionController.delete)

module.exports = router