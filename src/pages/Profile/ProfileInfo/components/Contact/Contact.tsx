/** Absolute imports */
import React from 'react';

/** Styles */
import classes from './styles.module.scss';

interface ContactPropsType {
    contactTitle: string;
    contactValue: string;
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <>
        {contactValue && 
            <table className={classes.tableUserInfo}>
                <tbody>
                <tr>
                    <td width="180"><span className={classes.title}>{contactTitle}:</span></td>
                    <td><a href={contactValue}><span className={classes.infoAboutUser}>{contactValue}</span></a></td>
                </tr> 
                </tbody>           
            </table>}
        </>     
    );
}