import * as React from 'react';

import {
    CreateGuesser
} from "@api-platform/admin";
import {
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required
} from "react-admin";

const SongsCreate = (props) => {
    const albumNameRenderer = choice => `${choice.artist} - ${choice.name}`;
    return (
        <CreateGuesser {...props}>
            <TextInput source="name" validate={[required()]} />
            <TextInput source="songArtist" />
            <ReferenceInput source="album" reference="albums">
                <SelectInput optionText={albumNameRenderer} />
            </ReferenceInput>
            <NumberInput source="trackNumber" />
            <ReferenceInput
                source="file"
                reference="media_objects"
                sort={{field: "fileName", order: 'ASC'}}
                filter={{ type: "audio" }}
            >
                <SelectInput optionText="fileName" />
            </ReferenceInput>
            <NumberInput source="duration" />
        </CreateGuesser>
    )
}

export default SongsCreate;