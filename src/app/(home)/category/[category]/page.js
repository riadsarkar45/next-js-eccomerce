'use client'
import React, { useState } from 'react';
import BannerImage from '../../../../../public/images/pexels-janetrangdoan-1132047.jpg';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/Component/Hooks/UseAxiosPublic';
import { useParams } from 'next/navigation';
import Loader from '@/Component/Loader/Loader';

const CategoryPosts = () => {
    const axiosPublic = useAxiosPublic();
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/api/category-product/${category}`);
                setProducts(res.data)
                setIsLoading(false)
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    });
    return (
        <div className="w-[70rem] m-auto flex gap-3">
            <div className=" mt-3 w-[18rem] border p-2">
                <h2>Filters</h2>
                <div className="flex flex-col space-y-2">
                    <button className="mt-2 text-left border border-blue-100 rounded-sm hover:bg-blue-100 p-2">Cash on delivery</button>
                    <button className="mt-2 text-left border border-blue-100 rounded-sm hover:bg-blue-100 p-2">Price Low to High</button>
                    <button className="mt-2 text-left border border-blue-100 rounded-sm hover:bg-blue-100 p-2">Price High to Low</button>
                </div>

                <div className='mt-4'>
                    <h2>Warranty Period</h2>
                    <div className="flex flex-col space-y-2">
                        <button className="mt-2 text-left border border-blue-100 rounded-sm hover:bg-blue-100 p-2">1 Month Warranty</button>
                        <button className="mt-2 text-left border border-blue-100 rounded-sm hover:bg-blue-100 p-2">2 Month Warranty</button>
                        <button className="mt-2 text-left border border-blue-100 rounded-sm hover:bg-blue-100 p-2">No Warranty</button>
                    </div>
                </div>
            </div>
            {
                isLoading ? (
                    <div className="flex items-center ">
                        <Loader />
                    </div>
                ) : (
                    <div className='grid grid-cols-3 gap-3'>
                        {products.map((product, index) => (
                            <Link href={`/category-product/${product.category}`} key={index}>
                                <div className="border cursor-pointer h-[17rem] p-2 w-[16.4rem] rounded-sm mt-2">
                                    <Image
                                        unoptimized={true}
                                        width={500}
                                        height={500}
                                        className="w-full cursor-pointer mb-3 rounded-md"
                                        src={product.images[0] || BannerImage}
                                        alt={product.title} />
                                    <h2 className="font-semibold">{product.title}</h2>
                                    <h2 className="text-lg font-bold">{product.price}</h2>
                                    <div className="flex text-yellow-500 ">
                                        {[...Array(product.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                width="20"
                                                height="20"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>


    );
};

export default CategoryPosts;