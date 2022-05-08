export interface Identity<T> {
    id: T;
    name: string;
}

export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type ErrorsType = {
    value: string
    msg: string
    param: string
    location: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type APIResponseType<D = {}, RC = ResultCode> = {
    data: D
    message: string
    errors: Array<ErrorsType>
    resultCode: RC
}

export const storageName = 'userData_Messanger';