"use client";

import { Select } from 'antd';
import { useEffect, useState } from 'react';
import "./index.css";

const Filter = ({ categories, onFilterChange, selectedCategoryFromURL }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);

    const sortOptions = [
        { label: "Accending", value: "asc" },
        { label: "Descending", value: "desc" },
    ];

    useEffect(() => {
    if (selectedCategoryFromURL) {
        const selectedId = Number(selectedCategoryFromURL);
        setSelectedCategory(selectedId);
    }
}, [selectedCategoryFromURL]);



    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        onFilterChange({
            category_id: value,
            sort_dir: selectedSort,
        });
    };

    const handleSortChange = (value) => {
        setSelectedSort(value);
        onFilterChange({
            category_id: selectedCategory,
            sort_dir: value,
        });
    };


    return (
        <div className='lg:pr-6'>
            <h2 className='text-sm md:text-lg font-semibold pb-4'>Filter Collections</h2>

            <div className='grid grid-cols-2 gap-5 lg:block'>
                {/* Category Filter */}
                <div>
                    <h3 className='font-semibold'>Category</h3>
                    <Select
                        className='w-full border border-slate-300 rounded-sm mt-1 mb-4'
                        options={categories}
                        placeholder='Select One'
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                        allowClear
                    />
                </div>

                {/* Asc/Dsc Filter */}
                <div>
                    <h3 className='font-semibold'>Sort</h3>
                    <Select
                        className='w-full border border-slate-300 rounded-sm mt-1 mb-4'
                        options={sortOptions}
                        placeholder='Select One'
                        onChange={handleSortChange}
                        allowClear
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
