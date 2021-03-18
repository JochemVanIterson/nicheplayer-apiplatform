import * as React from 'react';

import {
    EditGuesser
} from "@api-platform/admin";
import {
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required
} from "react-admin";

const SongsEdit = (props) => {
    const albumNameRenderer = choice => `${choice.artist} - ${choice.name}`;
    return (
        <EditGuesser {...props}>
            <TextInput source="name" validate={[required()]} />
            <TextInput source="songArtist" />
            <ReferenceInput source="album" reference="albums">
                <SelectInput optionText={albumNameRenderer} />
            </ReferenceInput>
            <ReferenceInput
                source="file"
                reference="media_objects"
                perPage={100}
                filter={{ type: "audio" }}
            >
                <SelectInput optionText="fileName" />
            </ReferenceInput>
            <NumberInput source="duration" />
        </EditGuesser>
    )
}

export default SongsEdit;