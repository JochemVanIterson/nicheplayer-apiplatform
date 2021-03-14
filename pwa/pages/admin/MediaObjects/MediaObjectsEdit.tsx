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
        <InputGuesser source="meta" />
        <ReferenceInput
            source="source"
            reference="sources"
            perPage={100}>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </EditGuesser>
)

export default MediaObjectsEdit;