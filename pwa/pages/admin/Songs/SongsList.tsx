import * as React from 'react';

import { List, Datagrid, EditButton, ReferenceField, FunctionField, FileField, NumberField, TextField } from "react-admin";

const SongsList = (props) => (
<List {...props} sort={{ field: 'name', order: 'ASC' }}>
    <Datagrid optimized rowClick="show" >
        <TextField source="name" sortBy="name"/>
        <ReferenceField source="album" reference="albums" link="show" sortBy="artist">
            <FunctionField render={record => `${record.artist} - ${record.name}`}/>
        </ReferenceField>
        <NumberField source="trackNumber" />
        <ReferenceField source="file" reference="media_objects" link="show" sortBy="fileName">
            <FileField source="contentUrl" title="fileName" />
        </ReferenceField>
        <EditButton/>
    </Datagrid>
</List>
);

export default SongsList;