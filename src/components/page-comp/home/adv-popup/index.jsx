"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dummyImage from "@/assets/images/dummy-img.jpg";


const AdvPopup = () => {

    // const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isModalClosed = sessionStorage.getItem("advPopupClosed");
        if (!isModalClosed) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("advPopupClosed", "true");
        document.body.style.overflow = "auto";
    };

    if (!isOpen) return null;

    // dumjmy image
    const image = "https://iili.io/3ESFzDF.webp";


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="w-[70%] h-[calc(100vh-100px)] bg-transparent rounded-lg shadow-lg p-4 flex justify-center items-center ">
                <div className="relative">
                    <Link href="/collections">
                        <Image src={image || dummyImage} className="w-full h-full object-cover rounded-md" width={500} height={400} alt="Adv Image" />

                    </Link>
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 bg-dark text-white w-8 h-8 rounded-md flex items-center justify-center text-lg hover:bg-primary duration-200"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvPopup;
