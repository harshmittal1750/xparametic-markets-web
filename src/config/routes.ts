import { lazy } from 'react';

const Leaderboard = lazy(() => import('pages/Leaderboard'));
const routes = {
  home: {
    pathname: '/',
    Component: lazy(() => import('pages/Home'))
  },
  leaderboard: {
    pathname: '/leaderboard',
    Component: Leaderboard
  },
  clubs: {
    pathname: '/clubs',
    Component: lazy(() => import('pages/Clubs'))
  },
  market: {
    pathname: '/markets',
    Component: lazy(() => import('pages/Market'))
  },
  portfolio: {
    pathname: '/portfolio',
    Component: lazy(() => import('pages/Portfolio'))
  },
  createMarket: {
    pathname: '/market/create',
    Component: lazy(() => import('pages/CreateMarket'))
  },
  achievements: {
    pathname: '/achievements',
    Component: lazy(() => import('pages/Achievements'))
  },
  club: {
    pathname: '/clubs/:slug',
    Component: Leaderboard
  },
  profile: {
    pathname: '/user/:address',
    Component: lazy(() => import('pages/Profile'))
  }
} as const;

export default routes;
