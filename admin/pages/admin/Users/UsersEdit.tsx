import * as React from 'react';

import {
    InputGuesser,
    EditGuesser,
  } from "@api-platform/admin";
  import {
    SelectArrayInput,
    PasswordInput,
    ReferenceInput,
    SelectInput
  } from "react-admin";

const UsersEdit = (props) => (
  <EditGuesser {...props}>
    <InputGuesser fullWidth source="username" />
    <InputGuesser fullWidth source="email" />
    <InputGuesser fullWidth source="firstname" />
    <InputGuesser fullWidth source="lastname" />
    <PasswordInput fullWidth source="password" />
    <SelectArrayInput fullWidth source="roles" choices={[
      { id: 'ROLE_ADMIN', name: 'Admin' },
      { id: 'ROLE_USER', name: 'User' },
    ]} />
    <ReferenceInput
      fullWidth
      source="profilepic"
      reference="media_objects"
      sort={{ field: "fileName", order: 'ASC' }}
      filter={{ type: "image" }}
    >
      <SelectInput optionText="fileName" />
    </ReferenceInput>
  </EditGuesser>
);

  export default UsersEdit;