import * as React from 'react';

import {
    EditGuesser
} from "@api-platform/admin";
import {
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    NumberInput,
    Edit,
    SimpleForm,
    required
} from "react-admin";

import Box from '@material-ui/core/Box';

const AlbumsEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput fullWidth source="name" validate={[required()]} />
                <TextInput fullWidth source="artist" validate={[required()]} />
                <DateInput fullWidth source="releaseDate" />
                <ReferenceInput
                    fullWidth
                    source="albumArt"
                    reference="media_objects"
                    sort={{ field: "fileName", order: 'ASC' }}
                    filter={{ type: "image" }}
                >
                    <SelectInput optionText="fileName" />
                </ReferenceInput>
                
                <Box fullWidth display="flex">
                    <Box flexGrow={1} >
                        <NumberInput fullWidth source="price" step={.01} min={0} />
                    </Box>
                    <Box pl={1}>
                        <SelectInput source="currency" choices={[
                            { id: 'dollar', name: 'Dollar ($)' },
                            { id: 'euro', name: 'Euro (€)' },
                        ]} />
                    </Box>
                </Box>
            </SimpleForm>
        </Edit>
    )
}

export default AlbumsEdit;