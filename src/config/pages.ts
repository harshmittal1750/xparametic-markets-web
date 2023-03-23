import { lazy } from 'react';

import ui from './ui';

const Leaderboard = lazy(() => import('pages/Leaderboard'));
const pages = {
  profile: {
    pathname: '/user/:address',
    Component: lazy(() => import('pages/Profile')),
    exact: false,
    navigation: false,
    name: '',
    meta: null,
    enabled: true
  },
  club: {
    pathname: '/clubs/:slug',
    Component: Leaderboard,
    exact: false,
    navigation: false,
    name: '',
    meta: null,
    enabled: ui.clubs.enabled
  },
  clubs: {
    pathname: '/clubs',
    Component: lazy(() => import('pages/Clubs')),
    exact: true,
    navigation: true,
    name: 'Clubs',
    meta: {
      title: 'Clubs - Illuminate Fantasy League, powered by Polkamarkets',
      description:
        "Build your own Club, league and leaderboard with your friends, against colleagues or around communities. Wear your own logo, tease your clubmates and let all fight to climb the Club's leaderboard.",
      image: `${process.env.PUBLIC_URL}/ifl_meta_clubs.png`
    },
    enabled: ui.clubs.enabled
  },
  leaderboard: {
    pathname: '/leaderboard',
    Component: Leaderboard,
    exact: false,
    navigation: true,
    name: 'Leaderboard',
    meta: {
      title: 'Leaderboard - Illuminate Fantasy League, powered by Polkamarkets',
      description:
        'Rank up higher on the leaderboard and be the #1 forecaster of the Football World Cup. The best global players will earn prizes from the $1500 USD pool, distributed as gift cards.',
      image: `${process.env.PUBLIC_URL}/ifl_meta_leaderboard.png`
    },
    enabled: true
  },
  achievements: {
    pathname: '/achievements',
    Component: lazy(() => import('pages/Achievements')),
    exact: false,
    navigation: true,
    name: 'Achievements',
    meta: {
      title:
        'NFT Achievements - Illuminate Fantasy League, powered by Polkamarkets',
      description:
        'Predict Football World Cup match winners and grab your exclusive NFT Achievements. The Illuminate Fantasy League is a fantasy predictions tournament focused on the 2022 Football World Cup.',
      image: `${process.env.PUBLIC_URL}/ifl_meta_achievements.png`
    },
    enabled: true
  },
  portfolio: {
    pathname: '/portfolio',
    Component: lazy(() => import('pages/Portfolio')),
    exact: false,
    navigation: true,
    name: 'Portfolio',
    meta: {
      title: 'Portfolio - Illuminate Fantasy League, powered by Polkamarkets',
      description:
        'Participate in the Illuminate Fantasy League and compete with your friends, coworkers or other community members. Predict Football World Cup match winners and manage your portfolio outcome shares with a seamless and user friendly page.',
      image: `${process.env.PUBLIC_URL}/ifl_meta_portfolio.png`
    },
    enabled: true
  },
  home: {
    pathname: '/',
    Component: lazy(() => import('pages/Home')),
    exact: false,
    navigation: true,
    name: 'Markets',
    meta: {
      title: 'Polkamarkets - Autonomous Prediction Markets',
      description:
        'Polkamarkets is a DeFi-Powered Prediction Market built for cross-chain information exchange.',
      image: `${process.env.PUBLIC_URL}/polkamarkets_meta.jpg`
    },
    enabled: true,
    pages: {
      create: {
        pathname: '/markets/create',
        Component: lazy(() => import('pages/CreateMarket')),
        exact: false,
        navigation: false,
        name: '',
        meta: null,
        enabled: true
      },
      market: {
        pathname: '/markets/:marketId',
        Component: lazy(() => import('pages/Market')),
        exact: false,
        navigation: false,
        name: '',
        meta: null,
        enabled: true
      }
    }
  }
} as const;

export default pages;
