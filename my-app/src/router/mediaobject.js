import MediaObjectList from "../components/mediaobject/List";
import MediaObjectCreate from "../components/mediaobject/Create";
import MediaObjectUpdate from "../components/mediaobject/Update";
import MediaObjectShow from "../components/mediaobject/Show";

const list = {
  label: "MediaObjectList",
  icon: "whatshot",
};
const create = {
  label: "MediaObjectCreate",
  icon: "whatshot",
};
const update = {
  label: "MediaObjectUpdate",
  icon: "whatshot",
};
const show = {
  label: "MediaObjectShow",
  icon: "whatshot",
};

export default [
  {
    name: list["label"],
    path: "media_objects/",
    component: MediaObjectList,
    meta: {
      breadcrumb: [list],
    },
  },
  {
    name: create["label"],
    path: "media_objects/create",
    component: MediaObjectCreate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, create],
    },
  },
  {
    name: update["label"],
    path: "media_objects/edit/:id",
    component: MediaObjectUpdate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, update],
    },
  },
  {
    name: show["label"],
    path: "media_objects/show/:id",
    component: MediaObjectShow,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, show],
    },
  },
];
