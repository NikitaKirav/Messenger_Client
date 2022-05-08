import { UserType } from "../../../../../store/user/types";

export interface WriteMessageOrFollowType {
    userId: string;
}

export interface WriteMessageOrFollowSelectors {
    followed: boolean;
    followingInProgress: string[];
    users: UserType[];
}