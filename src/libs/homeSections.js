import { axiosPublic } from "./axiosInstance";


export const getStaticSections = async () => {
    try {
      const res = await axiosPublic.get("/home-on-section");
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getDynamicSections = async () => {
    try {
      const res = await axiosPublic.get("/home-dynamic-section");
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};