import reducer, { INITIAL_STATE as initialState } from './reducer'
import * as t from './actionTypes'
import { PostType, ProfileType } from './types';

const userProfile: ProfileType = {
    id: '1a',
    userId: 'user1',
    aboutMe: 'about me in details',
    lookingForAJob: true,
    lookingForAJobDescription: 'programmer',
    fullName: 'Bob Smith',
    contacts: {
        github: 'https://github.com/unknown',
        facebook: 'https://facebook.com/unknown',
    },
    photos: {
        small: 'https://example.com/small.jpg',
        large: 'https://example.com/large.jpg'
    }
}

const posts: Array<PostType> = [
{
    id: '1p',
    userId: 'user1',
    avatar: 'https://avatars.com/image1.jpg',
    createDate: '22-05-2022',
    text: 'First post!',
    userName: 'Bob Smith',
    likes: 3,
    dislikes: 1,
    userLike: 'licked'
},
{
    id: '2p',
    userId: 'user2',
    avatar: 'https://avatars.com/image2.jpg',
    createDate: '23-05-2022',
    text: 'Second post!',
    userName: 'Adam Sandler',
    likes: 15,
    dislikes: 5,
    userLike: undefined
},
{
    id: '3p',
    userId: 'user1',
    avatar: 'https://avatars.com/image1.jpg',
    createDate: '24-05-2022',
    text: 'Third post!',
    userName: 'Bob Smith',
    likes: 6,
    dislikes: 2,
    userLike: 'licked'
}, 
];

describe('Profile Reducer', () => {

    /** SET_STATUS */
    it('SET_STATUS - saved a new status in a user profile.', () => {
        const action = {
            type: t.SET_STATUS,
            payload: {
                status: 'New status'
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            status: 'New status'
        })
    });
    
    /** SET_ERROR */
    it('SET_ERROR - saved an error message.', () => {
        const action = {
            type: t.SET_ERROR,
            payload: {
                error: 'Unknown error'
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            error: 'Unknown error'
        })
    });

    /** SET_USER_PROFILE */
    it("SET_USER_PROFILE - Saved information about user in a user profile", () => {
        const action = {
            type: t.SET_USER_PROFILE,
            payload: {
                profile: userProfile
            }
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profile: userProfile
        });
    });

    /** SAVE_PHOTO_SUCCESS */
    it("SAVE_PHOTO_SUCCESS - Saved a new photo in current user profile.", () => {
        const initialStateWithProfile = {
            ...initialState,
            profile: userProfile
        };

        const action = {
            type: t.SAVE_PHOTO_SUCCESS,
            payload: {
                photos: {
                    small: 'https://example.com/small2.jpg',
                    large: 'https://example.com/large2.jpg'
                }
            }
        };

        expect(reducer(initialStateWithProfile, action)).toEqual({
            ...initialStateWithProfile,
            profile: { ...userProfile, photos: {
                small: 'https://example.com/small2.jpg',
                large: 'https://example.com/large2.jpg'
            }}
        });

        // Not equal previous value
        expect(reducer(initialStateWithProfile, action)).not.toEqual({
            ...initialStateWithProfile,
            profile: userProfile
        });
    });

    /** SET_POSTS */
    it('SET_POSTS - Saved a list posts to user profile', () => {
        const action = {
            type: t.SET_POSTS,
            payload: {
                posts: posts
            }
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            posts: posts
        })
    });

    /** ADD_POST */
    it('ADD_POST - added new post to the current post list', () => {
        const initialStateWithPosts = {
            ...initialState,
            posts: posts
        };

        const newPost = {
            id: '4p',
            userId: 'user3',
            avatar: 'https://avatars.com/image3.jpg',
            createDate: '26-05-2022',
            text: 'New post!',
            userName: 'Katy',
            likes: 0,
            dislikes: 4,
            userLike: undefined
        };

        const action = {
            type: t.ADD_POST,
            payload: {
                post: newPost
            }
        };

        expect(reducer(initialStateWithPosts, action)).toEqual({
            ...initialStateWithPosts,
            posts: [...posts, newPost]
        })
    });

    /** ADD_PHOTO */
    it('ADD_PHOTO - added a new photo.', () => {
        const file = new File(["dummy content"], "example.png", {
            type: "image/png",
        });

        const action = {
            type: t.ADD_PHOTO,
            payload: {
                photo: file
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            photo: file
        })
    });

    /** CHANGE_FOLLOWED */
    it('CHANGE_FOLLOWED - changed a field: followed = true (Default followed = false)', () => {
        const action = {
            type: t.CHANGE_FOLLOWED,
            payload: {
                followed: true
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            followed: true
        })
    });

    it('CHANGE_FOLLOWED - changed a field: followed = false (Changed earlier a followed = true)', () => {
        const initialStateWithFollowed = {
            ...initialState,
            followed: true
        };

        const action = {
            type: t.CHANGE_FOLLOWED,
            payload: {
                followed: false
            }
        }

        expect(reducer(initialStateWithFollowed, action)).toEqual({
            ...initialStateWithFollowed,
            followed: false
        })
    });

    /** SET_PROFILE_WAS_SAVED */
    it('SET_PROFILE_WAS_SAVED - profile was saved success', () => {
        const action = {
            type: t.SET_PROFILE_WAS_SAVED,
            payload: {
                profileWasSaved: true
            }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileWasSaved: true
        })
    }); 
})