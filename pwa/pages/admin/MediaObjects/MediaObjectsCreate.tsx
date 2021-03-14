import * as React from 'react';

import { CreateGuesser } from "@api-platform/admin";
import {
  FileInput,
  FileField
} from "react-admin";

const MediaObjectsCreate = (props) => (
  <CreateGuesser {...props}>
      <FileInput source="file">
        <FileField source="src" title="title"/>
      </FileInput>
  </CreateGuesser>
)

export default MediaObjectsCreate;