/** Absolute imports */
import React from 'react';

/** Ant design */
import { Input, Select  } from 'antd';

/** Styles */
import classes from './styles.module.scss';

/** Store */
import { FilterType } from '../../../../store/user/types';

const { Option } = Select;

const usersSearchFormValidate = (value: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
    filter: FilterType;
}
type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string
    friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged, filter}) => {

    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        onFilterChanged(filter);
        setSubmitting(false);
    }

    return (
      <div className="site-input-group-wrapper">
        <Input.Group compact className={classes.searchGroup}>
          <Select defaultValue="null" className={classes.selector}>
            <Option value="null">All</Option>
            <Option value="true">Only followed</Option>
            <Option value="false">Only unfollowed</Option>
          </Select>
          <Input.Search allowClear defaultValue="" className={classes.search} />
        </Input.Group>
      </div>
    );
});

export default UsersSearchForm;
