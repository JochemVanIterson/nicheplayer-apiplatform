import * as React from 'react';

import {
    Show,
    SimpleShowLayout,
    ReferenceField,
    FunctionField,
    DateField
} from "react-admin";

const PlayHistoryShow = (props) => (
<Show {...props}>
    <SimpleShowLayout >
        <FunctionField label="ID" sortBy="id" render={record => `${record.id.replace("/api/play_histories/", "")}`} />
        <ReferenceField source="user" reference="users" link="show" sortBy="firstname">
            <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        {/* <ReferenceField source="song" reference="songs" link="show" sortBy="name">
            <FunctionField render={record => `${record.artist.name} ${record.name}`} />
        </ReferenceField> */}
        <DateField source="timestamp" showTime />
    </SimpleShowLayout>
</Show>
);

export default PlayHistoryShow;