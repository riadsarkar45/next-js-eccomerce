const express = require("express");
const getItems = express.Router();
const Post = require("../model/addNewPost");

getItems.get('/getItems', async (req, res) => {
    try{
        const products = await Post.find();
        if(products){
            res.send(products);
        }else {
            res.send({message: 'No products found'})
        }
    }catch(e){
        console.log(e);
    }
})

module.exports = getItems;