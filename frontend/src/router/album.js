import AlbumList from "../components/album/List";
import AlbumCreate from "../components/album/Create";
import AlbumUpdate from "../components/album/Update";
import AlbumShow from "../components/album/Show";

const list = {
  label: "AlbumList",
  icon: "whatshot"
}
const create = {
  label: "AlbumCreate",
  icon: "whatshot"
}
const update = {
  label: "AlbumUpdate",
  icon: "whatshot"
}
const show = {
  label: "AlbumShow",
  icon: "whatshot"
}

export default [
  {
    name: list["label"],
    path: "albums/",
    component: AlbumList,
    meta: {
      breadcrumb: [list],
    },
  },
  {
    name: create["label"],
    path: "albums/create",
    component: AlbumCreate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, create],
    },
  },
  {
    name: update["label"],
    path: "albums/edit/:id",
    component: AlbumUpdate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, update],
    },
  },
  {
    name: show["label"],
    path: "albums/show/:id",
    component: AlbumShow,
    meta: {
      breadcrumb: [{ ...list, to: { name: list["label"] } }, show],
    },
  },
];
