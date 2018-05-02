import lazyLoading from './lazyLoading'

export default {
  name: 'yw',
  meta: {
    expanded: false,
    title: 'Young Women',
    iconClass: 'vuestic-icon vuestic-icon-ui-elements'
  },
  children: [
    {
      name: 'Young Women',
      path: '/ym/youngwomen',
      component: lazyLoading('dashboard/youth'),
      meta: {
        title: 'Young Women'
      }
    },    
    {
      name: 'Beehives',
      path: '/ym/beehives',
      component: lazyLoading('dashboard/youth'),
      meta: {
        title: 'Beehives'
      }
    },    
    {
      name: 'Mia Maids',
      path: '/ym/miamaids',
      component: lazyLoading('dashboard/youth'),
      meta: {
        title: 'Mia Maids'
      }
    },
    {
      name: 'Laurels',
      path: '/ym/laurels',
      component: lazyLoading('dashboard/youth'),
      meta: {
        title: 'Laurels'
      }
    },
  ]
}

