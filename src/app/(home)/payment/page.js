'use client';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/Component/Hooks/Payments/CheckoutForm';
const Pay = () => {
    const stripePromise = loadStripe('pk_test_51OElBZIMfs0f8XZbCQjOQ5gMDgwOmtAQZQ6uN1uvPvhvf3o03MqMIc3QyKLSa0hb6WKfxWvMV6Rr2uv8IgRtTk1E00JHTeYPXE');
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </div>
    );
};

export default Pay;