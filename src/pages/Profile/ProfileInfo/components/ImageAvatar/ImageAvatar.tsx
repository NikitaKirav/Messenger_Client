/** Absolute imports */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

/** Ant design */
import { Button, Upload, Modal, message } from 'antd';
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
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const selectors = createStructuredSelector<
        ApplicationState,
        ImageAvatarSelectors
    >({
        photo: makeGetPhoto()
    });

    const { photo } = useSelector(selectors);
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
      setConfirmLoading(true);
        setVisible(false);
        setConfirmLoading(false);
        sendCorrectedMainPhoto(photo);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };

    const props = {
        beforeUpload: (file: File) => {
          if ((file.type !== 'image/jpeg') && (file.type !== 'image/png'))  {
            message.error(`${file.name} is not a png or jpg file`);
          }
          return file.type === 'image/jpeg' || file.type === 'image/png' ? true : false;
        },
        onChange: (info: any) => {
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
                        <Button onClick={showModal} className={classes.updateButton}>
                            Edit photo
                        </Button>
                    </div>
                    <div onClick={showModal} className={classes.updateButtonSmall}>Edit photo</div>
                    <Modal  
                        title="Image editor"
                        visible={visible}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}>
                        <ReactCropper rerender={confirmLoading} /> 
                        <Upload {...props}  > 
                            <Button>
                            <UploadOutlined /> Upload new Image
                        </Button>
                    </Upload> 
                    </Modal>
                </div>
                :
                isAuth && <div className={classes.buttonBlockVertical}><WriteMessageOrFollow userId={profile.userId} /></div>
                }
        </div>
    );
});