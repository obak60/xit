"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const Actions = ({ product }) => {

    const router = useRouter();

    
    // add to cart fn
    const handleAddToCart = async() => {
        console.log(product);
    };

    // buy now fn
    const handleBuyNow = () => {
        const products = [{ id: product?.id, quantity: 1 }];

        Cookies.set("clothingCheckout", JSON.stringify(products), { expires: 1 });
        router.push("/checkout");
    };

    return (
        <>
            <button onClick={handleAddToCart} className="bg-primary text-white px-2 py-1 md:px-4 md:py-2 rounded-sm font-semibold text-[10px] md:text-sm">
                Add to Cart
            </button>
            <button onClick={handleBuyNow} className="bg-primary text-white px-2 py-1 md:px-4 md:py-2 rounded-sm font-semibold text-[10px] md:text-sm">
                Buy Now
            </button>
        </>
    );
};

export default Actions;