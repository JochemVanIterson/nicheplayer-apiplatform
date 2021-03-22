import UsersCreate from "./UsersCreate";
import UsersList from "./UsersList";
import UsersEdit from "./UsersEdit";
import UsersShow from "./UsersShow"

import UserIcon from '@material-ui/icons/People';
      
export default {
    list: UsersList,
    edit: UsersEdit,
    create: UsersCreate,
    show: UsersShow,
    icon: UserIcon
};