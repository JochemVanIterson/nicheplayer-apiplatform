import * as React from 'react';

import { List, Datagrid, EditButton, ReferenceField, FunctionField, FileField } from "react-admin";
import {
    FieldGuesser
  } from "@api-platform/admin";

const SongsList = (props) => (
<List {...props}>
    <Datagrid optimized rowClick="show" >
        <FieldGuesser source="name" />
        <ReferenceField source="album" reference="albums" link="show">
            <FunctionField render={record => `${record.artist} - ${record.name}`}/>
        </ReferenceField>
        <ReferenceField source="file" reference="media_objects" link="show">
            <FileField source="contentUrl" title="fileName" />
        </ReferenceField>
        <EditButton/>
    </Datagrid>
</List>
);

export default SongsList;