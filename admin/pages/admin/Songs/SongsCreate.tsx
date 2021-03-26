import * as React from 'react';

import {
    CreateGuesser
} from "@api-platform/admin";
import {
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    required
} from "react-admin";

const SongsCreate = (props) => {
    const albumNameRenderer = choice => `${choice.artist} - ${choice.name}`;
    return (
        <CreateGuesser {...props}>
            <TextInput fullWidth source="name" validate={[required()]} />
            <TextInput fullWidth source="songArtist" />
            <ReferenceInput fullWidth source="album" reference="albums">
                <SelectInput optionText={albumNameRenderer} />
            </ReferenceInput>
            <NumberInput fullWidth source="trackNumber" />
            <ReferenceInput
                fullWidth
                source="file"
                reference="media_objects"
                sort={{field: "fileName", order: 'ASC'}}
                filter={{ type: "audio" }}
            >
                <SelectInput optionText="fileName" />
            </ReferenceInput>
            <BooleanInput fullWidth source="explorable" />
            <NumberInput fullWidth source="duration" />
        </CreateGuesser>
    )
}

export default SongsCreate;