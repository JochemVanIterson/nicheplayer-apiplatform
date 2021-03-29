import * as React from 'react';

import {
    InputGuesser,
    EditGuesser
  } from "@api-platform/admin";
  import {
    FileField,
    ReferenceInput,
    SelectInput
  } from "react-admin";

const MediaObjectsEdit = (props) => (
  <EditGuesser {...props}>
    <FileField fullWidth source="contentUrl" title="contentUrl" />
    <SelectInput fullWidth source="type" choices={[
      { id: 'unknown', name: 'Unknown' },
      { id: 'image', name: 'Image' },
      { id: 'audio', name: 'Audio' },
    ]} />
    <SelectInput fullWidth source="access" choices={[
      { id: 'world', name: 'World' },
      { id: 'login', name: 'Login' },
      { id: 'owner', name: 'Owner' },
    ]} />
    <InputGuesser fullWidth source="meta" />
    <ReferenceInput
      fullWidth
      source="source"
      reference="sources">
      <SelectInput optionText="name" />
    </ReferenceInput>
  </EditGuesser>
)

export default MediaObjectsEdit;