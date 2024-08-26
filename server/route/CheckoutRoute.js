const express  = require('express')
const CheckoutController = require('../controller/CheckoutController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('',AuthMiddleware,CheckoutController.index)
router.post('/create',AuthMiddleware,CheckoutController.create)
router.get('/detail/:id',AuthMiddleware,CheckoutController.detail)
router.patch('/update/:id',AuthMiddleware,CheckoutController.update)
router.delete('/delete/:id',AuthMiddleware,CheckoutController.delete)
router.get('/history',AuthMiddleware,CheckoutController.history)

module.exports = router 