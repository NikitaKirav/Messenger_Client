/** Absolute imports */
import { useEffect, useState } from "react";

/** Ant design */
import { Divider } from "antd";
import { EditOutlined } from '@ant-design/icons';

/** Store */
import { ProfileType } from "../../../../../store/profile/types";

/** Components */
import { Contact } from "../Contact/Contact";

/** Styles */
import classes from '../../styles.module.scss';


type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {

    const [contactsLength, setContactsLength] = useState(0);

    useEffect(() => {
        setContactsLength(0);
        Object.keys(profile.contacts).map(key => {
            profile.contacts[key] && setContactsLength(contactsLength + 1);
        });
    }, [profile]);

    return (
        <div>
        {isOwner && <div>
            <Divider plain>
            About me<EditOutlined onClick={goToEditMode} />
            </Divider>
            </div>}
        <div className={classes.aboutMe}>{profile.aboutMe && profile.aboutMe}</div>
        <Divider />  
        <table className={classes.tableUserInfo}>
            <tbody>
            <tr>
                <td width="180"><span className={classes.title}>Looking for a job:</span></td>
                <td>{profile.lookingForAJob 
                        ? <span className={classes.infoAboutUser}>"yes"</span> 
                        : <span className={classes.infoAboutUser}>"no"</span>}</td>
            </tr>
            { profile.lookingForAJob &&
            <tr>
                <td><span className={classes.title}>My professional skills:</span></td>
                <td><span className={classes.infoAboutUser}>{profile.lookingForAJobDescription}</span></td>
            </tr>
            }
            </tbody>
        </table>

        <div>
            {contactsLength > 0 && <>
                <span className={classes.title}>Contacts:</span>                 
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
                </>
            }
        </div>
    </div>
    );
}