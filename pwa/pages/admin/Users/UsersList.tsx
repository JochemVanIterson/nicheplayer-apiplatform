import * as React from 'react';

import { List, Datagrid, EditButton } from "react-admin";
import {
    FieldGuesser
  } from "@api-platform/admin";
import { makeStyles } from '@material-ui/core/styles'

import myTheme from '../layout/MyTheme'

import FullNameField from './FullNameField'

const rowStyle = (record) => {
  console.log("rowStyle", myTheme);
  let style = {}

  if (record.roles.includes("ROLE_ADMIN")) return {
    ...style,
    'borderLeftColor': `${myTheme.palette.secondary.main}`,
    'borderLeftWidth': 5,
    'borderLeftStyle': `solid`
  }
  else return style
}

const useListStyles = makeStyles({
  headerRow: {
//     borderLeftColor: 'transparent',
//     borderLeftWidth: 5,
//     borderLeftStyle: 'solid'
  },
  headerCell: {
//     padding: '6px 8px 6px 8px'
  },
  rowCell: {
//     padding: '6px 8px 6px 8px'
  }
})
// console.log("useListStyles", useListStyles(0))
// const classes = useListStyles();
const UsersList = (props) => (
    <List {...props}>
      <Datagrid
        optimized
        rowClick="show"
        rowStyle={rowStyle}
        // classes={{
        //   headerRow: classes.headerRow,
        //   headerCell: classes.headerCell,
        //   rowCell: classes.rowCell
        // }}
      >
        <FullNameField label="Full Name" sortBy="firstname"/>
        <FieldGuesser source="username" />
        <FieldGuesser source="email" />
        <EditButton/>
      </Datagrid>
    </List>
  );

  export default UsersList;