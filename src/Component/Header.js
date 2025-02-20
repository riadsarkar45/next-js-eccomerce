import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PublicHeader = () => {
    return (
        <div className=' shadow-md'>
            <div className='flex w-[70rem] p-3 items-center  mx-auto justify-between'>
                <Link href='/'>
                    <h2 className='text-xl'>Ecozart</h2>
                </Link>

                <div className='border  border-gray-100 p-2  flex justify-between'>
                    <input type='text' placeholder='Enter something' className=' w-[25rem] outline-none rounded-md' />
                    <button>Search</button>
                </div>

                <div className='text-sm'>
                    <a href='tel:+8801744972947' className='text-blue-500'>+8801744972947</a>
                </div>
            </div>
        </div>
    );
};

export default PublicHeader;