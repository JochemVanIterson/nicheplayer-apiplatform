import * as React from 'react';
import { useCallback } from 'react'

import {
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    required,
    Create,
    SimpleForm,
    useDataProvider
} from "react-admin";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { useForm } from 'react-final-form';

const SongsCreate = (props) => {
    const albumNameRenderer = choice => `${choice.artist} - ${choice.name}`;

    const GetFromMetaButton = ({ ...props }) => {
        const form = useForm();
        const dataProvider = useDataProvider();

        const handleClick = useCallback(() => {
            const id = form.getFieldState('file').value

            dataProvider.getOne('media_objects', { id: id })
                .then(({ data }) => {
                    form.change('name', data.meta.title);
                    form.change('songArtist', data.meta.artist);
                    // form.change('album', undefined);
                    form.change('trackNumber', parseInt(data.meta.track));
                    form.change('duration', parseFloat(data.meta.duration));
                })
                .catch(error => {
                    console.log(error);
                })
        }, [form]);

        return (
            <Button onClick={handleClick} {...props} >{props.label}</Button>
        );
    };

    return (
        <Create {...props}>
            <SimpleForm>
                <Box fullWidth display="flex">
                    <Box flexGrow={1} >
                        <ReferenceInput
                            fullWidth
                            source="file"
                            reference="media_objects"
                            sort={{ field: "fileName", order: 'ASC' }}
                            filter={{ type: "audio" }}
                        >
                            <SelectInput optionText="fileName" />
                        </ReferenceInput>
                    </Box>
                    <Box pl={1} pb={2} display="flex" alignItems="center" justifyContent="center">
                        <GetFromMetaButton variant="contained" color="primary" label="Get from metadata" />
                    </Box>
                </Box>
                
                <TextInput fullWidth source="name" validate={[required()]} />
                <TextInput fullWidth source="songArtist" />
                <ReferenceInput fullWidth source="album" reference="albums">
                    <SelectInput optionText={albumNameRenderer} />
                </ReferenceInput>
                <NumberInput fullWidth source="trackNumber" />
                <BooleanInput fullWidth source="explorable" defaultValue={false}/>
                <NumberInput fullWidth step={0.01} min={0} source="duration" />
            </SimpleForm>
        </Create>
    )
}

export default SongsCreate;