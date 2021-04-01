import * as React from 'react';

import {
    List,
    Datagrid,
    ReferenceField,
    ReferenceFieldController,
    FunctionField,
    DateField
} from "react-admin";

import { cloneElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    useListContext,
    TopToolbar,
    CreateButton,
    ExportButton,
    Button,
    sanitizeListRestProps,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';

const ListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
        </TopToolbar>
    );
};

const PlayHistoryList = (props) => {
    return (
    <List {...props} sort={{ field: 'timestamp', order: 'ASC' }} actions={<ListActions />}>
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