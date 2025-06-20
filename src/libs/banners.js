import { axiosPublic } from "./axiosInstance";


export const getSliders = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/slider");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getTopBanners = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/top-banners");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getDealsBanner = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/middle-banner");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getOfferBanners = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/bottom-banners");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getFeaturedBanner1 = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/top-banner-second1");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getFeaturedBanner2 = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/top-banner-second2");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getFeaturedBottomBanners = async () => {
    try {
      const res = await axiosPublic.get("/hero-sections/top-banner-second3");
      return { data: res?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};
