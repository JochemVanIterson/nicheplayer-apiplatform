import * as React from 'react';

import {
    EditGuesser
} from "@api-platform/admin";
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    required
} from "react-admin";

const AlbumsEdit = (props) => {
    return (
        <EditGuesser {...props}>
            <TextInput source="name" validate={[required()]} />
            <TextInput source="artist" validate={[required()]} />
            <DateInput source="releaseDate" />
            <ReferenceInput
                source="albumArt"
                reference="media_objects"
                filter={{ type: "image" }}
            >
                <SelectInput optionText="fileName" />
            </ReferenceInput>
            {/* TODO: song chooser */}
        </EditGuesser>
    )
}

export default AlbumsEdit;