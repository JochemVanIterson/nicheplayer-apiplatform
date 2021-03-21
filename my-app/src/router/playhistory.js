import PlayHistoryList from "../components/playhistory/List";
import PlayHistoryCreate from "../components/playhistory/Create";
import PlayHistoryUpdate from "../components/playhistory/Update";
import PlayHistoryShow from "../components/playhistory/Show";

const list = {
  label: "PlayHistoryList",
  icon: "whatshot",
};
const create = {
  label: "PlayHistoryCreate",
  icon: "whatshot",
};
const update = {
  label: "PlayHistoryUpdate",
  icon: "whatshot",
};
const show = {
  label: "PlayHistoryShow",
  icon: "whatshot",
};

export default [
  {
    name: list["label"],
    path: "play_histories/",
    component: PlayHistoryList,
    meta: {
      breadcrumb: [list],
    },
  },
  {
    name: create["label"],
    path: "play_histories/create",
    component: PlayHistoryCreate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, create],
    },
  },
  {
    name: update["label"],
    path: "play_histories/edit/:id",
    component: PlayHistoryUpdate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, update],
    },
  },
  {
    name: show["label"],
    path: "play_histories/show/:id",
    component: PlayHistoryShow,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, show],
    },
  },
];
