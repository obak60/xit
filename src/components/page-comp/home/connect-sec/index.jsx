import Link from 'next/link';
import React from 'react';
import { MdAddIcCall } from "react-icons/md";


const ConnectSec = () => {
    return (
        <div className='bg-slate-200 section-padding'>
            <div className='container'>
                <div className='flex flex-col gap-y-1 items-center font-bold text-sm md:text-lg'>
                    <div className='flex items-center gap-1 text-xl md:text-2xl hover:underline text-green-700'>
                        <MdAddIcCall />
                        <Link href={"tel:+09617888871"}>+09617888871</Link>
                    </div>
                    <p className='font-bangla'>ওয়েবসাইট থেকে <span className='text-xl text-pink-600'>Order</span> করুন, অথবা কল দিন।</p>
                    <div className='font-bangla'>আমাদের সকল কালেকশন দেখতে
                        <Link href={"/collections"} className='ml-1 text-blue-700'>ক্লিক করুন</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectSec;