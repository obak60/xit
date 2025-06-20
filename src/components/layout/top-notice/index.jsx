import Link from 'next/link';
import React from 'react';


const TopNotice = ({ headerData }) => {
    return (
        <div className='bg-dark w-full h-8 text-[10px] md:text-sm text-white flex justify-center gap-2 py-[6px] overflow-hidden'>
            <h2>{headerData?.topbar_text || ""}</h2>
            <Link href={"/collections"} className='text-amber-400 underline'>
                {headerData?.topbar_link_text || ""}
            </Link>
        </div>
    );
};

export default TopNotice;