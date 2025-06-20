"use client";

import NoData from '@/components/reusuable/no-data';
import SectionLoading from '@/components/reusuable/section-loading';
import { getAllProducts } from '@/libs/products';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import dummyImg from "@/assets/images/dummy-img.jpg";
import Image from 'next/image';


const SearchDesktop = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const router = useRouter();


    useEffect(() => {
        if (searchText) {
            setLoading(true);
            const fetchData = async () => {
                const res = await getAllProducts({ name: searchText });
                setProducts(res?.data?.items || [])
                setLoading(false);
                if (res?.error) {
                    toast.error(res?.error)
                }
            };
            fetchData();
        }
    }, [searchText]);


    return (
        <>
            <div className="flex items-center border border-primary rounded-md w-full">
                <input
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder="I'm shopping for ..."
                    className="w-full px-3 py-2 outline-none text-dark rounded-md"
                />
                <button className="bg-primary px-3 py-2 text-white flex items-center justify-center mr-1 rounded-md">
                    <FaSearch />
                </button>
            </div>
            {
                searchText &&
                <div className='fixed left-0 top-[108px] bg-light w-full h-screen px-10 py-6 border-t'>
                    <div className='container'>
                        <h3 className='font-semibold'>You searched for: {searchText}</h3>
                        {
                            loading ?
                                <SectionLoading />
                                :
                                <>
                                    {
                                        products?.length == 0 ?
                                            <NoData />
                                            :
                                            <div className='grid grid-cols-4 2xl:grid-cols-5 gap-3 mt-4'>
                                                {
                                                    products?.map(product =>
                                                        <div
                                                            onClick={() => {
                                                                router.push(`/collections/${product?.id}`);
                                                                setSearchText("");
                                                                setProducts([]);
                                                            }} key={product?.id} className="flex gap-4 mb-3 cursor-pointer">
                                                            <Image src={product?.images[0] || dummyImg} width={80} height={50} className="object-cover" alt={product?.name || "product image"} />
                                                            <div>
                                                                <h3 className="font-semibold">{product?.name}</h3>
                                                                <p>৳{product?.selling_price}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                    }
                                </>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default SearchDesktop;