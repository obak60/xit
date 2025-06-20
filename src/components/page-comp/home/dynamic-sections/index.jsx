import Collection from '@/components/reusuable/collections';
import { getDynamicSections } from '@/libs/homeSections';
import React from 'react';
import toast from 'react-hot-toast';

const DynamicSections = async () => {

    const { data: sectionData, error } = await getDynamicSections();

    if (error) {
        return toast.error(error);
    }

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

export default DynamicSections;