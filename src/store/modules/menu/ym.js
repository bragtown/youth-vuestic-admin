import lazyLoading from './lazyLoading'

export default {
  name: 'ym',
  meta: {
    expanded: false,
    title: 'Young Men',
    iconClass: 'vuestic-icon vuestic-icon-ui-elements'
  },
  children: [
    {
      name: 'Young Men',
      path: '/ym/youngmen',
      component: lazyLoading('dashboard/youth'),
      meta: {
        title: 'Young Men'
      }
    },    
    {
      name: 'Deacons',
      path: '/ym/deacons',
      component: lazyLoading('dashboard/Deacons'),
      meta: {
        title: 'Deacons'
      }
    },    
    {
      name: 'Teachers',
      path: '/ym/teachers',
      component: lazyLoading('dashboard/Teachers'),
      meta: {
        title: 'Teachers'
      }
    },
    {
      name: 'Priests',
      path: '/ym/priests',
      component: lazyLoading('dashboard/Priests'),
      meta: {
        title: 'Priests'
      }
    },
  ]
}

