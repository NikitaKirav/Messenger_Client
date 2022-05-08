/** Absolute imports */
import { AxiosRequestConfig } from "axios";

/** Services */
import { api } from "./api";

export const login = (data: { email: string, password: string }, options?: AxiosRequestConfig) => 
    api.post(`auth/login`, data, options).then((response) => {
        //@ts-ignore
        api.defaults.headers['Authorization'] = `Bearer ${response.data.data.token}`;
        return response.data;   
    });

export const register = (data: {email: string, password: string, userName: string}, options?: AxiosRequestConfig) => 
    api.post(`auth/register`, data, options).then(response => response.data);

export const logout = () => {
    //@ts-ignore
    api.defaults.headers['Authorization'] = `Bearer`;
}