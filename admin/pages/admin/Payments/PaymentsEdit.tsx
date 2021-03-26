import * as React from 'react';

import {
    EditGuesser
} from "@api-platform/admin";
import {
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    FormDataConsumer,
    DateField,
    TextField,
    FunctionField,
    ReferenceField,
    required
} from "react-admin";
import { Card, CardContent, Typography } from '@material-ui/core';

const PaymentsEdit = (props) => {
    return (
        <EditGuesser {...props}>
            <ReferenceField source="user" reference="users">
                <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
            </ReferenceField>

            <SelectInput source="paymentStatus" choices={[
                { id: 'requested', name: 'Requested' },
                { id: 'in_progress', name: 'In Progress' },
                { id: 'success', name: 'Success' },
                { id: 'declined', name: 'Declined' },
            ]} />

            <DateField source="datetime" showTime />

            <TextField source="price" />

            <TextField source="type" />

            <Typography variant="h6" gutterBottom>Content</Typography>

            <ReferenceField label="Album" source="album" reference="albums">
                <FunctionField render={record => `${record.artist} - ${record.name}`} />
            </ReferenceField>
            <ReferenceField label="Song" source="song" reference="songs">
                <FunctionField render={record => `${record.trackNumber}. ${record.name}`} />
            </ReferenceField>
        </EditGuesser>
    )
}

export default PaymentsEdit;