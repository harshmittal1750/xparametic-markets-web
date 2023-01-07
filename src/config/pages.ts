import { lazy } from 'react';

const Leaderboard = lazy(() => import('pages/Leaderboard'));
const pages = {
  home: {
    pathname: '/markets',
    Component: lazy(() => import('pages/Home')),
    exact: false,
    navigation: true,
    name: 'Markets',
    meta: {
      title: 'Illuminate Fantasy League, Powered By Polkamarkets',
      description:
        'The Illuminate Fantasy League is a prediction marketplace powered by Polkamarkets, made to celebrate the Football World Cup 2022 with the Moonbeam Community. Join now, bring your friends and start placing your World Cup Predictions for every tournament match to win the IFC title!',
      image: `${process.env.PUBLIC_URL}/ifl_meta.jpg`
    },
    pages: {
      market: {
        pathname: '/:marketId',
        Component: lazy(() => import('pages/Market/Market')),
        exact: false,
        navigation: false,
        name: '',
        meta: null
      },
      create: {
        pathname: '/create',
        Component: lazy(() => import('pages/CreateMarket')),
        exact: false,
        navigation: false,
        name: '',
        meta: null
      }
    }
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
    }
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
    }
  },
  leaderboard: {
    pathname: '/leaderboard',
    Component: Leaderboard,
    exact: true,
    navigation: true,
    name: 'Leaderboard',
    meta: {
      title: 'Leaderboard - Illuminate Fantasy League, powered by Polkamarkets',
      description:
        'Rank up higher on the leaderboard and be the #1 forecaster of the Football World Cup. The best global players will earn prizes from the $1500 USD pool, distributed as gift cards.',
      image: `${process.env.PUBLIC_URL}/ifl_meta_leaderboard.png`
    }
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
    }
  },
  club: {
    pathname: '/clubs/:slug',
    Component: Leaderboard,
    exact: false,
    navigation: false,
    name: '',
    meta: null
  },
  profile: {
    pathname: '/user/:address',
    Component: lazy(() => import('pages/Profile')),
    exact: false,
    navigation: false,
    name: '',
    meta: null
  }
} as const;

export default pages;
