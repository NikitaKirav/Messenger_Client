import * as t from './actionTypes'
import * as a from './actions';
import { PostType } from './types';


describe('Profile Actions', () => {

    it('setProfileWasSaved(): should attach profileWasSaved.', () => {
        const expectedAction = {
            type: t.SET_PROFILE_WAS_SAVED,
            payload: {
                profileWasSaved: true
            }
        }

        expect(a.setProfileWasSaved(true)).toEqual(expectedAction)
    });

    it('getFollowed(): should attach userId.', () => {
        const expectedAction = {
            type: t.GET_FOLLOWED,
            payload: {
                userId: 'user-id-1'
            }
        }

        expect(a.getFollowed('user-id-1')).toEqual(expectedAction)
    });

    it('addLike(): should attach postId, like, userId.', () => {
        const expectedAction = {
            type: t.ADD_LIKE,
            payload: {
                postId: 'post-id-1', 
                like: true, 
                userId: 'user-id-1'
            }
        }

        expect(a.addLike('post-id-1', true, 'user-id-1')).toEqual(expectedAction)
    });

    it('addPostRequest(): should attach text, profileId.', () => {
        const expectedAction = {
            type: t.ADD_POST_REQUEST,
            payload: {
                text: 'hello world',
                profileId: 'profile-id-1'
            }
        }

        expect(a.addPostRequest('hello world', 'profile-id-1')).toEqual(expectedAction)
    });

    it('deleteActivePost(): should attach postId, userId.', () => {
        const expectedAction = {
            type: t.DELETE_ACTIVE_POST,
            payload: {
                postId: 'post-id-1',
                userId: 'user-id-1'
            }
        }

        expect(a.deleteActivePost('post-id-1', 'user-id-1')).toEqual(expectedAction)
    });

    it('getPosts(): should attach userId.', () => {
        const expectedAction = {
            type: t.GET_POSTS,
            payload: {
                userId: 'user-id-1'
            }
        }

        expect(a.getPosts('user-id-1')).toEqual(expectedAction)
    });

    it('saveProfile(): should attach profile data.', () => {
        const profile = {
            id: 'profile-id-1',
            userId: 'user-id-1',
            aboutMe: 'info about me',
            lookingForAJob: true,
            lookingForAJobDescription: "I'm programmer",
            fullName: 'Nikita Kirav',
            contacts: {
                github: 'https://github.com/NikitaKirav'
            },
            photos: {
                small: '/uploads/photo-small-1.jpg',
                large: '/uploads/photo-large-1.jpg'
            }
        };
        const expectedAction = {
            type: t.SAVE_PROFILE,
            payload: {
                profile
            }
        }

        expect(a.saveProfile(profile)).toEqual(expectedAction)
    });

    it('savePhoto(): should attach file.', () => {
        const file = new File(["dummy content"], "example.png", {
            type: "image/png",
        });

        const expectedAction = {
            type: t.SAVE_PHOTO,
            payload: {
                file
            }
        }

        expect(a.savePhoto(file)).toEqual(expectedAction)
    });

    it('updateStatus(): should attach status.', () => {
        const expectedAction = {
            type: t.UPDATE_STATUS,
            payload: {
                status: 'my status'
            }
        }

        expect(a.updateStatus('my status')).toEqual(expectedAction)
    });

    it('getStatus(): should attach userId.', () => {
        const expectedAction = {
            type: t.GET_STATUS,
            payload: {
                userId: 'user-id-1'
            }
        }

        expect(a.getStatus('user-id-1')).toEqual(expectedAction)
    });

    it('getUserProfile(): should attach userId.', () => {
        const expectedAction = {
            type: t.GET_USER_PROFILE,
            payload: {
                userId: 'user-id-1'
            }
        }

        expect(a.getUserProfile('user-id-1')).toEqual(expectedAction)
    });

    it('setStatus(): should attach status.', () => {
        const expectedAction = {
            type: t.SET_STATUS,
            payload: {
                status: 'my status'
            }
        }

        expect(a.setStatus('my status')).toEqual(expectedAction)
    });

    it('setUserProfile(): should attach profile data.', () => {
        const profile = {
            id: 'profile-id-1',
            userId: 'user-id-1',
            aboutMe: 'info about me',
            lookingForAJob: true,
            lookingForAJobDescription: "I'm programmer",
            fullName: 'Nikita Kirav',
            contacts: {
                github: 'https://github.com/NikitaKirav'
            },
            photos: {
                small: '/uploads/photo-small-1.jpg',
                large: '/uploads/photo-large-1.jpg'
            }
        };

        const expectedAction = {
            type: t.SET_USER_PROFILE,
            payload: {
                profile
            }
        }

        expect(a.setUserProfile(profile)).toEqual(expectedAction)
    });

    it('savePhotoSuccess(): should attach photos.', () => {
        const photos = {
            small: '/uploads/photo-small-1.jpg',
            large: '/uploads/photo-large-1.jpg'
        }
        const expectedAction = {
            type: t.SAVE_PHOTO_SUCCESS,
            payload: {
                photos
            }
        }

        expect(a.savePhotoSuccess(photos)).toEqual(expectedAction)
    });

    it('setPosts(): should attach posts.', () => {
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
            }
            ];
        const expectedAction = {
            type: t.SET_POSTS,
            payload: {
                posts
            }
        }

        expect(a.setPosts(posts)).toEqual(expectedAction)
    });

    it('addPost(): should attach post.', () => {
        const post = {
            id: '1p',
            userId: 'user1',
            avatar: 'https://avatars.com/image1.jpg',
            createDate: '22-05-2022',
            text: 'First post!',
            userName: 'Bob Smith',
            likes: 3,
            dislikes: 1,
            userLike: 'licked'
        };
        const expectedAction = {
            type: t.ADD_POST,
            payload: {
                post
            }
        }

        expect(a.addPost(post)).toEqual(expectedAction)
    });

    it('addPhoto(): should attach file.', () => {
        var photo = new Image();
        photo.src = 'image1.png';
        photo.alt = 'alt';

        const expectedAction = {
            type: t.ADD_PHOTO,
            payload: {
                photo
            }
        }

        expect(a.addPhoto(photo)).toEqual(expectedAction)
    });

    it('changeFollowed(): should attach followed.', () => {
        const expectedAction = {
            type: t.CHANGE_FOLLOWED,
            payload: {
                followed: true
            }
        }

        expect(a.changeFollowed(true)).toEqual(expectedAction)
    });
    
    it('setError(): should attach error message.', () => {
        const expectedAction = {
            type: t.SET_ERROR,
            payload: {
                error: 'some error!'
            }
        };

        expect(a.setError('some error!')).toEqual(expectedAction);
    });
});