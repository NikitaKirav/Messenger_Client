/** Absolute imports */
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

/** Ant design */
import { Button, Upload, Modal, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

/** Store */
import { ApplicationState } from '../../../../../store';
import { makeGetPhoto } from '../../../../../store/profile/selectors';

/** Types */
import { ImageAvatarSelectors, ImageAvatarType } from './types';

/** Components */
import { WriteMessageOrFollow } from '../WriteMessageOrFollow/WriteMessageOrFollow';
import { ReactCropper } from '../ReactCropper/ReactCropper';

/** Images */
import userPhoto from '../../../../../assets/images/user_default.png';

/** Styles */
import classes from '../../styles.module.scss';

/** Services */
import { baseUrl } from '../../../../../services/baseURL';


export const ImageAvatar: React.FC<ImageAvatarType> = React.memo(({profile, isOwner, isAuth, onMainPhotoSelected, sendCorrectedMainPhoto}) => {
    const [visible, setVisible] = useState(false);
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [keyReactCropper, setKeyReactCropper] = useState(0);

    const selectors = createStructuredSelector<
        ApplicationState,
        ImageAvatarSelectors
    >({
        photo: makeGetPhoto()
    });

    const { photo } = useSelector(selectors);
  
    const showModal = () => {
      setKeyReactCropper(old => old + 1);
      setVisible(true);
    };
  
    const handleOk = () => {
        setVisible(false);
        sendCorrectedMainPhoto(photo);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };

    const props = {
        beforeUpload: (file: File) => {
          const isImage = ((file.type === 'image/jpeg') || (file.type === 'image/png'));
          if (!isImage)  {
            message.error(`${file.name} is not a png or jpg file`);
          }
          return isImage || Upload.LIST_IGNORE;
        },
        customRequest: async (options: any) => {
            const { onSuccess } = options;
            onSuccess("Ok");
        },
        onChange: (info: any) => {
            setDefaultFileList(info.fileList);
            if (info.file.status !== 'uploading') {
                onMainPhotoSelected(info);
            }
        },
      };

    return (
        <div>
            <div className={classes.photoBig}><img src={profile.photos.large && baseUrl + profile.photos.large || userPhoto} className={classes.mainPhoto} /></div>
            <div className={classes.photoSmall}><img src={profile.photos.large && baseUrl + profile.photos.small || userPhoto} className={classes.mainPhotoSmall} /></div>
            { isOwner ? 
                <div>
                    <div className={classes.updateButtonBig}>
                        <Button onClick={showModal} data-testid="editPhotoButton" className={classes.updateButton}>
                            Edit photo
                        </Button>
                    </div>
                    <div onClick={showModal} className={classes.updateButtonSmall}>Edit photo</div>
                    <Modal  
                        title="Image editor"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <ReactCropper key={keyReactCropper} /> 
                        <Upload {...props} > 
                            {defaultFileList.length >= 1 ? null :
                            <Button style={{marginTop: '15px'}}>
                                <UploadOutlined /> Upload new Image
                            </Button> }
                        </Upload>
                    </Modal>
                </div>
                :
                isAuth && <div className={classes.buttonBlockVertical}><WriteMessageOrFollow userId={profile.userId} /></div>
                }
        </div>
    );
});