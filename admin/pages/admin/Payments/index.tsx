import PaymentsCreate from "./PaymentsCreate";
import PaymentsList from "./PaymentsList";
import PaymentsEdit from "./PaymentsEdit";
import PaymentsShow from "./PaymentsShow"

import CreditCard from '@material-ui/icons/CreditCard';

export default {
    list: PaymentsList,
    edit: PaymentsEdit,
    create: PaymentsCreate,
    show: PaymentsShow,
    icon: CreditCard
};