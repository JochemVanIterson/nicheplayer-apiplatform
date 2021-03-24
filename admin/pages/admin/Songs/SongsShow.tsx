import * as React from 'react';

import {
    Show,
    SimpleShowLayout,
    ReferenceField,
    FunctionField,
    FileField,
    TextField,
    NumberField,
    BooleanField
} from "react-admin";
import AudioPlayerField from '../AudioPlayerField';
const SongsShow = (props) => (
<Show {...props}>
    <SimpleShowLayout >
        <TextField source="name" />
        <ReferenceField source="album" reference="albums" link="show">
            <FunctionField render={record => `${record.artist} - ${record.name}`}/>
        </ReferenceField>
        <NumberField source="trackNumber" />
        <ReferenceField source="file" reference="media_objects" link="show">
            <FileField source="contentUrl" title="fileName" />
        </ReferenceField>
        <AudioPlayerField source="file"/>
        <BooleanField source="explorable" />
        <TextField source="duration" />
    </SimpleShowLayout>
</Show>
);

export default SongsShow;