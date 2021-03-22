import * as React from 'react';
import {FC, memo} from 'react';

import { FieldProps, useQuery, Error } from 'react-admin'
import Avatar from '@material-ui/core/Avatar'

interface Props extends FieldProps{
    size?: string
}

const ProfilePictureField: FC<Props> = (props) => {
    const source = props.record[props.source];
    const size = props.size
    let imageUrl = undefined;
    if (source) {
        const { data, loading, error } = useQuery({ 
            type: 'getOne',
            resource: 'media_object',
            payload: { id: source }
        });

        if (loading) return <></>;
        if (error) return <Error />;
        if (data) imageUrl = data.contentUrl
    }

    return props.record ? (
        <Avatar
            src={`${imageUrl}?size=${size}x${size}`}
            style={{width: parseInt(size, 10), height: parseInt(size, 10) }}
        />
    ) : null;
};

ProfilePictureField.defaultProps = {
    source: 'id',
    addLabel: true,
    label: "Full name"
}

export default memo<Props>(ProfilePictureField)