/** Absolute imports */
import React, {useState, useEffect, ChangeEvent} from 'react';

/** Ant design */
import { Input } from 'antd';

/** Styles */
import classes from './styles.module.scss';


type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (newStatus: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {props.isOwner ?
            <>
                {!editMode &&
                    <div className={classes.status}>
                        <span onDoubleClick={activateEditMode} data-testid="statusText" className={classes.changeStatus}>{props.status || "Change status(double click)"}</span>
                    </div>
                }
                {editMode && 
                    <div className={classes.status}>
                        <Input placeholder="your status" onChange={onStatusChange} data-testid="statusInput" autoFocus={true} onBlur={deactivateEditMode} value={status} />
                    </div>
                }
            </>
            :   <div className={classes.status}>
                    <span onDoubleClick={activateEditMode} className={classes.changeStatus}>{props.status}</span>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;