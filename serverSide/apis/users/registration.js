const express = require("express");
const UserRegistration = require("../../model/users/registration");
const newUser = express.Router();

newUser.post("/register", async (req, res) => {
    try {
        const user = req.body;

        if (!user || Object.keys(user).length === 0) return res.status(400).send({ msg: "User info required." });
        const { name, email, role, uid } = req.body;
        const newUserInstance = new UserRegistration({
            name,
            email,
            role,
            uid,
        });

        await newUserInstance.save();

        return res.status(201).send({ msg: "Registration successful." });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ msg: "Internal server error" });
    }
});

newUser.get('/getUser/:id', async(req, res) => {
    try{
        if(!req.params.id) return res.send({msg: 'user id required'});
        const findUser = await UserRegistration.findOne({uid: req.params.id})
        if(Object.keys(findUser).length < 1) return res.send({msg: 'No user found'});
        res.send(findUser)
    }catch(e){
        console.log(e);
    }
})

module.exports = newUser;
