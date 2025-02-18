"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BannerImage from "../../../public/images/pexels-janetrangdoan-1132047.jpg";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Component/Hooks/UseAxiosPublic";

const Product = () => {
    const axiosPublic = useAxiosPublic();
    const [products, setProducts] = useState([]);
    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/api/getItems`);
                setProducts(res.data); // Set initial orders
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    });
    const categories = [
        "All",
        "Technology",
        "Business",
        "Health",
        "Sports",
        "Entertainment",
        "Science",
        "Travel",
        "Food",
        "Lifestyle1",
        "Lifestyle2",
        "Lifestyle3",
        "Lifestyle4",
        "Lifestyle5",
        "Lifestyle6",
        "Lifestyle7",
    ];

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.6; // Scrolls 60% of the container width
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };


    return (
        <div className="w-[70rem] m-auto">
            {/* Categories Section */}
            <h2 className="text-gray-400 text-[2rem] mt-10">Categories</h2>
            <div className="relative w-full bg-gray-100 p-4">
                {/* Left Button */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border  border-gray-300 hover:bg-gray-200 transition z-10"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Scrollable Categories */}
                <div ref={scrollRef} className="flex overflow-x-auto whitespace-nowrap space-x-4 scrollbar-hide scroll-smooth px-8">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="px-4 py-2 bg-white rounded-full shadow-md border border-gray-300 hover:bg-gray-200 transition"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Right Button */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-200 transition z-10"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Product Section */}
            <h2 className="text-gray-400 text-[2rem] mt-10">Only for you</h2>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <Link href={`/category-product/1234`} key={product._id}>
                        <div className="border cursor-pointer h-[17rem] p-2 w-[16.4rem] rounded-sm mt-2">
                            <Image
                                className="w-full cursor-pointer mb-3 h-[10rem] rounded-md"
                                src={product.images[0] || BannerImage}
                                alt={product.name || "Default Image"}  // Provide a meaningful alt text
                                width={500}  // Set a width
                                height={600} // Set a height
                            />


                            <h2 className="font-semibold">{product.title} uuuuuu</h2>
                            <h2 className="text-lg font-bold">{product.price} {index+1} </h2>
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
        </div>
    );
};

export default Product;
