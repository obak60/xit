import { axiosPublic } from "./axiosInstance";


export const getDeliveryCharges = async () => {
    try {
      const res = await axiosPublic.get("/delivery-charges");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const placeOrder = async (payload) => {
    try {
      const res = await axiosPublic.post(`/orders`, payload);
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};