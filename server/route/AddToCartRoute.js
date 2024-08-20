const express = require("express");
const AddToCartController = require("../controller/AddToCartController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post('/add-to-cart',AuthMiddleware,AddToCartController.addToCart)
router.get('/view-cart',AuthMiddleware,AddToCartController.viewCart)
router.post('/remove-cart',AuthMiddleware,AddToCartController.removeFromCart)
router.get('/count',AuthMiddleware,AddToCartController.getCartCount)

module.exports = router