import * as React from 'react';
import { FC } from 'react';

import { FieldProps, ImageField } from 'react-admin'
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayerField from '../AudioPlayerField';
interface Props extends FieldProps {
    
}

const FilePreviewField: FC<Props> = ({record, ...rest}) => 
    record &&
        (!record.contentUrl || !record.type)? <span>fileUrl or type are empty</span>:
        (record.type == "image") ? <ImageField record={record} source="contentUrl" {...rest} />:
        (record.type == "audio") ? <AudioPlayerField record={record} source="contentUrl" {...rest} /> :
        (record.type == "unknown")? <span>File couldn't be previewed</span>:
        <span>Not catched: {record.type}</span>;

;

FilePreviewField.defaultProps = {
    source: 'id',
    addLabel: true,
    label: "Preview",
}

export default FilePreviewField