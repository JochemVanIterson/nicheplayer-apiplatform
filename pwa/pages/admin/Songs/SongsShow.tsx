import * as React from 'react';

import { Show, SimpleShowLayout, ReferenceField, FunctionField, FileField, TextField } from "react-admin";

const SongsShow = (props) => (
<Show {...props}>
    <SimpleShowLayout >
        <TextField source="name" />
        <ReferenceField source="album" reference="albums" link="show">
            <FunctionField render={record => `${record.artist} - ${record.name}`}/>
        </ReferenceField>
        <ReferenceField source="file" reference="media_objects" link="show">
            <FileField source="contentUrl" title="fileName" />
        </ReferenceField>
        <TextField source="duration" />
    </SimpleShowLayout>
</Show>
);

export default SongsShow;