import * as React from 'react';

import {
    FieldGuesser,
    ListGuesser
  } from "@api-platform/admin";

const UsersList = (props) => (
    <ListGuesser {...props}>
      <FieldGuesser source="username" />
      <FieldGuesser source="email" />
      <FieldGuesser source="firstname" />
      <FieldGuesser source="lastname" />
      {/* Use react-admin components directly when you want complex fields. */}
      {/* <ReferenceField label="Profile picture" source="profilepic_id" reference="media">
        <TextField source="file_path" />
      </ReferenceField> */}
    </ListGuesser>
  );

  export default UsersList;