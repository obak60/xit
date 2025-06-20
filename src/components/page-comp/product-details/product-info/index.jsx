"use client";

import React from 'react';
import Actions from '@/components/page-comp/product-details/actions';
import ImageGallery from '@/components/page-comp/product-details/image-gallery';
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from 'react';


const ProductInfo = ({ product }) => {

    const [productURL, setProductURL] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setProductURL(window.location.href);
        }
    }, []);

    console.log(product);
    

    const message = encodeURIComponent("Check out this product!");
    const discountPercentage = product?.discount?.is_active
        ? Math.round((product?.discount?.amount / product?.selling_price) * 100)
        : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ImageGallery product={product} />

            <div className="space-y-4 md:space-y-6">
                {/* <div className={`w-fit text-white text-xs md:text-sm px-4 py-1 rounded-full border ${product?.stock ? "bg-green-600" : "bg-red-500"}`}>
                    {product?.stock ? "In Stock" : "Stock Out"}
                </div> */}
                <h1 className="text-xl md:text-3xl font-bold text-gray-800 capitalize">{product?.name}</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-lg md:text-2xl font-semibold text-gray-900">৳{product?.selling_price}</span>
                    {product?.discount?.is_active && (
                        <>
                            <span className="text-base md:text-lg line-through text-gray-500">৳{product?.selling_price - product?.discount?.amount}</span>
                            <span className="text-green-500 text-xs md:text-sm">({discountPercentage}% Off)</span>
                        </>
                    )}
                </div>

                <Actions product={product} />

                <div>
                    <p>Brand: {product?.brand?.name}</p>
                    <p>Category: {product?.category?.name}</p>
                    <p>Code: {product?.code}</p>
                    <h3 className="text-lg font-semibold text-gray-800 pt-4">Description</h3>
                    <p>{product?.description}</p>
                    {/* <ul className="list-disc ml-6 text-gray-600">
                        <li>Light Gray solid top with a boat neck and 3/4 sleeves</li>
                        <li>Material: 100% Cotton</li>
                        <li>Care: Machine-wash</li>
                    </ul> */}
                    <div className="flex items-center gap-2 pt-4">
                        <h5>Share</h5>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${productURL}`} target="_blank" rel="noopener noreferrer" className="text-lg" title="Share on Facebook">
                            <FaFacebookF />
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${message}%20${productURL}`} target="_blank" rel="noopener noreferrer" className="text-lg" title="Share on WhatsApp">
                            <FaWhatsapp />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-lg" title="Share on Instagram">
                            <FaInstagram />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?text=${message}&url=${productURL}`} target="_blank" rel="noopener noreferrer" className="text-lg" title="Share on Twitter">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;