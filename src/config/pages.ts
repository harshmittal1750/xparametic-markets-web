import { lazy } from 'react';

const Leaderboard = lazy(() => import('pages/Leaderboard'));
const pages = {
  home: {
    pathname: '/',
    Component: lazy(() => import('pages/Home')),
    exact: true,
    navigation: true,
    name: 'Markets'
  },
  portfolio: {
    pathname: '/portfolio',
    Component: lazy(() => import('pages/Portfolio')),
    exact: false,
    navigation: true,
    name: 'Portfolio'
  },
  achievements: {
    pathname: '/achievements',
    Component: lazy(() => import('pages/Achievements')),
    exact: false,
    navigation: true,
    name: 'Achievements'
  },
  leaderboard: {
    pathname: '/leaderboard',
    Component: Leaderboard,
    exact: true,
    navigation: true,
    name: 'Leaderboard'
  },
  clubs: {
    pathname: '/clubs',
    Component: lazy(() => import('pages/Clubs')),
    exact: true,
    navigation: true,
    name: 'Clubs'
  },
  createMarket: {
    pathname: '/market/create',
    Component: lazy(() => import('pages/CreateMarket')),
    exact: false,
    navigation: false,
    name: ''
  },
  market: {
    pathname: '/markets',
    Component: lazy(() => import('pages/Market')),
    exact: false,
    navigation: false,
    name: ''
  },
  club: {
    pathname: '/clubs/:slug',
    Component: Leaderboard,
    exact: false,
    navigation: false,
    name: ''
  },
  profile: {
    pathname: '/user/:address',
    Component: lazy(() => import('pages/Profile')),
    exact: false,
    navigation: false,
    name: ''
  }
} as const;

export default pages;
