import * as React from 'react';

import {
    EditGuesser
} from "@api-platform/admin";
import {
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
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
            <NumberInput source="trackNumber" />
            <ReferenceInput
                source="file"
                reference="media_objects"
                sort={{ field: "fileName", order: 'ASC' }}
                filter={{ type: "audio" }}
            >
                <SelectInput optionText="fileName" />
            </ReferenceInput>
            <BooleanInput source="explorable"/>
            <NumberInput source="duration" />
        </EditGuesser>
    )
}

export default SongsEdit;