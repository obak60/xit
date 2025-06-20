"use client";

import Filter from '@/components/page-comp/collections/filter';
import NoData from '@/components/reusuable/no-data';
import ProductCard from '@/components/reusuable/product-card';
import SectionLoading from '@/components/reusuable/section-loading';
import { getAllCategories } from '@/libs/categories';
import { getAllProducts } from '@/libs/products';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';


const CollectionsPage = () => {

    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get("category");

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, total: 0 });
    const [filters, setFilters] = useState({
        page: 1,
        per_page: 12,
        ...(categoryFromUrl ? { category_id: categoryFromUrl } : {})
    });


    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = await getAllProducts(filters);
            setProducts(res?.data?.items || []);
            setPagination(res?.data?.pagination || { current_page: 1, total: 0 });
            setLoading(false);
            if (res?.error) {
                toast.error(res?.error);
            }
        };
        fetchProducts();
    }, [filters]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getAllCategories();
            setCategories(
                res?.data?.map((cat) => ({
                    label: cat?.name,
                    value: cat?.id,
                })) || []
            );
            if (res?.error) {
                toast.error(res?.error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 pt-2 pb-8 lg:py-16">
                {/* Filter */}
                <Filter
                    categories={categories}
                    onFilterChange={(newFilters) =>
                        setFilters((prev) => ({
                            ...prev,
                            ...newFilters,
                            page: 1,
                        }))
                    }
                    selectedCategoryFromURL={categoryFromUrl}
                />

                {/* Products */}
                <div className="lg:col-span-4">
                    {loading ? (
                        <SectionLoading />
                    ) : products?.length == 0 ? (
                        <NoData />
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                {products.map((product) => (
                                    <ProductCard key={product?.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-10 flex justify-center">
                                <Pagination
                                    current={pagination.current_page}
                                    pageSize={filters.per_page}
                                    total={pagination.total}
                                    onChange={(page) =>
                                        setFilters((prev) => ({ ...prev, page }))
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
