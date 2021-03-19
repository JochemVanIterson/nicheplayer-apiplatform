import * as React from 'react';

import { List, Datagrid, EditButton, ReferenceField, TextField, ImageField } from "react-admin";

import { makeStyles } from '@material-ui/core/styles';

const useImageFieldStyles = makeStyles(theme => ({
    image: { // This will override the style of the <img> inside the <div>
        margin: '0px',
        width: 64,
        height: 64,
    }
}));

const AlbumsList = (props) =>{
    const imageFieldClasses = useImageFieldStyles();
    return (
        <List {...props}>
            <Datagrid optimized rowClick="show" >
                <ReferenceField source="albumArt" reference="media_objects" link={false} sortable={false}>
                    <ImageField source="contentUrl" classes={imageFieldClasses} />
                </ReferenceField>
                <TextField source="name" />
                <TextField source="artist" />
                <EditButton/>
            </Datagrid>
        </List>
    )
}

export default AlbumsList;