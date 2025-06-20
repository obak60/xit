"use client";

import { useRef, useEffect } from "react";
import ProductCard from '@/components/reusuable/product-card';
import { allProducts } from '@/utils/allProducts';
import { RiDiscountPercentFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineDiscount } from "react-icons/md";


const SpecialDiscounts = () => {
    const products = allProducts();

    // Refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
            swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, []);

    return (
        <div className='container'>
            <div className='bg-dark text-light px-2 py-6 md:p-14 rounded-sm relative overflow-hidden'>
                <div className='flex justify-between items-center pb-6 '>
                    <h2 className='text-lg md:text-2xl font-semibold flex items-center gap-1'>
                        <RiDiscountPercentFill />
                        Special Discounts
                    </h2>
                    {/* Prev/Next Buttons */}
                    <div className='flex space-x-2'>
                        <button ref={prevRef} className='bg-light text-dark p-2 text-xl md:text-3xl rounded-sm'>
                            <IoIosArrowBack />
                        </button>
                        <button ref={nextRef} className='bg-light text-dark p-2 text-xl md:text-3xl rounded-sm'>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                        1150: { slidesPerView: 4 },
                        1300: { slidesPerView: 5 }
                    }}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                >
                    {products?.map(product =>
                        <SwiperSlide key={product?.id}>
                            <div className="relative">
                                <ProductCard product={product} className="!bg-dark !text-white" titleClass="!text-light" />
                                <div className="absolute left-0 top-5 bg-red-500 px-2 text-xs md:text-sm flex items-center gap-1">
                                    <MdOutlineDiscount />
                                    Saved ৳100
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default SpecialDiscounts;
