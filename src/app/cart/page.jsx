"use client";

import { useCart } from '@/Provider/cart-provider';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import dummyImg from '@/assets/images/dummy-img.jpg';
import { FaPlus, FaMinus, FaRegRectangleXmark } from "react-icons/fa6";
import SectionLoading from '@/components/reusuable/section-loading';

const CartPage = () => {

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, loading, products } = useCart();
    const router = useRouter();

    const totalPrice = products.reduce((sum, product) => {
        const cartItem = cart.find(item => item.code === product?.barcodes[0]?.barcode);
        const quantity = cartItem?.quantity || 0;

        const discountAmount = product?.discount?.is_active ? product?.discount?.amount || 0 : 0;
        const finalPrice = (product?.selling_price || 0) - discountAmount;

        return sum + quantity * finalPrice;
    }, 0);

    const handleCheckout = () => {
        if (cart?.length === 0) return;

        Cookies.set("checkoutItems", JSON.stringify(cart), { expires: 1 / 24 }); // 1 hour
        router.push("/checkout");
    };


    return (
        <div className="md:container">
            <div className='relative w-full h-full px-2 pt-3 md:pt-8'>

                <h2 className='font-bold'>Cart Items {cart?.length || 0}</h2>

                {/* product list */}
                {
                    loading ?
                        <SectionLoading />
                        :
                        <div className='py-2'>
                            {
                                products?.length == 0 ?
                                    <div className='flex flex-col items-center py-6 gap-2'>
                                        <p className='font-semibold'>No Items Added!</p>
                                        <Link href={"/collections"} className='button'>shop now</Link>
                                    </div>
                                    :
                                    <>
                                        {
                                            products?.map((product, index) => {
                                                const cartItem = cart.find(item => item.code === product?.barcodes[0]?.barcode);
                                                if (!cartItem) return null;
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 border-b px-2 py-3">
                                                        {/* increase / decrease btn */}
                                                        <div className='flex flex-col items-center px-2'>
                                                            <button onClick={() => increaseQuantity(cartItem?.code)}>
                                                                <FaPlus />
                                                            </button>
                                                            <span className='pt-1'>{cartItem?.quantity}</span>
                                                            <button onClick={() => decreaseQuantity(cartItem?.code)} className='disabled:opacity-60 disabled:cursor-not-allowed' disabled={cartItem?.quantity === 1}>
                                                                <FaMinus />
                                                            </button>
                                                        </div>
                                                        <Image
                                                            src={product?.images?.[0] || dummyImg}
                                                            alt={product?.name || "product image"}
                                                            width={80}
                                                            height={70}
                                                            className="rounded-sm object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-sm">
                                                                {product?.name}
                                                            </h3>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {
                                                                    product?.barcodes[0]?.attributes?.color &&
                                                                    <span>
                                                                        Color: <strong>{product?.barcodes[0]?.attributes?.color}</strong> - Size:
                                                                    </span>
                                                                }
                                                                <strong>{product?.barcodes[0]?.attributes?.size}</strong>
                                                                <p>
                                                                    ৳{product?.discount?.is_active ? (product?.selling_price - product?.discount?.amount) : product?.selling_price}
                                                                    {" "}x {cartItem?.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-semibold">
                                                            ৳{cartItem?.quantity * ((product?.selling_price || 0) - (product?.discount?.is_active ? product?.discount?.amount || 0 : 0))}
                                                        </p>
                                                        <button onClick={() => removeFromCart(cartItem?.code)} className='text-xl text-red-600 mx-2'>
                                                            <FaRegRectangleXmark />
                                                        </button>
                                                    </div>
                                                );
                                            })
                                        }
                                    </>
                            }
                        </div>
                }
            </div>
            {/* buttons */}
            <div className='w-full grid grid-cols-2 mb-10'>
                <h3 className='bg-slate-200 py-2 text-center font-semibold'>Total: ৳{totalPrice}</h3>
                <button onClick={handleCheckout} className='bg-primary py-2 text-center text-light disabled:bg-slate-600 disabled:cursor-not-allowed' disabled={cart?.length == 0}>Checkout</button>
            </div>
        </div>
    );
};

export default CartPage;