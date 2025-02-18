'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const AddNewProduct = () => {
    const [images, setImages] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setImages(prevImages => [
            ...prevImages,
            ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
    }, []);

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true
    });

    return (
        <div>
            <form>
                <div className='flex gap-2 justify-between'>
                    <div className='bg-gray-100 p-4 rounded-lg'>
                        <div className='mb-2'>
                            <h2>Product Title</h2>
                            <input className='w-[35rem] p-3 rounded-md border' type='text' placeholder='Product Title' />
                        </div>
                        <div className='mb-2'>
                            <h2>Product Category</h2>
                            <input className='w-[35rem] p-3 rounded-md border' type='text' placeholder='Product Category' />
                        </div>
                        <div className='mb-2'>
                            <h2>Product Price</h2>
                            <input className='w-[35rem] p-3 rounded-md border' type='text' placeholder='Product Price' />
                        </div>
                        <div className='mb-2'>
                            <h2>Product Discount %</h2>
                            <input className='w-[35rem] p-3 rounded-md border' type='text' placeholder='Product Discount' />
                        </div>
                        <div className='mb-2'>
                            <h2>Total Product Stock</h2>
                            <input className='w-[35rem] p-3 rounded-md border' type='number' placeholder='Product Stock' />
                        </div>
                        <div className='mb-2'>
                            <h2>Product Description</h2>
                            <textarea className='w-[35rem] p-3 rounded-md border' placeholder='Product Description'></textarea>
                        </div>
                    </div>
                    <div>
                        <div className='bg-gray-100 p-4 rounded-lg'>
                            <h2>Product Images</h2>
                            <div {...getRootProps()} className='border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer'>
                                <input {...getInputProps()} />
                                <p>Drag & drop images here, or click to select files</p>
                            </div>
                            <div className='mt-4 grid grid-cols-3 gap-2'>
                                {images.map((file, index) => (
                                    <div key={index} className='relative w-24 h-24'>
                                        <Image src={file.preview} alt='preview' layout='fill' objectFit='cover' className='rounded-md' />
                                        <button type='button' onClick={() => removeImage(index)} className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs'>×</button>
                                    </div>
                                ))}
                            </div>

                            <div className='flex gap-3'>
                                <button className='bg-green-400 border text-green-800 bg-opacity-20 rounded-md p-2'>Submit</button>
                                <button className='bg-red-400 border text-red-800 bg-opacity-20 rounded-md p-2'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewProduct;
