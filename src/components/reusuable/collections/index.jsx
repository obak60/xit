"use client";

import { useRef, useEffect } from "react";
import ProductCard from '@/components/reusuable/product-card';
import { allProducts } from '@/utils/allProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";


const Collection = ({ title, products = [], className = "", tag = "", savedTag = false }) => {

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
            <div className={`${className} px-2 py-4 md:p-8 rounded-sm relative`}>
                <div className='flex justify-between items-center pb-6'>
                    <h2 className='text-lg md:text-3xl font-semibold capitalize'>
                        {title}
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
                    loop={products?.length > 2}
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
                                <ProductCard product={product} />
                                <p className="absolute left-0 top-6 bg-primary text-light px-2 py-0 text-[10px] md:text-xs rounded-r-full">{tag}</p>
                                {
                                    savedTag &&
                                    <p className="absolute left-0 top-12 bg-red-600 text-light px-2 py-0 text-[10px] md:text-xs rounded-r-full">{"Saved ৳85"}</p>
                                }
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>

                {/* view all button */}
                <Link href={`/collections?category=${products[0]?.category?.id}`} className="button mx-auto flex mt-4 md:mt-8">View All</Link>
            </div>
        </div>
    );
};

export default Collection;
