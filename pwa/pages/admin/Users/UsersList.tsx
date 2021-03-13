import * as React from 'react';

import { List, Datagrid, EditButton } from "react-admin";
import {
    FieldGuesser
  } from "@api-platform/admin";

import FullNameField from './FullNameField'

const UsersList = (props) => (
    <List {...props}>
      <Datagrid optimized rowClick="show">
        <FullNameField label="Full Name"/>
        <FieldGuesser source="username" />
        <FieldGuesser source="email" />
        <EditButton/>
      </Datagrid>
    </List>
  );

  export default UsersList;