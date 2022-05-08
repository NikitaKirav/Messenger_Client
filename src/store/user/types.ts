import { PhotosType } from "../types";

export interface UserState {
    users: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<string>; // array of users ids
    filter: FilterType;
    error: string | undefined;
}

export interface FilterType {
    term: string;
    friend: null | boolean | undefined;
}

export type UserType = {
    id: string
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type GetItemsType = {
    data: {    
        items: Array<UserType>
        totalCount: number
        error: string | null
    }
}