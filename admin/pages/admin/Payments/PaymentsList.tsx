import * as React from 'react';

import {
    List,
    Datagrid,
    EditButton,
    ReferenceField,
    FunctionField,
    ChipField,
    NumberField,
    TextField,
    DateField
} from "react-admin";

const PaymentsList = (props) => (
<List {...props} sort={{ field: 'name', order: 'ASC' }}>
    <Datagrid optimized rowClick="show" >
        <FunctionField label="ID" sortBy="id" render={record => `${record.id.replace("/api/payments/", "")}`} />
        <ReferenceField source="user" reference="users" link="show" sortBy="user">
            <FunctionField render={record => `${record.firstname} ${record.lastname}`}/>
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
        <EditButton/>
    </Datagrid>
</List>
);

export default PaymentsList;