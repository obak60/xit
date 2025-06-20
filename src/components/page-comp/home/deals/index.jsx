"use client";

import SectionLoading from "@/components/reusuable/section-loading";
import { getDealsBanner } from "@/libs/banners";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dummyImg from "@/assets/images/dummy-img.jpg";


const Deals = () => {

    const [loading, setLoading] = useState(true);
    const [bannerData, setBannerData] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            const res = await getDealsBanner();
            setBannerData(res?.data);
            setLoading(false);
            if (res?.error) {
                toast.error(res?.error);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 73);
            targetDate.setHours(0, 0, 0, 0);

            const difference = targetDate - new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft()); // Set initial value after mount

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    if (loading) {
        return <SectionLoading />
    }

    return (
        <div className='container'>
            <div className="py-10 md:py-28 bg-cover bg-center pr-4 md:pr-10 rounded-md relative overflow-hidden"
                style={{ backgroundImage: `url(${bannerData?.[0]?.image || dummyImg.src})` }}>

                {/* overlay */}
                <div className="w-full h-full absolute z-0 left-0 top-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-50"></div>

                <div className='relative z-10 flex flex-col items-end gap-5 text-white'>
                    <h2 className="text-xl md:text-4xl font-bold">Deal Of This Week</h2>
                    <p className="md:text-lg">Offering hot deal for this Eid festival</p>
                    <div className="flex justify-end gap-2">
                        {[`${timeLeft.days} DAYS`, `${timeLeft.hours} HOURS`, `${timeLeft.minutes} MINS`, `${timeLeft.seconds} SECS`].map((time, idx) => (
                            <div key={idx} className="bg-yellow-400 text-black p-2 md:p-4 text-xs md:text-lg font-bold">
                                {time}
                            </div>
                        ))}
                    </div>
                    <Link href={"/collections"} className="button !bg-dark hover:!bg-primary">
                        Explore Now →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Deals;