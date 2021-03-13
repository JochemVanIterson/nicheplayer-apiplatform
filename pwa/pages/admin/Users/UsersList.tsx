import * as React from 'react';

import {
    FieldGuesser,
    ListGuesser
  } from "@api-platform/admin";

import FullNameField from './FullNameField'

const UsersList = (props) => (
    <ListGuesser {...props} rowClick="show">
      <FullNameField label="Full Name"/>
      <FieldGuesser source="username" />
      <FieldGuesser source="email" />
    </ListGuesser>
  );

  export default UsersList;