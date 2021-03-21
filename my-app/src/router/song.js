import SongList from "../components/song/List";
import SongCreate from "../components/song/Create";
import SongUpdate from "../components/song/Update";
import SongShow from "../components/song/Show";

const list = {
  label: "SongList",
  icon: "whatshot",
};
const create = {
  label: "SongCreate",
  icon: "whatshot",
};
const update = {
  label: "SongUpdate",
  icon: "whatshot",
};
const show = {
  label: "SongShow",
  icon: "whatshot",
};

export default [
  {
    name: list["label"],
    path: "songs/",
    component: SongList,
    meta: {
      breadcrumb: [list],
    },
  },
  {
    name: create["label"],
    path: "songs/create",
    component: SongCreate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, create],
    },
  },
  {
    name: update["label"],
    path: "songs/edit/:id",
    component: SongUpdate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, update],
    },
  },
  {
    name: show["label"],
    path: "songs/show/:id",
    component: SongShow,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, show],
    },
  },
];
