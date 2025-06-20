import { axiosPublic } from "./axiosInstance";


export const getFooterMenus = async () => {
    try {
      const res = await axiosPublic.get("/footer-menus");
      return { data: res.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getFooterSettings = async () => {
    try {
      const res = await axiosPublic.get("/footer-settings");
      return { data: res.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};