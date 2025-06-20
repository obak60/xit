import Link from 'next/link';
import React from 'react';
import Actions from './actions';
import QuickView from '../quick-view';


const ProductCard = ({ product, className = "", titleClass = "" }) => {


    return (
        <div className={`${className} max-w-60 relative group bg-light/90 backdrop-blur-md rounded-sm overflow-hidden p-4 border hover:border-primary duration-300`}>
            {/* Product Image */}
            <div className="relative z-10 overflow-hidden rounded-sm w-full h-40 md:h-52">
                <Link href={`/collections/${product?.id}`}>
                    <img
                        src={product?.images[0]}
                        alt={product?.name || "Product image"}
                        className="w-full h-full object-cover rounded-sm duration-500 group-hover:scale-110"
                    />
                </Link>
                {/* Floating "Add to Cart" Button (Fixed with z-10) */}
                <div className="absolute z-10 w-full bottom-0 left-1/2 transform -translate-x-1/2 duration-500 opacity-100 lg:opacity-0 translate-y-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 flex justify-center items-center gap-1 bg-dark/70 py-1 md:py-2">
                    {/* <Actions product={product} /> */}
                    <QuickView productId={product?.id} />
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-4 text-center z-10">
                <Link href={`/collections/${product?.id}`}>
                    <h2 className={`${titleClass} text-sm lg:text-base font-semibold text-gray-900 hover:text-primary transition-all duration-300 z-10 relative h-12 capitalize md:mb-2`}>
                        {product?.name?.length > 30 ? product?.name.slice(0, 30) + "..." : product?.name}
                    </h2>
                </Link>
                <p>
                    <span className='font-semibold'>৳{product?.selling_price}</span>
                    {product?.discount?.is_active && (
                        <>
                            <span className="text-base md:text-lg line-through text-gray-500">৳{product?.selling_price - product?.discount?.amount}</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
