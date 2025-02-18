const express = require("express");
const addItems = express.Router();
const Post = require("../model/addNewPost");

addItems.post("/add-newItem", async (req, res) => {
  try {
    let { title, category, price, discount, stock, description, images } = req.body;

    if (!title || !category || !price || !discount || !stock || !description || !images) {
      return res.status(400).json({ message: "All fields are required" });
    }

    price = parseFloat(price);
    discount = parseFloat(discount);
    stock = parseInt(stock, 10);

    if (isNaN(price) || isNaN(discount) || isNaN(stock)) {
      return res.status(400).json({ message: "Price, discount, and stock must be valid numbers" });
    }

    const newPost = new Post({
      title,
      category,
      price,
      discount,
      stock,
      description,
      images,
    });

    // Save the new post to the database
    await newPost.save();

    // Send a success response to the client
    res.status(201).json({
      message: "Item added successfully!",
      data: newPost,
    });

  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({
      message: "Error creating post",
      error: err.message,
    });
  }
});

module.exports = addItems;
