const express = require("express");
const CartItem = require("../model/syncModel");
const addCart = express.Router();

addCart.post('/syncCartItem/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = req.body?.cart;

        if (!userId) {
            return res.status.json({ msg: 'User ID is required.' });
        }
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.json({ msg: 'Cart items are required.' });
        }

        // Data formatting
        const formattedItems = cartItems.map((item) => ({
            userId: userId,  // Ensure userId is associated
            title: item.title,
            productId: item.productId,
            productImg: item.productImg,
            qty: item.quantity,
            price: item.price
        }));

        // Insert into database
        await CartItem.insertMany(formattedItems);

        res.json({ msg: 'ok' });

    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Server error', error: e.message });
    }
});

module.exports = addCart;
