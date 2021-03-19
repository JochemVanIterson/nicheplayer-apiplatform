import * as React from 'react';

import {
    InputGuesser,
    CreateGuesser
  } from "@api-platform/admin";
  import {
    SelectArrayInput,
    PasswordInput,
    ReferenceInput,
    SelectInput
  } from "react-admin";

const UsersCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="username" />
        <InputGuesser source="email" />
        <InputGuesser source="firstname" />
        <InputGuesser source="lastname" />
        <PasswordInput source="password" />
        <SelectArrayInput source="roles" choices={[
            { id: 'ROLE_ADMIN', name: 'Admin' },
            { id: 'ROLE_USER', name: 'User' },
        ]} />
        <ReferenceInput
            source="profilepic"
            reference="media_objects"
            filter={{ type: "image" }}
        >
            <SelectInput optionText="fileName" />
        </ReferenceInput>
    </CreateGuesser>
)

export default UsersCreate;