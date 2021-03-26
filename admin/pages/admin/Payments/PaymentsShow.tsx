import * as React from 'react';

import {
    Show,
    SimpleShowLayout,
    ReferenceField,
    FunctionField,
    FileField,
    TextField,
    NumberField,
    BooleanField,
    DateField
} from "react-admin";
import AudioPlayerField from '../AudioPlayerField';
const PaymentsShow = (props) => (
<Show {...props}>
    <SimpleShowLayout >
        <FunctionField label="ID" sortBy="id" render={record => `${record.id.replace("/api/payments/", "")}`} />
        <ReferenceField source="user" reference="users" link="show" sortBy="user">
            <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <TextField source="type" />
        <ReferenceField source="song" reference="songs" link="show" sortBy="song">
            <FunctionField render={record => `${record.trackNumber}. ${record.name}`} />
        </ReferenceField>
        <ReferenceField source="album" reference="albums" link="show" sortBy="album">
            <FunctionField render={record => `${record.artist} - ${record.name}`} />
        </ReferenceField>
        <TextField source="paymentStatus" />
        <DateField source="datetime" showTime/>
    </SimpleShowLayout>
</Show>
);

export default PaymentsShow;