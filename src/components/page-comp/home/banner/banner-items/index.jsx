import NoData from "@/components/reusuable/no-data";
import { getTopBanners } from "@/libs/banners";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import dummyImg from "@/assets/images/dummy-img.jpg";


const BannerItems = async () => {

    const { data: items, error } = await getTopBanners();

    if (error) {
        return toast.error(error);
    }

    if (!items || items.length === 0) {
        return <NoData />;
    }

    return (
        <div className="h-full flex flex-col">
            <div className="grid grid-cols-2 gap-2 md:gap-5 flex-grow">
                {
                    items?.map(item =>
                        <Link href={item?.link || "/"} key={item?.id} className="block">
                            <Image src={item?.image || dummyImg} className='w-full h-full object-cover rounded-md' width={200} height={200} alt={item?.title || "item image"} />
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default BannerItems;