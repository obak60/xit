import { axiosPublic } from "./axiosInstance";


export const getDynamicPage = async (slug) => {
  try {
    const res = await axiosPublic.get(`/footer-menus/${slug}`);
    return { data: res.data?.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
