"use client";

import { useState } from "react";

const InfoForm = ({ onSubmit, products, formData, setFormData, btnLoading, deliveryCharges, setDeliveryFee }) => {

    const [city, setCity] = useState("");

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Shipping Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-gray-600 dark:text-gray-300 font-medium">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="input w-full"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-gray-600 dark:text-gray-300 font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                        className="input w-full"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-600 dark:text-gray-300 font-medium">
                        Shipping Address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter your full address"
                        className="input w-full"
                    ></textarea>
                </div>

                {/* City */}
                <div>
                    <label className="block text-gray-600 dark:text-gray-300 font-medium">
                        City
                    </label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={(e) => {
                            handleChange(e);
                            const selectedCity = e.target.value;
                            const charge = deliveryCharges[selectedCity];
                            setDeliveryFee(charge);
                            setCity(e.target.value)
                        }}
                        required
                        rows="3"
                        className="input w-full"
                    >
                        <option value="" disabled>Choose one</option>
                        <option value="insideDhaka">Inside Dhaka</option>
                        <option value="outsideDhaka">Outside Dhaka</option>
                    </select>
                </div>

                {
                    city == "outsideDhaka" &&
                    <span className=" block mt-3 font-semibold text-green-600">
                        (50% Advance Payment Needed For Outside Dhaka.)
                    </span>
                }

                {/* Additional Notes */}
                <div>
                    <label className="block text-gray-600 dark:text-gray-300 font-medium">
                        Notes (Optional)
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Any special instructions?"
                        className="input w-full"
                    ></textarea>
                </div>

                {/* payment */}
                <div>
                    <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
                        Payment Options
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="flex items-center gap-2 p-3 border rounded cursor-pointer peer-disabled:cursor-not-allowed">
                            <input
                                type="radio"
                                name="paymentOption"
                                value="Cash on Delivery"
                                checked={formData.paymentOption === "Cash on Delivery"}
                                onChange={handleChange}
                                className="peer"
                                required
                                disabled={city == "outsideDhaka"}
                            />
                            <span className="text-gray-700 dark:text-gray-200 peer-disabled:text-gray-400">
                                Cash on Delivery
                            </span>
                        </label>

                        <label className="flex items-center gap-2 p-3 border rounded cursor-pointer peer-disabled:cursor-not-allowed">
                            <input
                                type="radio"
                                name="paymentOption"
                                value="bKash"
                                checked={formData.paymentOption === "bKash"}
                                onChange={handleChange}
                                disabled={city != "outsideDhaka"}
                                className="peer"
                                required
                            />
                            <span className="text-gray-700 dark:text-gray-200 peer-disabled:text-gray-400">
                                bKash
                            </span>
                        </label>

                    </div>

                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="!w-full button !text-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={products?.length == 0}
                >
                    {btnLoading ? "Loading..." : "Place Order"}
                </button>
            </form>
        </div>
    );
};

export default InfoForm;
