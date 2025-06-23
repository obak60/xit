"use client";

import { useCart } from '@/Provider/cart-provider';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import dummyImg from '@/assets/images/dummy-img.jpg';
import { FaCartShopping, FaXmark, FaPlus, FaMinus, FaRegRectangleXmark } from "react-icons/fa6";


const CartDesktop = ({ openCart, setOpenCart }) => {

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, loading, products } = useCart();
    const cartRef = useRef(null);
    const router = useRouter();

    // Hide cart on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setOpenCart(false);
            }
        }
        if (openCart) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openCart]);

    // Calculate total price
    const totalPrice = products.reduce((sum, product) => {
        const cartItem = cart.find(item => item.code === product?.barcodes[0]?.barcode);
        const quantity = cartItem?.quantity || 0;

        const discountAmount = product?.discount?.is_active ? product?.discount?.amount || 0 : 0;
        const finalPrice = (product?.selling_price || 0) - discountAmount;

        return sum + quantity * finalPrice;
    }, 0);

    const handleCheckout = () => {
        setOpenCart(false);

        if (cart?.length === 0) return;

        Cookies.set("checkoutItems", JSON.stringify(cart), { expires: 1 / 24 }); // 1 hour
        router.push("/checkout");
    };

    return (
        <div>
            {/* Cart button */}
            <div className='hidden md:block relative'>
                <button onClick={() => setOpenCart(true)}>
                    <FaCartShopping className='text-2xl text-primary pt-1' />
                </button>
                <div className='absolute -top-[5px] -right-[8px] px-[5px] !h-4 flex justify-center items-center bg-secondary text-light rounded-full text-[11px]'>
                    {cart?.length}
                </div>
            </div>

            {/* Cart content */}
            <div
                ref={cartRef}
                className={`w-[400px] h-[80%] bg-light fixed z-40 top-1/2 -translate-y-1/2 ${openCart ? "right-0" : "-right-[1000px]"
                    } duration-300 border-2 shadow-lg text-dark`}>
                <div className="relative w-full h-full flex flex-col">
                    <div className="sticky top-0 left-0 flex justify-between items-center bg-primary text-light p-4">
                        <h2 className="font-bold">
                            Added Items
                            ({cart?.length || 0})
                        </h2>
                        <button onClick={() => setOpenCart(false)}>
                            <FaXmark />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-scroll scrollbar-hide">
                        {loading ? (
                            <p className="text-center py-4">Loading...</p>
                        ) : products?.length === 0 ? (
                            <div className="flex flex-col items-center py-6 gap-2">
                                <p className="font-semibold">No Items Added!</p>
                                <Link
                                    href="/collections"
                                    onClick={() => setOpenCart(false)}
                                    className="button">
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
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
                                                {product.name}
                                            </h3>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {
                                                    product?.barcodes[0]?.attributes?.color &&
                                                    <span>
                                                        Color: <strong>{product?.barcodes[0]?.attributes?.color}</strong> - Size:
                                                    </span>
                                                } - Size:
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
                        )}
                    </div>

                    {/* Cart footer */}
                    <div className="absolute bottom-0 left-0 w-full grid grid-cols-2 bg-light shadow-md">
                        <h3 className="bg-slate-200 py-2 text-center font-semibold">
                            Total: ৳{totalPrice}
                        </h3>
                        <button
                            onClick={handleCheckout}
                            className="bg-primary py-2 text-center text-light disabled:bg-slate-600 disabled:cursor-not-allowed" disabled={cart?.length == 0}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDesktop;
