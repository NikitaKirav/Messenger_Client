import { PhotosType } from "../types";

export interface ProfileState {
    posts: Array<PostType>;
    profile: ProfileType | undefined;
    status: string;
    photo: HTMLImageElement | undefined;
    followed: boolean; 
    error: string | undefined;
    profileWasSaved: boolean;
}

export interface ProfileType {
    id: string;
    userId: string;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType;
    photos: PhotosType;
}

type ContactsType = {
    [key: string]: string
}

export interface PostType {
    id: string;
    userId: string;
    avatar: string;
    createDate: string;
    text: string;
    userName: string;
    likes: number;
    dislikes: number;
    userLike: string | undefined;
}

export interface ContactsListType {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainlink: string;
}

export interface SavePhotoResponseDataType {
    photos: PhotosType;
}

export interface StatusType {
    status: string;
}

export interface Followed {
    followed: boolean;
}

export interface PostRequest {
    posts: PostType[];
}