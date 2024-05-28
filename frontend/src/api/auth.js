import axios from 'axios'

export const register = async (payload) => await axios.post(import.meta.env.VITE_API_ENDPOINT + '/auth/register', payload);
export const login = async (payload) => await axios.post(import.meta.env.VITE_API_ENDPOINT + '/auth/login', payload);