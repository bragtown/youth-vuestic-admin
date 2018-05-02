import lazyLoading from './lazyLoading'

export default {
  name: 'Young Women',
  path: '/youngwomen',
  component: lazyLoading('dashboard/youth'),
  meta: {
    default: true,
    title: 'Young Women',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
