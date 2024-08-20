const Cart = require('../model/AddToCart');
const Product = require('../model/Product'); // Assuming you have a Product model

const AddToCartController = {
    addToCart: async (req, res) => {
        try {
            const userId = req.user._id; // Ensure this is correctly set
            const { productId, quantity } = req.body;

            if (!productId || quantity <= 0) {
                return res.status(400).json({ message: 'Invalid product ID or quantity' });
            }

            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, product: [] });
            }

            const existingProductIndex = cart.product.findIndex(
                (p) => p.item.toString() === productId
            );

            if (existingProductIndex > -1) {
                cart.product[existingProductIndex].quantity += quantity;
            } else {
                cart.product.push({ item: productId, quantity });
            }

            await cart.save();
            res.status(200).json({ message: 'Product added to cart', cart });
        } catch (error) {
            console.error('Error in addToCart:', error); // Log the error
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    viewCart: async (req, res) => {
        try {
            const userId = req.user._id; // Ensure this is correctly set

            const cart = await Cart.findOne({ user: userId }).populate('product.item');

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            res.status(200).json(cart);
        } catch (error) {
            console.error('Error in viewCart:', error); // Log the error
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userId = req.user._id; // Ensure this is correctly set
            const { productId } = req.body;

            if (!productId) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const productIndex = cart.product.findIndex(
                (p) => p.item.toString() === productId
            );

            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            cart.product.splice(productIndex, 1);
            await cart.save();
            res.status(200).json({ message: 'Product removed from cart', cart });
        } catch (error) {
            console.error('Error in removeFromCart:', error); // Log the error
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getCartCount: async (req, res) => {
        try {
            const userId = req.user._id; // Ensure this is correctly set
            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                return res.status(200).json({ count: 0 });
            }

            const count = cart.product.reduce((acc, item) => acc + item.quantity, 0);
            res.status(200).json({ count });
        } catch (error) {
            console.error('Error fetching cart count:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
};

module.exports = AddToCartController;
