import * as React from 'react';
import {FC} from 'react';
import Avatar from '@material-ui/core/Avatar'
import { FieldProps, useQuery, Loading, Error } from 'react-admin'

interface Props extends FieldProps {
    className?: string;
    size?: string;
}

const AvatarField: FC<Props> = ({record, size = '25', className}) => {
    let imageUrl = undefined;
    if (record) {
        const { data, loading, error } = useQuery({ 
            type: 'getOne',
            resource: 'media_object',
            payload: { id: record }
        });

        if (loading) return <></>;
        if (error) return <Error />;
        if (data) imageUrl = data.contentUrl
}

    return (
        <Avatar
            src={`${imageUrl}?size=${size}x${size}`}
            style={{width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    )
}

export default AvatarField;