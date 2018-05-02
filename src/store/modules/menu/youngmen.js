import lazyLoading from './lazyLoading'

export default {
  name: 'Young Men',
  path: '/youngmen',
  component: lazyLoading('dashboard/youth'),
  meta: {
    default: true,
    title: 'Young Men',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
