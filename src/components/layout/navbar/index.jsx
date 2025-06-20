'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MobileMenu from './mobile-menu';
import TopNotice from '../top-notice';
import SearchBar from './search-bar';
import { CiMenuFries } from "react-icons/ci";
import SearchDesktop from './search-desktop';
import { getHeaderData } from '@/libs/header';
import toast from 'react-hot-toast';
import dummyImg from '@/assets/images/dummy-img.jpg';
import { MdAddIcCall } from "react-icons/md";
import CartDesktop from './cart-desktop';


const Navbar = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const [headerData, setHeaderData] = useState([]);
    const [openCart, setOpenCart] = useState(false);

    // load data
    useEffect(() => {
        const fetchHeaderData = async () => {
            const res = await getHeaderData();
            setHeaderData(res?.data || []);
            if (res?.error) {
                toast.error(res?.error);
            }
        }
        fetchHeaderData();
    }, [])

    // close mobile menu when clicking outside
    useEffect(() => {
        function handleClickOutsideMobileMenu(event) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.md\\:hidden')) {
                setIsNavOpen(false);
            }
        }
        if (isNavOpen) {
            document.addEventListener("mousedown", handleClickOutsideMobileMenu);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
        };
    }, [isNavOpen]);


    // prevent scrolling
    useEffect(() => {
        if (isNavOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isNavOpen]);


    // dummy data
    const navItems = [
        { id: 1, name: "All Collecitons", url: "/collections", },
        { id: 2, name: "Clothing", url: "/collections", },
        { id: 4, name: "Jewelleries", url: "/collections", },
        { id: 3, name: "Kids", url: "/collections", },
    ];

    return (
        <>
            <div className={`fixed top-0 w-full z-40 pb-0  transition-all bg-light shadow-md `}>
                <TopNotice headerData={headerData} />
                <div className='container'>

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-4'>

                        {/* logo */}
                        <Link href={'/'}>
                            <Image src={headerData?.header_logo || dummyImg} className='max-w-24 h-8 md:h-12 object-contain' width={100} height={100} alt='logo' />
                        </Link>

                        <nav className='hidden md:col-span-2 md:flex justify-center items-center gap-4'>
                            {
                                navItems?.map(item =>
                                    <Link href={item?.url || "/"} key={item?.id} className='capitalize'>
                                        {item?.name}
                                    </Link>
                                )
                            }
                        </nav>

                        <div className='hidden md:flex items-center gap-x-3'>
                            <SearchDesktop />
                            <CartDesktop openCart={openCart} setOpenCart={setOpenCart} />
                            <Link href={"tel:+01823622125"}>
                                <MdAddIcCall className='text-2xl text-primary' />
                            </Link>
                        </div>

                        <div className='flex justify-end items-center gap-3 md:hidden'>
                            <div>
                                <SearchBar />
                            </div>
                            {/* mobile menu btn */}
                            <button onClick={() => setIsNavOpen(true)} className='text-xl ml-2'>
                                <CiMenuFries />
                            </button>
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <div ref={mobileMenuRef}>
                    <MobileMenu logo={headerData?.header_logo} navItems={headerData?.collections || []} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                </div>
            </div>
        </>
    );
};

export default Navbar;