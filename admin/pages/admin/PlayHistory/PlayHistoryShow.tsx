import * as React from 'react';

import Button from '@material-ui/core/Button';

import {
    Show,
    SimpleShowLayout,
    ReferenceField,
    ReferenceFieldController,
    FunctionField,
    DateField,
    TopToolbar
} from "react-admin";

const PostShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
    </TopToolbar>
);

const PlayHistoryShow = (props) => (
<Show actions={<PostShowActions />} {...props}>
    <SimpleShowLayout >
        <FunctionField label="ID" sortBy="id" render={record => `${record.id.replace("/api/play_histories/", "")}`} />
        <ReferenceField source="user" reference="users" link="show" sortBy="firstname">
            <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <ReferenceFieldController label="Song" reference="songs" source="song" addLabel>
            {({ referenceRecord, ...props }) => {
                console.log(referenceRecord, props)
                return (
                    <ReferenceField basePath="/albums" resource="songs" reference="albums" source="album" link={(record, reference) => `/songs/${encodeURIComponent(record.id)}/show`} record={referenceRecord || {}}>
                        <FunctionField render={record => `${record.artist} - ${referenceRecord.name}`} />
                    </ReferenceField>
                )
            }}
        </ReferenceFieldController>
        <DateField source="timestamp" showTime />
    </SimpleShowLayout>
</Show>
);

export default PlayHistoryShow;