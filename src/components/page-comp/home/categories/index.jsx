"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/libs/categories";
import toast from "react-hot-toast";
import NoData from "@/components/reusuable/no-data";
import dummyImg from "@/assets/images/dummy-img.jpg";
import SectionLoading from "@/components/reusuable/section-loading";


const Categories = () => {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);


    // fetch categories
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllCategories();
            setCategories(res?.data || []);
            setLoading(false)
            if (res?.error) {
                toast.error(res?.error)
            }
        }
        fetchProducts();
    }, []);


    return (
        <div className="container">
            <h2 className="section-heading">Categories We Have</h2>
            {
                loading ?
                    <SectionLoading />
                    :
                    <>
                        {
                            categories?.length == 0 ?
                                <NoData />
                                :
                                <div>
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={20}
                                        slidesPerView={2}
                                        breakpoints={{
                                            380: { slidesPerView: 3 },
                                            640: { slidesPerView: 4 },
                                            1024: { slidesPerView: 8 }
                                        }}
                                        // navigation
                                        // pagination={{ clickable: true }}
                                        loop={categories?.length > 3}
                                        autoplay={{ delay: 2000 }}
                                        className="w-full"
                                    >
                                        {categories?.map(category => (
                                            <SwiperSlide key={category?.id}>
                                                <Link href={`/collections?category=${category?.id}`}>
                                                    <Image src={category?.image_url || dummyImg} className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] object-cover rounded-full mx-auto" width={100} height={100} alt={category?.name || "category name"} />
                                                    <h3 className="mt-3 text-center">{category?.name}</h3>
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                        }
                    </>
            }
        </div>
    );
};

export default Categories;
