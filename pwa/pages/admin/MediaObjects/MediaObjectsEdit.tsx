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
        <FileField source="contentUrl" title="contentUrl" />
        <SelectInput source="type" choices={[
          { id: 'unknown', name: 'Unknown' },
          { id: 'image', name: 'Image' },
          { id: 'audio', name: 'Audio' },
        ]} />
        <InputGuesser source="meta" />
        <ReferenceInput
            source="source"
            reference="sources">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </EditGuesser>
)

export default MediaObjectsEdit;