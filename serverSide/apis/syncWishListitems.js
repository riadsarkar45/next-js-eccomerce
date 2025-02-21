const express = require("express");
const WishListItems = require("../model/syncCartItemModel");
const syncWishList = express.Router();

syncWishList.post('/syncWishlistItem/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const wishlistItems = req.body?.wishList;
        console.log("User ID:", userId);
        console.log("Wishlist Items:", wishlistItems);

        if (!userId) {
            return res.status(400).json({ msg: 'User ID is required.' });
        }
        if (!wishlistItems || !Array.isArray(wishlistItems) || wishlistItems.length === 0) {
            return res.status(400).json({ msg: 'Cart items are required.' });
        }

        // Data formatting
        const formattedItems = wishlistItems.map((item) => ({
            userId: userId,  // Ensure userId is associated
            title: item.title,
            productId: item.productId,
            productImg: item.productImg,
            qty: item.quantity,
            price: item.price
        }));

        // Insert into database
        try {
            await WishListItems.insertMany(formattedItems);
            res.json({ msg: 'ok' });
        } catch (error) {
            console.error(error);
            res.status(400).json({ msg: 'Failed to insert items', error: error.message });
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Server error', error: e.message });
    }
});

module.exports = syncWishList;
