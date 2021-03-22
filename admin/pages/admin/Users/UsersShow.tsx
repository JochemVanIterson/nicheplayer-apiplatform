import * as React from 'react';

import { Show, SimpleShowLayout, TextField } from "react-admin";
import ProfilePictureField from './ProfilePictureField'

const UsersShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ProfilePictureField source="profilepic" size="400"/>
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="firstname" />
        <TextField source="lastname" />
        {/* <SelectArrayInput source="roles" choices={[
          { id: 'ROLE_ADMIN', name: 'Admin' },
          { id: 'ROLE_USER', name: 'User' },
        ]} /> */}
      </SimpleShowLayout>
    </Show>
  );
}

  export default UsersShow;