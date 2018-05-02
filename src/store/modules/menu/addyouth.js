import lazyLoading from './lazyLoading'

export default {
  name: 'AddYouth',
  path: '/addyouth',
  component: lazyLoading('dashboard/addYouth'),
  meta: {
    default: true,
    title: 'Add Youth',
    iconClass: 'vuestic-icon vuestic-icon-forms'
  }
}
