import * as React from 'react';

import { useState, useEffect } from 'react';

import {
    List,
    Datagrid,
    EditButton,
    ReferenceField,
    ReferenceFieldController,
    FunctionField,
    DateField,
    TextField,
    linkToRecord
} from "react-admin";

const PlayHistoryList = (props) => {
    const linkToSong = linkToRecord('/songs', props.song, 'show');
    return (
    <List {...props} sort={{ field: 'timestamp', order: 'ASC' }}>
        <Datagrid optimized rowClick="show" >
            <ReferenceField source="user" reference="users" link="show" sortBy="firstname">
                <FunctionField render={record => `${record.firstname} ${record.lastname}`}/>
            </ReferenceField>
            <ReferenceFieldController label="Song" reference="songs" source="song">
                {({ referenceRecord, ...props }) => {
                    console.log(referenceRecord, props)
                    return (
                        <ReferenceField basePath="/albums" resource="songs" reference="albums" source="album" link={(record, reference) => `/songs/${encodeURIComponent(record.id)}/show`} record={referenceRecord || {}}>
                            <FunctionField render={record => `${record.artist} - ${referenceRecord.name}`} />
                        </ReferenceField>
                    )
                }}
            </ReferenceFieldController>
            <DateField source="timestamp" showTime/>
        </Datagrid>
    </List>
)
};

export default PlayHistoryList;