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
      {/* Use react-admin components directly when you want complex fields. */}
      {/* <ReferenceField label="Profile picture" source="profilepic_id" reference="media">
        <TextField source="file_path" />
      </ReferenceField> */}
    </ListGuesser>
  );

  export default UsersList;