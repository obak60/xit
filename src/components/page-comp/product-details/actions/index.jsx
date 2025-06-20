"use client";

import { useCart } from "@/Provider/cart-provider";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const Actions = ({ product }) => {

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart } = useCart();
    const router = useRouter();

    // quantity fn
    const handleQuantity = (type) => {
        if (type == "increase") {
            setQuantity(quantity + 1);
        }
        else {
            if (quantity > 1) setQuantity(quantity - 1);
        }
    };


    // add to cart fn
    const handleAddToCart = async () => {
        if (!selectedSize) {
            return toast.error("Please Select Size!");
        }
        addToCart({
            code: selectedSize,
            quantity,
        });
    };

    // buy now fn
    const handleCheckout = async () => {
        if (!selectedSize) {
            return toast.error("Please Select Size!");
        }
        const item = {
            code: selectedSize,
            quantity,
        };
        Cookies.set("checkoutItems", JSON.stringify([item]), { expires: 1 / 24 }); // 1 hrs

        router.push("/checkout");
    };

    // check if product has color
    const hasColor = product?.barcodes?.some((item) => item.attributes.color);

    // get unique colors
    const colors = hasColor
        ? [...new Set(product.barcodes.map((item) => item.attributes.color))]
        : [];

    // get unique sizes
    const sizes = [...new Set(product.barcodes.map((item) => item.attributes.size))];

    // get available sizes for a color
    const getSizesForColor = (color) =>
        product.barcodes
            .filter((item) => item.attributes.color === color)
            .map((item) => item.attributes.size);

    // get barcode for size and optional color
    const getBarcode = (size) =>
        product.barcodes.find(
            (item) =>
                item.attributes.size === size &&
                (!hasColor || item.attributes.color === selectedColor)
        )?.barcode;


    return (
        <div>
            {/* size selection */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Size</h3>

                {/* if colors exist */}
                {hasColor && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {colors.map((color, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSelectedColor(color);
                                    setSelectedSize(null); // reset size on color change
                                }}
                                className={`px-4 py-2 rounded border text-sm font-medium ${selectedColor === color
                                        ? "bg-primary text-white border-primary"
                                        : "border-gray-400 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                )}

                {/* size buttons */}
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size, idx) => {
                        const isEnabled = hasColor
                            ? selectedColor
                                ? getSizesForColor(selectedColor)
                                .includes(size)
                                : false
                            : true;

                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (hasColor && !selectedColor) {
                                        toast.error("Please select color first!");
                                        return;
                                    }
                                    if (isEnabled) setSelectedSize(
                                        product.barcodes.find(
                                            item =>
                                                item.attributes.size === size &&
                                                (!hasColor || item.attributes.color === selectedColor)
                                        ).barcode
                                    );
                                }}
                                disabled={!isEnabled}
                                className={`w-12 h-12 border rounded-full flex items-center justify-center text-sm font-semibold ${selectedSize &&
                                        product.barcodes.find(b =>
                                            b.barcode === selectedSize && b.attributes.size === size
                                        )
                                        ? "bg-primary text-white border-primary"
                                        : isEnabled
                                            ? "border-gray-400 text-gray-700 hover:bg-gray-100"
                                            : "border-gray-300 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>




            {/* quantity selector */}
            <div className="flex items-center space-x-4 mt-5">
                <h3 className="text-lg font-semibold text-gray-800">Quantity</h3>
                <div className="flex items-center border rounded-full">
                    <button onClick={() => handleQuantity("decrease")} className="w-10 h-10 flex items-center justify-center text-lg border-r" >
                        -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button onClick={() => handleQuantity("increase")} className="w-10 h-10 flex items-center justify-center text-lg border-l" >
                        +
                    </button>
                </div>
            </div>


            {/* action buttons */}
            <div className="grid grid-cols-2 gap-4 font-semibold mt-5">
                <button onClick={handleAddToCart} className="!w-full button">Add To Cart</button>
                <button onClick={handleCheckout} className="!w-full button !bg-light !text-dark border border-dark">Buy Now</button>
            </div>
        </div>
    );
};

export default Actions;