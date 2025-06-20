import { axiosPublic } from "./axiosInstance";


export const getHeaderData = async () => {
    try {
      const res = await axiosPublic.get("/topbar-header");
      return { data: res.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};