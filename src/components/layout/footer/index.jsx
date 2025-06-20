"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fbImg from '@/assets/icons/fb.webp';
import linkedinImg from '@/assets/icons/linkedin.png';
import whatsappImg from '@/assets/icons/whatsapp.png';
import xImg from '@/assets/icons/x.png';
import paymentImg from '@/assets/images/Payment.png';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall, IoIosMail } from "react-icons/io";
import { getFooterMenus, getFooterSettings } from "@/libs/footer";
import NoData from "@/components/reusuable/no-data";
import toast from "react-hot-toast";
import dummyImg from "@/assets/images/dummy-img.jpg";
import { useEffect, useState } from "react";


const Footer = () => {

    const [footerMenus, setFooterMenus] = useState(null);
    const [footerSettings, setFooterSettings] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const { data: menus, error: menuError } = await getFooterMenus();
                const { data: settings, error: settingsError } = await getFooterSettings();

                if (menuError || settingsError) {
                    toast.error(menuError || settingsError);
                    return;
                }

                setFooterMenus(menus);
                setFooterSettings(settings);
            } catch (err) {
                toast.error("Failed to load footer data");
                console.error(err);
            }
        };

        fetchFooterData();
    }, []);


    return (
        <footer>
            <div className='hidden md:block bg-dark text-white pt-12 md:pt-20 dark:border-t-2 dark:border-t-slate-500'>
                <div className='container'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>

                        {/* connect with us */}
                        <div className="col-span-2 md:mt-6 lg:mt-0">
                            {/* <h2 className="text-xl md:text-3xl font-bold mb-6 mt-5 sm:mt-0 uppercase">Connect With Us</h2> */}
                            <Image src={footerSettings?.logo || dummyImg} className="object-contain" width={130} height={100} alt={"logo"} />
                            <div className="flex items-center gap-2 pt-2">
                                <FaLocationDot />
                                <span>{footerSettings?.about_text}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoMdCall />
                                <Link href={`tel:${footerSettings?.phone}`}>{footerSettings?.phone}</Link>
                            </div>
                            <div className="flex items-center gap-2 text-lg">
                                <IoIosMail />
                                <Link href={`mailTo:${footerSettings?.email}`}>{footerSettings?.email}</Link>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                {
                                    footerSettings?.facebook &&
                                    <Link href={footerSettings?.facebook || "/"}>
                                        <Image src={fbImg || dummyImg} className="object-contain" width={25} height={25} alt={footerSettings?.facebook || "Facekook"} />
                                    </Link>
                                }
                                {
                                    footerSettings?.whatsapp &&
                                    <Link href={footerSettings?.whatsapp || "/"}>
                                        <Image src={whatsappImg || dummyImg} className="object-contain" width={25} height={25} alt={footerSettings?.whatsapp || "Whatsapp"} />
                                    </Link>
                                }
                                {
                                    footerSettings?.twitter &&
                                    <Link href={footerSettings?.twitter || "/"}>
                                        <Image src={xImg || dummyImg} className="object-contain" width={25} height={25} alt={footerSettings?.twitter || "Twitter"} />
                                    </Link>
                                }
                                {
                                    footerSettings?.linkedin &&
                                    <Link href={footerSettings?.linkedin || "/"}>
                                        <Image src={linkedinImg || dummyImg} className="object-contain" width={25} height={25} alt={footerSettings?.linkedin || "Linkedin"} />
                                    </Link>
                                }
                            </div>
                        </div>

                        {/* useful links */}
                        <div className="">
                            <h2 className="text-lg md:text-xl font-bold mb-6 mt-5 sm:mt-0 uppercase">Useful Links</h2>
                            <div className="flex flex-col gap-2 opacity-80">
                                {
                                    footerMenus?.useful_links?.length == 0 ?
                                        <NoData /> :
                                        <>
                                            {
                                                footerMenus?.useful_links?.map(item =>
                                                    <Link href={`/pages/${item?.slug}` || "/"} key={item?.id} className="w-fit overflow-hidden">
                                                        <p>{item?.title}</p>
                                                    </Link>
                                                )
                                            }
                                        </>
                                }
                            </div>
                        </div>

                        {/* support */}
                        <div>
                            <h2 className="text-lg md:text-xl font-bold mb-6 mt-5 sm:mt-0 uppercase">Customer Support</h2>
                            <div className="flex flex-col gap-2 opacity-80">
                                <Link href={`tel:${footerSettings?.phone}`} className="flex items-center gap-2 hover:underline">
                                    <Phone />
                                    {footerSettings?.phone}
                                </Link>
                                <Link href={`mailTo:${footerSettings?.email}`} className="flex items-center gap-2 hover:underline">
                                    <Mail />
                                    {footerSettings?.email}
                                </Link>
                                {
                                    footerSettings?.support_email &&
                                    <Link href={`mailTo:${footerSettings?.support_email}`} className="flex items-center gap-2 hover:underline">
                                        <Mail />
                                        {footerSettings?.support_email}
                                    </Link>
                                }
                            </div>
                        </div>

                    </div>

                    {/* copyright section */}
                    <div className="text-xs md:text-sm py-10 mt-10 border-t border-t-slate-400 flex justify-between">
                        <p> © 2025 - Designed By
                            <Link href={'https://vida.com.bd/'} target="_blank" className="ml-2">Vida Technology</Link>
                        </p>
                        <Image src={paymentImg} className="w-fit h-[35px] object-contain" width={0} height={0} alt="payment options" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;