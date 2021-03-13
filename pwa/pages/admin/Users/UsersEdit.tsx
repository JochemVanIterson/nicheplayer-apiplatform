import * as React from 'react';

import {
    InputGuesser,
    EditGuesser,
  } from "@api-platform/admin";
  import {
    SelectArrayInput,
    PasswordInput
  } from "react-admin";

const UsersEdit = (props) => (
    <EditGuesser {...props}>
      <InputGuesser source="username" />
      <InputGuesser source="email" />
      <InputGuesser source="firstname" />
      <InputGuesser source="lastname" />
      <PasswordInput initialValue="Unchanged" source="password" />
      <SelectArrayInput source="roles" choices={[
        { id: 'ROLE_ADMIN', name: 'Admin' },
        { id: 'ROLE_USER', name: 'User' },
      ]} />
    </EditGuesser>
  );

  export default UsersEdit;