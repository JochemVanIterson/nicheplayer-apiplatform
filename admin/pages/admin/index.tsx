import Head from "next/head";

import {
  HydraAdmin,
  ResourceGuesser,
} from "@api-platform/admin";

import apiGetter from "./apiGetter"

import MyLayout from "./layout/MyLayout"
import MyTheme from "./layout/MyTheme"

import Albums from "./Albums";
import MediaObjects from "./MediaObjects";
import Songs from "./Songs";
import Sources from "./Sources";
import Users from "./Users";
import Payments from "./Payments";
import PlayHistory from "./PlayHistory";

import Login from "./Login";
import Dashboard from './Dashboard';

const Admin = () => (
  <>
    <Head>
      <title>API Platform Admin</title>
    </Head>

    <HydraAdmin
      {...apiGetter}
      theme={MyTheme}
      layout={MyLayout}
      loginPage={Login}
      dashboard={Dashboard}
    >

      <ResourceGuesser name="users" {...Users} />
      <ResourceGuesser name="sources" {...Sources} />
      <ResourceGuesser name="media_objects" {...MediaObjects} />
      <ResourceGuesser name="albums" {...Albums} />
      <ResourceGuesser name="songs" {...Songs} />
      <ResourceGuesser name="payments" {...Payments} />
      <ResourceGuesser name="play_histories" {...PlayHistory} />
    </HydraAdmin>
  </>
);
export default Admin;
