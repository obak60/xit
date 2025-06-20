import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import dummyImage from "@/assets/images/dummy-img.jpg";
import { getFeaturedBanner1, getFeaturedBanner2, getFeaturedBottomBanners } from '@/libs/banners';
import toast from 'react-hot-toast';


const Featured = async () => {

    const { data: firstBanner, error: firstBannerError } = await getFeaturedBanner1();
    const { data: secondBanner, error: secondBannerError } = await getFeaturedBanner2();
    const { data: bottomBanners, error: bottomBannerError } = await getFeaturedBottomBanners();

    if (firstBannerError || secondBannerError || bottomBannerError) {
        return toast.error(firstBannerError || secondBannerError || bottomBannerError);
    }

    return (
        <>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4'>

                    <div className="relative group max-h-[550px]">
                        <Image src={firstBanner?.[0]?.image || dummyImage} className='w-full h-full object-cover rounded-md' width={500} height={400} alt={firstBanner?.[0]?.title || "featured image"} />
                        {/* overlay */}
                        <div className='absolute z-0 top-0 left-0 w-full h-full bg-dark/40 md:bg-dark/0 md:group-hover:bg-dark/50 duration-200 rounded-md'></div>
                        {/* content */}
                        <div className='absolute z-10 top-0 left-0 w-full h-full text-light px-5 md:px-10 py-16 md:py-28 flex flex-col justify-between'>
                            <h2 className='md:opacity-0 md:group-hover:opacity-100 text-lg md:text-4xl font-bold uppercase'>
                                {firstBanner?.[0]?.title?.split(' ')?.map((word, index) => (
                                    <span key={index} className='block'>{word}</span>
                                ))}
                            </h2>
                            <Link href={"/collections"} className='button md:opacity-0 md:group-hover:opacity-100 duration-200'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                    <div className="md:col-span-2 relative group max-h-[550px]">
                        <Image src={secondBanner?.[0]?.image || dummyImage} className='w-full h-full object-cover rounded-md' width={500} height={400} alt={secondBanner?.[0]?.title || "featured image"} />
                        {/* overlay */}
                        <div className='absolute z-0 top-0 left-0 w-full h-full bg-dark/40 md:bg-dark/0 md:group-hover:bg-dark/50 duration-200 rounded-md'></div>
                        {/* content */}
                        <div className='absolute z-10 top-0 left-0 w-full h-full text-light px-5 md:px-10 py-16 md:py-28 flex flex-col justify-between'>
                            <h2 className='md:opacity-0 md:group-hover:opacity-100 text-lg md:text-4xl font-bold uppercase'>
                                {secondBanner?.[0]?.title?.split(' ')?.map((word, index) => (
                                    <span key={index} className='block'>{word}</span>
                                ))}
                            </h2>
                            <Link href={"/collections"} className='button md:opacity-0 md:group-hover:opacity-100 duration-200'>
                                Shop Now
                            </Link>
                        </div>
                    </div>



                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 pt-2 md:pt-4'>
                    {
                        bottomBanners?.map(item =>
                            <Link href={item?.href || "/collections"} key={item?.id} className='block relative group'>
                                <Image src={item?.image || dummyImage} className='w-full h-full object-cover rounded-md' width={500} height={400} alt={item?.title || "featured image"} />
                                {/* overlay */}
                                <div className='absolute z-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-[calc(100%-30px)] h-[calc(100%-30px)] bg-dark/50 md:bg-dark/0 md:group-hover:bg-dark/50 duration-200 rounded-md flex justify-center items-center'>
                                    <h3 className='text-white text-lg md:text-2xl font-bold uppercase md:opacity-0 md:group-hover:opacity-100 duration-200'>{item?.title}</h3>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Featured;