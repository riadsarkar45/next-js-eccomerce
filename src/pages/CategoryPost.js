import Image from 'next/image';
import React from 'react';
import BannerImage from '../../public/images/pexels-janetrangdoan-1132047.jpg'

const CategoryPost = () => {
    return (
        <div className="relative mt-4  w-[70rem] m-auto">
            <div className='flex justify-between gap-3'>
                <div className="relative h-[25rem] w-[50rem]">
                    <Image
                        className="h-full w-full rounded-md object-cover"
                        src={BannerImage}
                        alt="banner-image"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md"></div>
                </div>
                <div>
                    <div className='mb-[1rem]'>
                        <Image
                            className="h-[12rem] w-[20rem] rounded-md object-cover"
                            src={BannerImage}
                            alt="banner-image"
                        />
                    </div>
                    <div>
                        <Image
                            className="h-[12rem] w-[20rem] rounded-md object-cover"
                            src={BannerImage}
                            alt="banner-image"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute top-[2rem] bg-black opacity-45"></div> {/* Black overlay with opacity */}
            <div className="absolute top-[2rem]  flex justify-center items-center text-white">
                <div className='text-md'>
                    <h2 className='text-wrap grid text-[4rem] grid-cols-2 font-serif text-gray-500'>Welcome to fruits Ecohat Bazar</h2>
                    <a href="#_" className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                        <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="relative ">Button Text</span>
                    </a>
                </div>
            </div>
        </div>



    );
};

export default CategoryPost;