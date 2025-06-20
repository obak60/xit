import { axiosPublic } from "./axiosInstance";


export const getAllProducts = async (filters = {}) => {
  try {
    const res = await axiosPublic.get('/products', {
      params: filters,
    });
    return { data: res.data?.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || 'Something went wrong',
    };
  }
};

export const getSingleProduct = async (id) => {
    try {
      const res = await axiosPublic.get(`/product/${id}`);
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getRelatedProducts = async (categoryId) => {
    try {
      const res = await axiosPublic.get(`/related-products/${categoryId}`);
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};

export const getcheckoutProducts = async (codes) => {
    try {
      const res = await axiosPublic.get(`/checkout-products?barcode=${codes}`);
      return { data: res.data?.data, error: null };
    } catch (error) {
      return { data: null, error: error?.response?.data?.message || 'Something went wrong' };
    }
};