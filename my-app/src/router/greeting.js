import GreetingList from '../components/greeting/List'
import GreetingCreate from '../components/greeting/Create'
import GreetingUpdate from '../components/greeting/Update'
import GreetingShow from '../components/greeting/Show'

const list = {
  label: 'GreetingList',
  icon: 'whatshot'
}
const create = {
  label: 'GreetingCreate',
  icon: 'whatshot'
}
const update = {
  label: 'GreetingUpdate',
  icon: 'whatshot'
}
const show = {
  label: 'GreetingShow',
  icon: 'whatshot'
}

export default [
  {
    name: list.label,
    path: 'greetings/',
    component: GreetingList,
    meta: {
      breadcrumb: [list]
    }
  },
  {
    name: create.label,
    path: 'greetings/create',
    component: GreetingCreate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list.label } }, create]
    }
  },
  {
    name: update.label,
    path: 'greetings/edit/:id',
    component: GreetingUpdate,
    meta: {
      breadcrumb: [{ ...list, to: { name: list.label } }, update]
    }
  },
  {
    name: show.label,
    path: 'greetings/show/:id',
    component: GreetingShow,
    meta: {
      breadcrumb: [{ ...list, to: { name: list.label } }, show]
    }
  }
]
