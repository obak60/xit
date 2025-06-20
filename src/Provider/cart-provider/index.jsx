"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getcheckoutProducts } from "@/libs/products";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load cart from cookies
    useEffect(() => {
        const cartFromCookie = Cookies.get("cart");
        if (cartFromCookie) {
            setCart(JSON.parse(cartFromCookie));
        }
    }, []);

    // Fetch valid products and remove invalid cart items
    useEffect(() => {
        const validateCartWithProducts = async () => {
            if (cart.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }

            const barcodes = cart.map(item => item.code);
            const res = await getcheckoutProducts(barcodes);
            const fetchedProducts = res?.data || [];
            
            if (res?.error) {
                toast.error(res?.error);
                setLoading(false);
                return;
            }

            // Filter invalid cart items
            const validCodes = fetchedProducts.map(p => p?.barcodes[0]?.barcode);
            const validCart = cart.filter(item => validCodes.includes(item.code));

            if (validCart.length !== cart.length) {
                setCart(validCart);
                Cookies.set("cart", JSON.stringify(validCart), {
                    expires: 1 / 3.5, // ~7 hours
                });
            }

            setProducts(fetchedProducts);
            setLoading(false);
        };

        validateCartWithProducts();
    }, [cart]);

    // Sync cart to cookies with 7-8 hour expiration
    useEffect(() => {
        if (cart.length > 0) {
            Cookies.set("cart", JSON.stringify(cart), {
                expires: 1 / 3.5, // ~7 hours
            });
        } else {
            Cookies.remove("cart");
        }
    }, [cart]);

    const addToCart = ({ code, quantity = 1 }) => {
        const existingIndex = cart.findIndex(
            (item) => item.code == code
        );

        if (existingIndex !== -1) {
            toast.error("Already Added!");
            return;
        } else {
            const updatedCart = [...cart, { code, quantity }];
            setCart(updatedCart);
            toast.success("Added Successfully!");
        }
    };

    const increaseQuantity = (code) => {
        const updatedCart = cart.map((item) =>
            item.code === code ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const decreaseQuantity = (code) => {
        const updatedCart = cart.map((item) =>
            item.code === code ? { ...item, quantity: item.quantity - 1 } : item
        ).filter((item) => item.quantity > 0); // remove item if quantity goes to 0
        setCart(updatedCart);
    };


    const removeFromCart = (code) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item.code === code))
        );
    };

    const clearCart = () => {
        setCart([]);
        Cookies.remove("cart");
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, loading, products }}>
            {children}
        </CartContext.Provider>
    );
};