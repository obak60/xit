import Collection from '@/components/reusuable/collections';
import { getStaticSections } from '@/libs/homeSections';
import React from 'react';
import toast from 'react-hot-toast';

const StaticSections = async () => {

    const { data: sectionData, error } = await getStaticSections();

    if (error) {
        return toast.error(error);
    }

    // add 3 sections with deals section

    return (
        <div className='container'>
            <div className='space-y-8 md:space-y-16'>
                {
                    sectionData?.map((section, idx) =>
                        <Collection
                            key={section?.section_number || idx}
                            title={section?.section_name || ""}
                            products={section?.products}
                            className={`${section?.products?.length == 0 && "hidden"} bg-slate-100`}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default StaticSections;