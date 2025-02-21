import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, syncCartToDB } from './Redux/Store/cartSlice';
import { AuthContext } from './Hooks/AuthProvider';

const PublicHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        if(user && cartItems.length > 0){
            dispatch(syncCartToDB(user?.uid))
        }
        console.log(user);
    }, [user, cartItems])
    

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId)); // Dispatch the remove action with the itemId
        console.log('removed');
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className='shadow-md'>
            <div className='flex w-[70rem] p-3 items-center mx-auto justify-between'>
                <Link href='/'>
                    <h2 className='text-xl'>Ecozart</h2>
                </Link>

                <div className='border border-gray-100 p-2 flex justify-between'>
                    <input type='text' placeholder='Enter something' className='w-[25rem] outline-none rounded-md' />
                    <button>Search</button>
                </div>

                <div className='text-sm flex items-center gap-3'>
                    <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium" onClick={toggleDrawer}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2 12h13l3-7H6"></path>
                        </svg>
                        <span className="sr-only">Cart</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartItems.reduce((total, item) => total + item.quantity, 0)}</div>
                    </button>
                </div>
            </div>

            {/* Drawer Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
                    onClick={closeDrawer}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className='p-5'>
                    <h3 className='text-lg font-semibold'>Cart</h3>
                    <ul>
                        {/* List cart items */}
                        {
                            cartItems.map((item, index) => (
                                <div key={index}>
                                  <span>Product ID: {item.productId}</span>
                                  <span>Quantity: {item.quantity}</span>
                                  <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                                </div>
                            ))
                        }
                    </ul>
                    {cartItems.length > 0 && (
                        <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
                            Checkout
                        </button>
                    )}

                    {/* Close Button Inside the Drawer */}

                </div>
            </div>
        </div>
    );
};

export default PublicHeader;
