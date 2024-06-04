import axios from 'axios'

export const getAllProduct = async () => await axios.get(import.meta.env.VITE_API_ENDPOINT + '/product', {withCredentials: true});
export const getProduct = async (id) => await axios.get(import.meta.env.VITE_API_ENDPOINT + `/product/${id}`, {withCredentials: true});
export const createProduct = async (payload) => await axios.post(import.meta.env.VITE_API_ENDPOINT + '/product', payload, {withCredentials: true});
export const updateProduct = async (id, payload) => await axios.put(import.meta.env.VITE_API_ENDPOINT + `/product/?id=${id}`, payload, {withCredentials: true});
export const deleteProduct = async (id) => await axios.delete(import.meta.env.VITE_API_ENDPOINT + `/product/?id=${id}`, {withCredentials: true});