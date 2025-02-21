'use client'
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../UseAxiosPublic';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const totalPrice = 500;
    const axiosPublic = useAxiosPublic();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/api/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                    console.log(res.data.clientSecret);
                });
        }
    }, [axiosPublic, totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        const expiryElement = elements.getElement(CardExpiryElement);
        const cvcElement = elements.getElement(CardCvcElement);

        if (!cardElement || !expiryElement || !cvcElement) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error('Payment error:', error);
        } else {
            console.log('Payment method:', paymentMethod);
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.error('Confirm error:', confirmError);
        } else {
            if (paymentIntent.status === 'succeeded') {
                alert("Payment Successful");
            }
        }
    };

    return (
        <div className="w-[70rem] m-auto mt-10">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                
                {/* Card Number Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Card Number
                    </label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md">
                        <CardNumberElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Expiry Date Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        Expiry Date
                    </label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md">
                        <CardExpiryElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* CVC Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                        CVC
                    </label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md">
                        <CardCvcElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
