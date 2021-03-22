import * as React from 'react';
import { FC, memo } from 'react';

import { FieldProps, useQuery, Error } from 'react-admin'
import ReactAudioPlayer from 'react-audio-player';

interface Props extends FieldProps {
    controls?: boolean,
    autoPlay?: boolean,
    loop?: boolean,
    muted?: boolean,
    volume?: number
}

const AudioPlayerField: FC<Props> = (props) => {
    const source = props.record[props.source];
    let audioUrl = undefined;
    if (source) {
        const { data, loading, error } = useQuery({
            type: 'getOne',
            resource: 'media_object',
            payload: { id: source }
        });

        if (loading) return <></>;
        if (error) return <Error />;
        if (data) audioUrl = data.contentUrl
    }

    return props.record ? (
        <ReactAudioPlayer
            src={audioUrl}
            {...props}
        />
    ) : null;
};

AudioPlayerField.defaultProps = {
    source: 'id',
    addLabel: true,
    label: "Audio file",

    controls: true,
    autoPlay: false,
    loop: false,
    muted: false,
    volume: 1.
}

export default memo<Props>(AudioPlayerField)