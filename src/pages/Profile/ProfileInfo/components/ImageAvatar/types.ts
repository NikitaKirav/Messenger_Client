import { ProfileType } from "../../../../../store/profile/types";

export interface ImageAvatarType {
    profile: ProfileType;
    isOwner: boolean;
    isAuth: boolean;
    onMainPhotoSelected: (e: any) => void;
    sendCorrectedMainPhoto: (e: any) => void;
}

export interface ImageAvatarSelectors {
    photo: HTMLImageElement | undefined;
}