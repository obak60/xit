"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SectionLoading from '@/components/reusuable/section-loading';
import { getSliders } from '@/libs/banners';
import toast from 'react-hot-toast';
import dummyImg from "@/assets/images/dummy-img.jpg";


const BannerCarousel = () => {

    const [loading, setLoading] = useState(true);
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        const fetchBanners=  async() => {
            const res = await getSliders();
            setSliderData(res?.data);
            setLoading(false);
            if(res?.error){
                toast.error(res?.error);
            }
        };
        fetchBanners();
    },[]);


    if(loading){
        return <SectionLoading />
    }

    return (
        <div className='relative'>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                // navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 6000 }}
                loop
                className="w-full"
            >
                {sliderData?.map((slide) => (
                    <SwiperSlide key={slide?.id}>
                        <Link href={slide?.link || "/"} className='block'>
                            <Image src={slide?.image || dummyImg} className='w-full max-h-[500px] object-cover rounded-md' width={400} height={200} alt={slide?.title || "banner image"} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerCarousel;
