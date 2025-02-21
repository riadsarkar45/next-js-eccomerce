const express = require("express");
const payment = express.Router();
const stripe = require('stripe')("sk_test_51OElBZIMfs0f8XZbKG4czjOE0bROdAzpYQnEHbtGdh6ajpn5oMWI2q3ZWfDWcOLo8SkFJw2NnQdFXum084eMt8Sx00Or3SxbBH");
payment.post('/create-payment-intent', async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    console.log(amount, 'amount inside the intent')

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    })
});

module.exports = payment;