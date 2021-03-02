import Head from "next/head";
import { Redirect, Route } from "react-router-dom";
import {
  HydraAdmin,
  ResourceGuesser,
  ListGuesser,
  FieldGuesser,
  hydraDataProvider as baseHydraDataProvider,
  fetchHydra as baseFetchHydra, useIntrospection
} from "@api-platform/admin";
import {
  AutocompleteInput,
  ReferenceField,
  ReferenceInput,
  TextField,
} from "react-admin";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import authProvider from "./authProvider";
import Login from "./layout/Login";
import Dashboard from './Dashboard';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PhotoIcon from '@material-ui/icons/Photo';
import UserIcon from '@material-ui/icons/People';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';

const API_ENTRYPOINT = process.env.REACT_APP_API_ENTRYPOINT || "https://localhost";
const getHeaders = () => localStorage.getItem("token") ? {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
} : {};
const fetchHydra = (url, options = {}) =>
  baseFetchHydra(url, {
    ...options,
    headers: getHeaders,
  });
const RedirectToLogin = () => {
  const introspect = useIntrospection();

  if (localStorage.getItem("token")) {
    introspect();
    return <></>;
  }
  return <Redirect to="/login" />;
};

const apiDocumentationParser = async (entrypoint) => {
  try {
    const { api } = await parseHydraDocumentation(entrypoint, { headers: getHeaders });
    return { api };
  } catch (result) {
    if (result.status === 401) {
      // Prevent infinite loop if the token is expired
      localStorage.removeItem("token");

      return {
        api: result.api,
        customRoutes: [ <Route path="/" component={RedirectToLogin} /> ],
      };
    }

    throw result;
  }
};
const dataProvider = baseHydraDataProvider(API_ENTRYPOINT, fetchHydra, apiDocumentationParser);

const UsersList = (props) => (
  <ListGuesser {...props}>
    <FieldGuesser source="username" />
    <FieldGuesser source="email" />
    <FieldGuesser source="firstname" />
    <FieldGuesser source="lastname" />
    {/* Use react-admin components directly when you want complex fields. */}
    <ReferenceField label="Profile picture" source="profilepic" reference="media">
      <TextField source="path" />
    </ReferenceField>
  </ListGuesser>
);

const Admin = () => (
  <>
    <Head>
      <title>API Platform Admin</title>
    </Head>

    <HydraAdmin
      dataProvider={ dataProvider }
      authProvider={ authProvider }
      entrypoint={ API_ENTRYPOINT }
      loginPage={Login}
      dashboard={Dashboard}
    >

      <ResourceGuesser
        name="users"
        list={UsersList}
        icon={UserIcon}
      />
      <ResourceGuesser name="greetings" />
      <ResourceGuesser name="sources" icon={AccountBalanceIcon} />
      <ResourceGuesser name="media" icon={PhotoIcon}/>
      <ResourceGuesser name="albums" icon={AlbumIcon} />
      <ResourceGuesser name="songs" icon={MusicNoteIcon} />
    </HydraAdmin>
  </>
);
export default Admin;
