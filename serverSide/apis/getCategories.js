const express = require("express");
const Categories = require("../model/addNewCategory");
const GetCategories = express.Router();

GetCategories.get('/categories', async (req, res) => {
    try {
        const getCategories = await Categories.find();
        if (getCategories) {
            res.send(getCategories);
        } else {
            res.send({ message: 'No categories found.' })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = GetCategories;