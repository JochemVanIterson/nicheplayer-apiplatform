import * as React from 'react';

import { List, Datagrid, FileField, ReferenceField, ChipField, FunctionField, TextField, ArrayField } from "react-admin";

import filesize from 'filesize';
import MetaField from './MetaField';

const MediaObjectsList = (props) => (
  <List {...props}>
    <Datagrid optimized rowClick="show" >
      <FileField source="contentUrl" title="fileName" />
      <TextField source="type" />
      <FunctionField label="Size" sortBy="size" render={record => `${filesize(record.size)}`}/>
      <MetaField source="meta" size="small"/>
      <ReferenceField source="source" reference="sources">
        <ChipField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
  );

  export default MediaObjectsList;