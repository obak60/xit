"use client";

import RelatedProducts from '@/components/page-comp/product-details/related-products';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SectionLoading from '@/components/reusuable/section-loading';
import { getSingleProduct } from '@/libs/products';
import ProductInfo from '@/components/page-comp/product-details/product-info';


const ProductDetails = () => {

    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});


    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getSingleProduct(slug);
            setProduct(res?.data || {});
            setLoading(false);
            if (res?.error) {
                toast.error(error)
            }
        };
        fetchProduct();
    }, [slug]);


    return (
        <div className="bg-light py-10 mx-auto">
            <div className="container">
                <nav className="text-sm text-gray-500 mb-4">
                    Home &gt; Collection &gt; <span className="text-gray-800">{product?.name}</span>
                </nav>

                {
                    loading ?
                        <SectionLoading />
                        :
                        <ProductInfo product={product} />
                }

                {
                    product && <RelatedProducts categoryId={product?.category?.id} />
                }
            </div>
        </div>
    );
};

export default ProductDetails;
