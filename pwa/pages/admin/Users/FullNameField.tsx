import * as React from 'react';
import {FC, memo} from 'react';
import { makeStyles } from '@material-ui/core/styles'

import { FieldProps } from 'react-admin';
import apiGetter from '../apiGetter'
import AvatarField from './AvatarField'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5)
    }
}))

interface Props extends FieldProps{
    size?: string
}

const FullNameField: FC<Props> = (props) => {
    const classes = useStyles();
    console.log(props.record.profilepic)
    return props.record ? (
        <div className={classes.root}>
            <AvatarField
                className={classes.avatar}
                record={props.record.profilepic}
                size={props.size}
            />
            {props.record.firstname} {props.record.lastname}
        </div>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'id',
    addLabel: true,
    label: "Full name"
}

export default memo<Props>(FullNameField)