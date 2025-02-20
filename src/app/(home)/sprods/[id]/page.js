"use client";
import React, { useState } from 'react';
import BannerImage from '../../../../../public/images/pexels-janetrangdoan-1132047.jpg';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/Component/Hooks/UseAxiosPublic';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/Component/Redux/Store/cartSlice';

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const [loading, setIsLoading] = useState(true);
    const [defaultPhoto, setDefaultPhoto] = useState('');
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [currentIndex, setCurrentIndex] = useState(0);
    const disPatch = useDispatch();
    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/api/single-prod/${id}`);
                setProduct(res.data);
                setDefaultPhoto(res.data.images?.[0]);
                setIsLoading(false);
                return res.data;
            } catch (error) {
                console.error("Error fetching product:", error);
                setIsLoading(false);
                return null;
            }
        },
    });

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (product?.images?.length || 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (product?.images?.length || 1)) % (product?.images?.length || 1));
    };

    const handleAddToCart = () => {
        disPatch(addToCart({ productId: product.id, quantity: 1 }));
        console.log('added');
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-[70rem] m-auto mb-10">
            <div>
                <h2 className="mt-[3rem] mb-5">
                    {product?.title} {`->`} {product?.category}
                </h2>
            </div>
            <div className="flex justify-between gap-4 bg-gray-100 p-2">
                <div className="w-[65rem] flex gap-2">
                    <div>
                        <Image
                            unoptimized={true}
                            className="w-[55rem] h-[20rem]"
                            src={product?.images?.[currentIndex] || BannerImage}
                            alt={defaultPhoto || 'Product Image'}
                            height={400}
                            width={300}
                        />

                        <div className="flex justify-center items-center mt-6">
                            <div className="relative w-[20rem] sm:w-[600px] md:w-[700px] lg:w-[20rem]">
                                {/* Thumbnails (map through images array) */}
                                <div className="flex justify-center space-x-2 mt-4">
                                    {product?.images?.map((image, index) => (
                                        <Image
                                            unoptimized={true}
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            width={200}
                                            height={200}
                                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${index === currentIndex ? 'border-4 border-blue-500' : ''}`}
                                            onClick={() => setCurrentIndex(index)} // Set clicked image as the current image
                                        />
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
                                    <button
                                        onClick={handlePrev} // When clicked, go to the previous image
                                        className="bg-[#3d348b] text-white p-2 rounded-full shadow-lg hover:bg-[#5e4ba6]"
                                    >
                                        {`<`}
                                    </button>
                                </div>
                                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
                                    <button
                                        onClick={handleNext} // When clicked, go to the next image
                                        className="bg-[#3d348b] text-white p-2 rounded-full shadow-lg hover:bg-[#5e4ba6]"
                                    >
                                        {`>`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-3">{product?.title}</h2>
                        <p className="text-lg mb-5">৳ {product?.price}</p>
                        <p className="text-lg mb-5">$ {(product?.price / 122).toFixed(2)}</p>
                        <p className="text-lg mb-5">Brand: No Brand</p>
                        <p className="text-lg mb-5">{product?.discount}% Discount</p>

                        <div className="flex gap-2">
                            <button onClick={() => handleAddToCart()} className="bg-green-500 bg-opacity-25 w-[15rem] text-green-800 border-green-500 p-2 rounded-md">
                                Add To Cart
                            </button>
                            <button className="bg-red-500 bg-opacity-25 w-[15rem] text-red-800 border-red-500 p-2 rounded-md">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-[25rem] border rounded-md p-2">
                    <h2 className="mb-3">Delivery Options</h2>
                    <div className="mb-3 flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <h2>Dhaka, Dhaka North, Banani Road No. 12 - 19</h2> <span className='text-blue-400 cursor-pointer'>Change</span>
                    </div>
                    <hr className="border-gray-300 mb-5" />
                    <div>
                        <h2>Standard Delivery</h2>
                        <p className='text-sm text-gray-400'>Estimated Delivery Time 7 days after confirmation</p>
                    </div>

                    <div className=" mt-9 mb-9 flex gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="18"
                            height="18">
                            <path d="M2 6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6ZM4 8V18H20V8H4ZM12 16C13.66 16 15 14.66 15 13C15 11.34 13.66 10 12 10C10.34 10 9 11.34 9 13C9 14.66 10.34 16 12 16ZM6 10H8V12H6V10ZM16 10H18V12H16V10Z" />
                        </svg>

                        <h2>Cash on delivery available</h2>

                    </div>

                    <hr className="border-gray-300 mb-5" />
                    <div className='w-full text-center'>
                        <button className='flex items-center gap-3 border rounded p-2 text-gray-600'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="18"
                                height="18">
                                <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2ZM6 9H18V11H6V9ZM6 13H14V15H6V13ZM6 5H18V7H6V5Z" />
                            </svg>
                            Chat Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
