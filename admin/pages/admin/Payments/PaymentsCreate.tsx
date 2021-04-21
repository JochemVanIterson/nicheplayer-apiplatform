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
    SelectArrayInput,
    FormDataConsumer,
    required
} from "react-admin";
import { Box, Card, CardContent, Typography } from '@material-ui/core';

const PaymentsCreate = (props) => {
    const userRenderer = choice => `${choice.firstname} ${choice.lastname}`;
    const songNameRenderer = choice => `${choice.trackNumber}. ${choice.name}`;
    const albumNameRenderer = choice => `${choice.artist} - ${choice.name}`;
    return (
        <CreateGuesser {...props}>
            <ReferenceInput fullWidth source="user" reference="users" perPage={0}>
                <SelectInput optionText={userRenderer} />
            </ReferenceInput>

            <SelectInput fullWidth source="paymentStatus" choices={[
                { id: 'requested', name: 'Requested' },
                { id: 'in_progress', name: 'In Progress' },
                { id: 'success', name: 'Success' },
                { id: 'declined', name: 'Declined' },
            ]} />
            
            <NumberInput fullWidth source="price" />

            <SelectInput fullWidth source="type" choices={[
                { id: 'album', name: 'Album' },
                { id: 'song', name: 'Song' },
            ]} />

            <Card fullWidth>
                <CardContent>
                    <Typography variant="h6" gutterBottom> Content</Typography>

                    <FormDataConsumer>
                        {({ formData, ...rest }) => {
                            if (!formData.type) return <span>Set type</span>
                            console.log("formData", formData.type)
                            return <Box display="flex" flexDirection="column">
                                {
                                    (formData.type == "album" || formData.type == "song") ?
                                        <ReferenceInput source="album" reference="albums" perPage={0} {...rest}>
                                            <SelectInput optionText={albumNameRenderer} />
                                        </ReferenceInput> : null
                                }
                                {
                                    (formData.type == "song") ?
                                        <ReferenceInput
                                            source="song"
                                            reference="songs"
                                            sort={{ field: "trackNumber", order: 'ASC' }}
                                            filter={{ album: formData.album }}
                                            perPage={0}
                                            {...rest}
                                        >
                                            <SelectInput optionText={songNameRenderer} />
                                        </ReferenceInput> : null
                                }
                            </Box>
                        }
                        }
                    </FormDataConsumer>
                </CardContent>
            </Card>
        </CreateGuesser>
    )
}

export default PaymentsCreate;