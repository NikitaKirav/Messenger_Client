/** Absolute imports */
import { AxiosRequestConfig } from "axios";

/** Services */
import { api } from "./api";

export const follow = (userId: string, options?: AxiosRequestConfig) => 
    api.post(`users/follow/${userId}`, options).then(response => response.data);

export const unfollow = (userId: string, options?: AxiosRequestConfig) => 
    api.delete(`users/follow/${userId}`, options).then(response => response.data);

export const getUsers = (
        currentPage = 1, 
        pageSize = 10, 
        term: string = '', 
        friend: null | boolean = null, 
        options?: AxiosRequestConfig) =>    
    api.get(`users?page=${currentPage}&count=${pageSize}&term=${term}` + 
        ((friend === null) ? `` : `&friend=${friend}`), options).then(response => response.data);

export const getFollowed = (userId: string, options?: AxiosRequestConfig) => 
    api.get(`users/${userId}`, options).then(response => response.data);
  