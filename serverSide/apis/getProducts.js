const express = require("express");
const getItems = express.Router();
const Post = require("../model/addNewPost");

getItems.get('/getItems', async (req, res) => {
  try {
    const products = await Post.find();
    if (products) {
      res.send(products);
    } else {
      res.send({ message: 'No products found' })
    }
  } catch (e) {
    console.log(e);
  }
})

getItems.get('/category-product/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const findCategoryProduct = await Post.find({ category: category });

    if (findCategoryProduct.length > 0) {
      res.send(findCategoryProduct);
    } else {
      res.status(404).send({ message: 'No products found in this category' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

getItems.get('/single-prod/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate if ID is a valid MongoDB ObjectId
    

    const findCategoryProduct = await Post.findOne({ _id: id });

    if (findCategoryProduct) {
      res.send(findCategoryProduct);
    } else {
      res.status(404).send({ message: 'No product found with this ID' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});


module.exports = getItems;