/** Absolute imports */
import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import classNames from 'classnames';

/** Ant design */
import { Button, Divider } from 'antd';

/** Components */
import { createField, Textarea, Input } from '../../../../../components/FormsControls/FormsControls';

/** Styles */
import classes from '../../styles.module.scss';

/** Types */
import { ProfileType } from '../../../../../store/profile/types';



type OwnPropsType = {
    initialValues: ProfileType,
    onCancel: () => void
}

type ProfileTypeKeys = Extract<keyof ProfileType, string>;

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType> = ({handleSubmit, initialValues, error, onCancel}) => {

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <Divider plain>
                <Button type="primary" data-testid="submit" onClick={handleSubmit}>
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Divider>
        </div>
        {error && <div className="formSummaryError">
                    {error}
                  </div>}
        <table className={classNames(classes.tableUserInfo, classes.textRight)}>
            <tbody>
            <tr>
                <td className={classes.columnName} >Full name:</td>
                <td>{createField<ProfileTypeKeys>("Full name", "fullName", [], Input, {"data-testid": "fullName"})}</td>
            </tr>
            <tr>
                <td>Looking for a job:</td>
                <td><div className={classes.checkbox}>{createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox", "data-testid": "lookingForAJob"})}</div></td>
            </tr>
            <tr>
                <td>My professional skills:</td>
                <td>{createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea, {"data-testid": "lookingForAJobDescription"})}</td>
            </tr>
            <tr>
                <td>About me:</td>
                <td>{createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea, {"data-testid": "aboutMe"})}</td>
            </tr>
            </tbody>
        </table>

        <div>
            <Divider plain>Contacts</Divider>
            <table className={classNames(classes.tableUserInfo, classes.textRight)}>
                <tbody>
                {Object.keys(initialValues.contacts).map(key => {
                    return (
                    <tr key={key} className={classes.contact}>
                        <td className={classes.columnName}>{key}:</td> 
                        <td>{createField(key, "contacts." + key, [], Input, {"data-testid": key})}</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    </form>
    );
}

export default reduxForm<ProfileType, OwnPropsType>({form: "edit-profile"})(ProfileDataForm);