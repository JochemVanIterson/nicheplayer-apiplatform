import * as React from 'react';

import { List, Datagrid, FileField, ReferenceField, ChipField, FunctionField, TextField } from "react-admin";

import filesize from 'filesize';
import MetaField from './MetaField';

const MediaObjectsList = (props) => (
  <List {...props}>
    <Datagrid optimized rowClick="show" >
      <FunctionField label="ID" sortBy="id" render={record => `${record.id.replace("/media_objects/", "")}`} />
      <FileField source="contentUrl" title="fileName" sortBy="fileName" label="File name"/>
      <TextField source="type" />
      <FunctionField label="Size" sortBy="size" render={record => `${filesize(record.size)}`}/>
      <ReferenceField source="source" reference="sources">
        <ChipField source="name" />
      </ReferenceField>
      <MetaField source="meta" size="small" sortable={false}/>
    </Datagrid>
  </List>
  );

  export default MediaObjectsList;