"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoEyeOutline, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { getSingleProduct } from "@/libs/products";
import SectionLoading from "../section-loading";
import ProductInfo from "@/components/page-comp/product-details/product-info";


const QuickView = ({ productId }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});


    const handleOpenModal = async (id) => {
        setIsOpen(true);
        const res = await getSingleProduct(id);
        setProduct(res?.data || {});
        setLoading(false);
        if (res?.error) {
            toast.error(error)
        }
    };


    // 🔹 Lock & Unlock Scrolling when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = ""; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = ""; // Clean up on unmount
        };
    }, [isOpen]);

    const closeModal = () => setIsOpen(false);


    return (
        <>
            {/* Open Modal Button */}
            <button
                className="text-light px-1 md:px-2 py-[2px] md:py-1 bg-primary md:text-xl rounded-md flex items-center gap-2"
                onClick={() => handleOpenModal(productId)}
            >
                <IoEyeOutline />
                <span className="text-xs md:text-sm 2xl:text-base">Preview</span>
            </button>

            {/* Modal (Rendered in Portal) */}
            {isOpen && createPortal(
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 " onClick={closeModal} >
                    <div className="w-[calc(100vw-20px)] lg:max-w-7xl h-[calc(100vh-100px)] relative bg-light px-6 overflow-auto rounded-lg md:rounded-none shadow-lg pb-6"
                        onClick={(e) => e.stopPropagation()}>

                        <div className="mx-auto">

                            <div className="sticky z-20 left-0 top-0 bg-light flex justify-between items-center pb-2 mb-4 border-b border-b-slate-200 pt-3">
                                <h2 className="text-base md:text-xl font-semibold">Quick View</h2>
                                <button onClick={closeModal} className="text-xl px-2 py-1 bg-dark text-light rounded-md" >
                                    <IoClose />
                                </button>
                            </div>

                            {
                                loading ?
                                    <SectionLoading />
                                    :
                                    <ProductInfo product={product} />
                            }

                        </div>
                    </div>
                </div>,
                document.body // Render modal at the root level
            )}
        </>
    );
};

export default QuickView;
