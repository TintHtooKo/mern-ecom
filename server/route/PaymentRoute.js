const express = require("express");
const PaymentController = require("../controller/PaymentController");
const router = express.Router();

router.get('',PaymentController.index)
router.post('/create',PaymentController.create)
router.get('/detail/:id',PaymentController.detail)
router.patch('/update/:id',PaymentController.update)
router.delete('/delete/:id',PaymentController.delete)

module.exports = router