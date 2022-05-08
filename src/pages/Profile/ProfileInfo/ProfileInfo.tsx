/** Absolute imports */
import { base64StringToBlob } from 'blob-util';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Store */
import { ApplicationState } from '../../../store';
import { savePhoto, saveProfile, updateStatus as updateStatusRequest } from '../../../store/profile/actions';
import { makeGetProfileWasSaved } from '../../../store/profile/selectors';
import { ProfileType } from '../../../store/profile/types';

/** Components */
import { ImageAvatar } from './components/ImageAvatar/ImageAvatar';
import { ProfileData } from './components/ProfileData/ProfileData';
import ProfileDataForm from './components/ProfileDataForm/ProfileDataForm';
import ProfileStatusWithHooks from './components/ProfileStatusWithHooks/ProfileStatusWithHooks';
import { WriteMessageOrFollow } from './components/WriteMessageOrFollow/WriteMessageOrFollow';

/** Style */
import classes from './styles.module.scss';

interface ProfileInfoSelectors {
    profileWasSaved: boolean;
}

type PropsType = {
    profile: ProfileType;
    status: string;
    isOwner: boolean;
    isAuth: boolean;
}

export const ProfileInfo: React.FC<PropsType> = ({ profile, status, isOwner, isAuth }) => {

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    const selectors = createStructuredSelector<
        ApplicationState,
        ProfileInfoSelectors
    >({
        profileWasSaved: makeGetProfileWasSaved()
    });

    const { profileWasSaved } = useSelector(selectors);

    useEffect(() => {
        setEditMode(false);
    }, [profileWasSaved]);

    const onMainPhotoSelected = useCallback((e) => {
        if(e.fileList && e.fileList.length) {
            dispatch(savePhoto(e.fileList[0].originFileObj));
        }
    },[]);

    const sendCorrectedMainPhoto = useCallback((e) => {
        var fileData = e,
        parts, type, base64Data;

        parts = fileData.split(',');
        type = parts[0];
        base64Data = parts[1];

        type = type.split(';')[0].split(':')[1];

        let blobImage = base64StringToBlob(base64Data, type);
        dispatch(savePhoto(blobImage as File));
    },[]);

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData));
    }

    const onCancel = () => {
        setEditMode(false);
    }

    const updateStatus = (status: string) => {
        dispatch(updateStatusRequest(status));
    }

    return (
        <div className={classes.userInfo}>
            <div style={{display: 'flex'}}>
                <ImageAvatar profile={profile} isOwner={isOwner} isAuth={isAuth} onMainPhotoSelected={onMainPhotoSelected} sendCorrectedMainPhoto={sendCorrectedMainPhoto} />
                <div className={classes.nameAndStatusSmall}>
                    <div className={classes.userName}>{profile.fullName}</div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
                </div>
            </div>
            <div className={classes.nameAndStatus}>
                <div className={classes.nameAndStatusBig}>
                    <div className={classes.userName}>{profile.fullName}</div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
                </div>
                {!isOwner && isAuth && 
                    <div className={classes.buttonBlockHorizontal}>
                        <WriteMessageOrFollow userId={profile.userId} />
                    </div>
                }
                { editMode ? <ProfileDataForm onSubmit={onSubmit} onCancel={onCancel} initialValues={profile} /> 
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}} /> }   
            </div>
        </div>
    );
}