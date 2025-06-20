import NoData from "@/components/reusuable/no-data";
import { getOfferBanners } from "@/libs/banners";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import dummyImg from "@/assets/images/dummy-img.jpg";


const Offers = async () => {

    const { data: offers, error } = await getOfferBanners();

    if (error) {
        return toast.error(error);
    }

    if (!offers || offers.length === 0) {
        return <NoData />;
    }

    return (
        <div className="container">
            <h2 className='section-heading'>Unlimited Offer</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                {
                    offers?.map(offer =>
                        <Link href={offer?.link || "/"} key={offer?.id} className="block">
                            <Image src={offer?.image || dummyImg} className="w-full h-full object-cover" width={500} height={100} alt={offer?.title || "offer image"} />
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Offers;