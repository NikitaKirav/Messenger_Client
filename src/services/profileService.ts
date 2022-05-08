/** Absolute imports */
import { AxiosRequestConfig } from "axios";

/** Store */
import { ProfileType } from "../store/profile/types";

/** Utils */
import { generateUUID } from "../utils/generateUUID";

/** Services */
import { api } from "./api";

export const getProfile = (userId: string, options?: AxiosRequestConfig) =>
    api.get(`profile/`+userId, options).then(response => response.data);

export const getStatus = (userId: string, options?: AxiosRequestConfig) =>
    api.get(`profile/status/` + userId, options).then(response => response.data);

export const updateStatus = (status: string, options?: AxiosRequestConfig) =>
    api.put(`profile/status`, { status }, options).then(response => response.data);

export const savePhoto = async (photoFile: File) => {
    let formData = new FormData();
    formData.append("file", photoFile, photoFile.name ? photoFile.name : generateUUID() + '.png');
    const response = await api.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const saveProfile = (profile: ProfileType, options?: AxiosRequestConfig) => 
    api.put(`profile`, profile, options).then(response => response.data);

export const getPosts = (userId: string, options?: AxiosRequestConfig) => 
    api.get(`post/${userId}`, options).then(response => response.data);

export const addPost = (text: string, profileId: string, options?: AxiosRequestConfig) =>
    api.post(`post`, {text, profileId}, options).then(response => response.data);

export const addLike = (postId: string, like: boolean, options?: AxiosRequestConfig) =>
    api.put(`post/like`, {postId, like}, options).then(response => response.data);

export const deletePost = (postId: string, options?: AxiosRequestConfig) =>
    api.delete(`post/${postId}`, options).then(response => response.data);
