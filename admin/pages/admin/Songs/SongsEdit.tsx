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
    required,
    Edit,
    SimpleForm
} from "react-admin";

import Button from '@material-ui/core/Button';

const SongsEdit = (props) => {
    const albumNameRenderer = choice => `${choice.artist} - ${choice.name}`;
    return (
        <Edit {...props}>
            <SimpleForm>
                <ReferenceInput
                    fullWidth
                    source="file"
                    reference="media_objects"
                    sort={{ field: "fileName", order: 'ASC' }}
                    filter={{ type: "audio" }}
                >
                    <SelectInput optionText="fileName" />
                </ReferenceInput>
                <Button variant="contained">Default</Button>
                <TextInput fullWidth source="name" validate={[required()]} />
                <TextInput fullWidth source="songArtist" />
                <ReferenceInput fullWidth source="album" reference="albums">
                    <SelectInput optionText={albumNameRenderer} />
                </ReferenceInput>
                <NumberInput fullWidth source="trackNumber" />
                <BooleanInput fullWidth source="explorable"/>
                <NumberInput fullWidth source="duration" />
            </SimpleForm>
        </Edit>
    )
}

export default SongsEdit;