"use client";

import { CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { getAllProducts } from "@/libs/products";
import Image from "next/image";
import dummyImg from "@/assets/images/dummy-img.jpg";
import NoData from "@/components/reusuable/no-data";
import SectionLoading from "@/components/reusuable/section-loading";
import { useRouter } from "next/navigation";


const SearchBar = () => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const router = useRouter();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSearchText("");
        setProducts([]);
    };

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
        <div>
            <button onClick={showDrawer}>
                <CiSearch className="text-2xl mt-1" />
            </button>
            <>
                <Drawer title="Search Here..." onClose={onClose} open={open}>
                    <div>
                        <input type="text" onChange={(e) => setSearchText(e.target.value)} className="input !w-full" value={searchText} placeholder="Ex. Lipstic" />
                    </div>

                    <div className={`${!searchText && "hidden"} pt-4`}>
                        {
                            loading ?
                                <SectionLoading />
                                :
                                <>
                                    {
                                        products?.length == 0 ?
                                            <NoData />
                                            :
                                            <>
                                                {
                                                    products?.map(product =>
                                                        <div
                                                            onClick={() => {
                                                                router.push(`/collections/${product?.id}`);
                                                                setOpen(false);
                                                                setSearchText("");
                                                                setProducts([]);
                                                            }} key={product?.id} className="flex gap-4 mb-3 cursor-pointer">
                                                            <Image src={product?.images[0] || dummyImg} width={60} height={40} className="object-cover" alt={product?.name || "product image"} />
                                                            <div>
                                                                <h3 className="font-semibold">{product?.name}</h3>
                                                                <p>৳{product?.selling_price}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </>
                                    }
                                </>
                        }
                    </div>
                </Drawer>
            </>

        </div>
    );
};

export default SearchBar;