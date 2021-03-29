import * as React from 'react';

import { CreateGuesser } from "@api-platform/admin";
import {
  FileInput,
  FileField,
  SelectInput
} from "react-admin";

const MediaObjectsCreate = (props) => (
  <CreateGuesser {...props}>
    <FileInput source="file">
      <FileField source="src" title="title"/>
    </FileInput>
    <SelectInput fullWidth source="access" choices={[
      { id: 'world', name: 'World' },
      { id: 'login', name: 'Login' },
      { id: 'owner', name: 'Owner' },
    ]} />
  </CreateGuesser>
)

export default MediaObjectsCreate;