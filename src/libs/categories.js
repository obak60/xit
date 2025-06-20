import { axiosPublic } from "./axiosInstance";


export const getAllCategories = async () => {
    try {
      const res = await axiosPublic.get("/categories");
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getSingleCategory = async (id) => {
    try {
      const res = await axiosPublic.get(`/categories/${id}`);
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};