import * as React from 'react';

import { Show, SimpleShowLayout, FileField, TextField, ReferenceField, ChipField } from "react-admin";

const MediaObjectsShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <FileField source="contentUrl" title="contentUrl" label="File"/>
      <TextField source="meta" />
      <ReferenceField source="source" reference="sources">
        <ChipField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
  );

  export default MediaObjectsShow;