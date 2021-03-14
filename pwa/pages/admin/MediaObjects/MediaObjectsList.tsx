import * as React from 'react';

import { List, Datagrid, FileField, ReferenceField, ChipField } from "react-admin";
import {
  FieldGuesser
} from "@api-platform/admin";

const MediaObjectsList = (props) => (
    <List {...props}>
      <Datagrid optimized rowClick="show" >
        <FileField source="contentUrl" title="contentUrl" />
        <FieldGuesser source="meta" />
        <ReferenceField source="source" reference="sources">
          <ChipField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  );

  export default MediaObjectsList;