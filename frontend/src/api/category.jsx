import axios from 'axios'

export const getAllCategory = async () => await axios.get(import.meta.env.VITE_API_ENDPOINT + '/category/', {withCredentials: true});
export const getCategory = async (id) => await axios.get(import.meta.env.VITE_API_ENDPOINT + `/category/${id}`, {withCredentials: true});
export const createCategory = async (payload) => await axios.post(import.meta.env.VITE_API_ENDPOINT + '/category/', payload, {withCredentials: true});
export const updateCategory = async (id, payload) => await axios.put(import.meta.env.VITE_API_ENDPOINT + `/category/?id=${id}`, payload, {withCredentials: true});
export const deleteCategory = async (id) => await axios.delete(import.meta.env.VITE_API_ENDPOINT + `/category/?id=${id}`, {withCredentials: true});