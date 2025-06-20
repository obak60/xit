"use client";

import InfoForm from "@/components/page-comp/checkout/info-form";
import SectionLoading from "@/components/reusuable/section-loading";
import { getcheckoutProducts } from "@/libs/products";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dummyImg from "@/assets/images/dummy-img.jpg";
import { getDeliveryCharges, placeOrder } from "@/libs/order";
import NoData from "@/components/reusuable/no-data";
import SuccessOrder from "@/components/page-comp/checkout/success";


const CheckoutPage = () => {

    const [checkoutItems, setCheckoutItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [deliveryChages, setDeliveryCharges] = useState({});
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [successOrderData, setSuccessOrderData] = useState({});
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        phone: "",
        address: "",
        notes: "",
        paymentOption: "",
    });

    // load deliver fee
    useEffect(() => {
        setLoading(true);
        const fetchDeliveryFee = async () => {
            const res = await getDeliveryCharges();
            if (res?.data?.success) {
                setDeliveryCharges(res?.data?.data || {})
            }
            else if (!res?.data?.success) {
                toast.error(res?.data?.message);
            }
            else if (res?.error) {
                toast.error(res?.error);
            }
            setLoading(false);
        };
        fetchDeliveryFee();
    }, []);

    // load checkout products
    useEffect(() => {
        setLoading(true);
        const storedProducts = Cookies.get("checkoutItems");
        if (storedProducts) {
            const items = JSON.parse(storedProducts);
            setCheckoutItems(items);
            const barcodes = items.map(item => item.code);
            const fetchProductsData = async () => {
                const res = await getcheckoutProducts(barcodes);
                const fetchedProducts = res?.data || [];
                if (res?.error) {
                    toast.error(res?.error);
                    setLoading(false);
                    return;
                }
                const validProducts = fetchedProducts.filter(p => barcodes.includes(p?.barcodes[0]?.barcode));
                setProducts(validProducts);
            }
            fetchProductsData();
        }
        setLoading(false);
    }, []);

    const totalPrice = products?.reduce((sum, product) => {
        const cartItem = checkoutItems?.find(item => item.code === product?.barcodes[0]?.barcode);
        const quantity = cartItem?.quantity || 0;

        const discountAmount = product?.discount?.is_active ? product?.discount?.amount || 0 : 0;
        const finalPrice = (product?.selling_price || 0) - discountAmount;

        return sum + quantity * finalPrice;
    }, 0);

    // user info fn
    const handleFormSubmit = (data) => {

        const productsArray = checkoutItems.map(item => ({
            barcode: item.code,
            quantity: item.quantity,
        }));

        if (!data.name || !data.phone || !data.address || !data.city || !data.paymentOption) {
            toast.error("Please fill the form!");
            return;
        }

        // check valid phone number
        const bdPhoneRegex = /^(01[3-9]\d{8})$/;
        if (!bdPhoneRegex.test(data.phone)) {
            toast.error("Please Enter Valid Number!");
            return;
        }

        const orderData = {
            showroom_id: "1",
            customer_mobile: data?.phone,
            customer_name: data?.name,
            customer_address: data?.address,
            products: productsArray,
            discount_type: "0",
            discount_value: "0",
            delivery_area: data?.city,
            delivery_charge: deliveryFee,
            paid_amount: "0",
            payment_method: "Cash",
            customer_note: data?.notes,
        };

        const postOrder = async () => {
            setBtnLoading(true);
            const res = await placeOrder(orderData);
            if (res?.data?.success) {
                setSuccessOrderData(res?.data || {});
                setIsOrderSuccess(true);
                setFormData({
                    name: "",
                    city: "",
                    phone: "",
                    address: "",
                    notes: "",
                    paymentOption: "",
                })
                Cookies.remove("checkoutItems");
                setCheckoutItems([]);
            }
            else if (!res?.data?.success) {
                toast.error(res?.data?.message)
            }
            if (res?.error) {
                toast.error(res?.error)
            }
            setBtnLoading(false)
        };
        postOrder();
        setLoading(false);
    };


    if (isOrderSuccess) {
        return <SuccessOrder successOrderData={successOrderData} />
    }


    return (
        <div className="pt-5 md:pt-10 pb-10 md:pb-24">
            <div className="container">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Checkout
                </h1>

                {
                    loading ?
                        <SectionLoading />
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* User Info Form */}
                            <InfoForm
                                onSubmit={handleFormSubmit}
                                products={products}
                                formData={formData}
                                setFormData={setFormData}
                                btnLoading={btnLoading}
                                deliveryCharges={deliveryChages}
                                setDeliveryFee={setDeliveryFee}
                            />

                            {/* Order Summary */}
                            <div className="bg-white dark:bg-gray-900 shadow-md rounded-sm p-6 border border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                                    Order Summary
                                </h2>
                                {
                                    products?.length == 0 ?
                                        <NoData />
                                        :
                                        <div className="divide-y divide-gray-300 dark:divide-gray-700">
                                            {
                                                products?.map((product, idx) => {
                                                    const item = checkoutItems.find(item => item.code === product?.barcodes[0]?.barcode);
                                                    if (!item) return null;
                                                    return <div key={idx} className="py-3 flex justify-between items-center">
                                                        <div className="flex gap-2">
                                                            <Image src={product?.images?.[0] || dummyImg} className="object-cover" width={70} height={50} alt={product?.name || "product image"} />
                                                            <div>
                                                                <h3 className="text-lg font-bold">{product?.name}</h3>
                                                                <div>
                                                                    {
                                                                        product?.barcodes[0]?.attributes?.color &&
                                                                        <span>
                                                                            Color: <strong>{product?.barcodes[0]?.attributes?.color}</strong> - Size:
                                                                        </span>
                                                                    } - Size:
                                                                    {product?.barcodes[0]?.attributes?.size}
                                                                    <p>
                                                                        ৳{product?.discount?.is_active ? (product?.selling_price - product?.discount?.amount) : product?.selling_price}
                                                                        {" "}x {item?.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="font-bold">৳{product?.discount?.is_active ? (product?.selling_price - product?.discount?.amount) : product?.selling_price * item?.quantity}</p>
                                                    </div>
                                                })
                                            }
                                            <p className="py-3 flex justify-between">
                                                <span className="font-semibold">Delivery Fee</span>
                                                <span className="font-bold">৳{deliveryFee}</span>
                                            </p>
                                            <p className="py-3 flex justify-between text-lg font-semibold">
                                                <span>Total Amount</span>
                                                <span>৳{(totalPrice || 0) + (deliveryFee || 0)}</span>
                                            </p>
                                        </div>
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default CheckoutPage;
