const ContentController = require("../controller/ContentController");
const express = require("express");
const router = express.Router();

router.get('/',ContentController.index)
router.post('/create',ContentController.create)
router.get('/detail/:id',ContentController.detail)
router.delete('/delete/:id',ContentController.delete)

module.exports = router