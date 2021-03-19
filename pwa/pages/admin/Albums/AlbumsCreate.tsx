import * as React from 'react';

import {
    CreateGuesser
} from "@api-platform/admin";
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    required
} from "react-admin";

const AlbumsCreate = (props) => {
    return (
        <CreateGuesser {...props}>
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
        </CreateGuesser>
    )
}

export default AlbumsCreate;