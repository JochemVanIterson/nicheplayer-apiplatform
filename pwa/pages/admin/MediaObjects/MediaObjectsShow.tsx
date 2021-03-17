import * as React from 'react';

import { Show, SimpleShowLayout, FileField, FunctionField, ReferenceField, ChipField, TextField } from "react-admin";

import filesize from 'filesize';
import MetaField from './MetaField';

const MediaObjectsShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <FileField source="contentUrl" title="fileName" label="File"/>
      <TextField source="type" />
      <FunctionField label="Size" render={record => `${filesize(record.size)}`}/>
      <MetaField source="meta" size="medium" label="Metadata"/>
      <ReferenceField source="source" reference="sources">
        <ChipField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
  );

  export default MediaObjectsShow;