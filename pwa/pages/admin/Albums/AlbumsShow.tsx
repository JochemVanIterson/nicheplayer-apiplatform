import * as React from 'react';

import {
    Show,
    SimpleShowLayout,
    ReferenceField,
    ImageField,
    TextField,
    DateField,
    NumberField,
    ReferenceArrayField,
    Datagrid
} from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useImageFieldStyles = makeStyles(theme => ({
    image: { // This will override the style of the <img> inside the <div>
        width: 128,
        height: 128,
    }
}));

const AlbumsShow = (props) => {
    const imageFieldClasses = useImageFieldStyles();
    return (
        <Show {...props}>
            <SimpleShowLayout >
                <ReferenceField source="albumArt" reference="media_objects">
                    <ImageField source="contentUrl" classes={imageFieldClasses} />
                </ReferenceField>
                <TextField source="name" />
                <TextField source="artist" />
                <DateField source="releaseDate" />
                <ReferenceArrayField label="Songs" reference="songs" source="songs" sort={{ field: 'trackNumber', order: 'ASC' }}>
                    <Card>
                        <Datagrid rowClick="show" >
                            <NumberField source="trackNumber" sortable={false}/>
                            <TextField source="name" sortable={false}/>
                            <NumberField source="duration" sortable={false}/>
                        </Datagrid>
                    </Card>
                </ReferenceArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default AlbumsShow;