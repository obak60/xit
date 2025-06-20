"use client";

import NotFound from '@/app/not-found';
import SectionLoading from '@/components/reusuable/section-loading';
import { getDynamicPage } from '@/libs/dynamicPage';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const DynamicPage = () => {
    const { slug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const res = await getDynamicPage(slug);
                setPageData(res?.data);
                if (res?.error) {
                    toast.error(res?.error);
                }
            } catch (error) {
                toast.error("Failed to fetch page data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPageData();
    }, [slug]);

    // for update page content and seo
    useEffect(() => {
        if (pageData?.meta_title) {
            document.title = pageData.meta_title;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', pageData.meta_description);
            } else {
                const desc = document.createElement('meta');
                desc.name = "description";
                desc.content = pageData.meta_description;
                document.head.appendChild(desc);
            }
        }
    }, [pageData]);
    

    if (loading) {
        return <SectionLoading />;
    }

    if(!loading && !pageData){
        return <NotFound />
    }

    return (
        <div className='container'>
            {/* SEO meta tags */}
            {pageData && (
                <Head>
                    <title>{pageData?.meta_title}</title>
                    <meta name="description" content={pageData?.meta_description} />
                    <meta property="og:title" content={pageData?.meta_title} />
                    <meta property="og:description" content={pageData?.meta_description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${origin}/pages/${slug}`} />
                </Head>
            )}

            <div className='py-4 md:py-6 bg-light'>
                <h2 className='text-lg md:text-2xl font-bold pb-5'>{pageData?.title}</h2>
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: pageData?.content }}
                ></div>
            </div>
        </div>
    );
};

export default DynamicPage;
