'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import useAxiosPublic from '@/Component/Hooks/UseAxiosPublic';

const AddNewProduct = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const axiosPublic = useAxiosPublic();
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
        setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[index];
            return newProgress;
        });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true
    });

    const uploadImages = async () => {
        setUploading(true);
        const apiKey = "6d20db96374ec6dfa31890fcf109976b"; // Replace with your actual ImgBB API key
        const uploadedImageUrls = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const formData = new FormData();
            formData.append("image", image);

            try {
                const response = await axiosPublic.post(
                    `https://api.imgbb.com/1/upload?key=${apiKey}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadProgress(prev => ({ ...prev, [i]: percentCompleted }));
                        }
                    }
                );

                uploadedImageUrls.push(response.data.data.url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        setUploading(false);
        return uploadedImageUrls;
    };

    const handleInsertProduct = async (e) => {
        e.preventDefault();
        setUploading(true);

        const productTitle = e.target.productTitle.value;
        const productCategory = e.target.category.value;
        const productPrice = e.target.price.value;
        const productDiscount = e.target.discount.value;
        const productStock = e.target.stock.value;
        const productDesc = e.target.desc.value;

        // Upload images first
        const imageUrls = await uploadImages();

        if (imageUrls.length === 0) {
            alert("Failed to upload images. Please try again.");
            setUploading(false);
            return;
        }

        const productData = {
            title: productTitle,
            category: productCategory,
            price: productPrice,
            discount: productDiscount,
            stock: productStock,
            description: productDesc,
            images: imageUrls,
        };

        const insert = await axiosPublic.post('/api/add-newItem', productData);
        console.log(insert.data);
        console.log("Product Data:", productData);

        alert("Product added successfully!");
        setUploading(false);
    };

    return (
        <div>
            <form onSubmit={handleInsertProduct}>
                <div className='flex gap-2 justify-between'>
                    <div className='bg-gray-100 p-4 rounded-lg'>
                        <div className='mb-2'>
                            <h2 className='text-gray-500'>Product Title</h2>
                            <input name='productTitle' className='w-[35rem] p-3 rounded-md border' type='text' placeholder='Product Title' required />
                        </div>
                        <div className='mb-2'>
                            <h2 className='text-gray-500'>Product Category</h2>
                            <input name='category' className='w-[35rem] p-3 rounded-md border' type='text' placeholder='Product Category' required />
                        </div>
                        <div className='mb-2'>
                            <h2 className='text-gray-500'>Product Price</h2>
                            <input name='price' className='w-[35rem] p-3 rounded-md border' type='number' placeholder='Product Price' required />
                        </div>
                        <div className='mb-2'>
                            <h2 className='text-gray-500'>Product Discount %</h2>
                            <input name='discount' className='w-[35rem] p-3 rounded-md border' type='number' placeholder='Product Discount' />
                        </div>
                        <div className='mb-2'>
                            <h2 className='text-gray-500'>Total Product Stock</h2>
                            <input name='stock' className='w-[35rem] p-3 rounded-md border' type='number' placeholder='Product Stock' required />
                        </div>
                        <div className='mb-2'>
                            <h2 className='text-gray-500'>Product Description</h2>
                            <textarea name='desc' className='w-[35rem] p-3 rounded-md border' placeholder='Product Description' required></textarea>
                        </div>
                    </div>
                    <div>
                        <div className='bg-gray-100 p-4 rounded-lg'>
                            <h2 className='text-gray-500'>Product Images</h2>
                            <div {...getRootProps()} className='border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer'>
                                <input {...getInputProps()} />
                                <p className='text-gray-500'>Drag & drop images here, or click to select files</p>
                            </div>
                            <div className='mt-4 grid grid-cols-3 gap-2'>
                                {images.map((file, index) => (
                                    <div key={index} className='relative w-24 h-24'>
                                        <Image src={file.preview} alt='preview' layout='fill' objectFit='cover' className='rounded-md' />
                                        <button type='button' onClick={() => removeImage(index)} className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs'>×</button>
                                        
                                        {/* Upload Progress Bar */}
                                        {uploading && (
                                            <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-2">
                                                <div
                                                    className="bg-blue-500 h-2 transition-all"
                                                    style={{ width: `${uploadProgress[index] || 0}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className='flex gap-3 mt-4'>
                                <button type="submit" className='bg-green-400 border text-green-800 bg-opacity-20 rounded-md p-2' disabled={uploading}>
                                    {uploading ? "Uploading..." : "Submit"}
                                </button>
                                <button type="button" className='bg-red-400 border text-red-800 bg-opacity-20 rounded-md p-2' onClick={() => setImages([])}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewProduct;
