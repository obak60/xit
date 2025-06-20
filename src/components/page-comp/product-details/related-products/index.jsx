"use client";

import { useEffect, useState } from 'react';
import ProductCard from '@/components/reusuable/product-card';
import { getRelatedProducts } from '@/libs/products';
import toast from 'react-hot-toast';


const RelatedProducts = ({ categoryId }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categoryId) {
            const fetchData = async () => {
                const res = await getRelatedProducts(categoryId);
                if (res?.error) {
                    toast.error(res?.error);
                } else {
                    setProducts(res?.data || []);
                }
            };

            fetchData();
        }
    }, [categoryId]);

    if (!categoryId || products?.length === 0) return null;

    return (
        <div className="py-10 md:py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
