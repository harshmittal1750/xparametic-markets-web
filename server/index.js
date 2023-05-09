/* eslint-disable import-helpers/order-imports */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet.frameguard({ action: 'deny' }));

const port = process.env.PORT || 5000;
const isClubsEnabled =
  process.env.REACT_APP_FEATURE_CLUBS?.toLowerCase() === 'true';
const isAchievementsEnabled =
  process.env.REACT_APP_FEATURE_ACHIEVEMENTS?.toLowerCase() === 'true';

const fs = require('fs');
const path = require('path');

const { getMarket } = require('./api/market');
const { getLeaderboardGroupBySlug } = require('./api/group_leaderboards');
const {
  formatMarketMetadata,
  replaceToMetadataTemplate
} = require('./helpers/string');

const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

const defaultMetadata = {
  title: 'Polkamarkets - Autonomous Prediction Markets',
  description:
    'Polkamarkets is a DeFi-Powered Prediction Market built for cross-chain information exchange.',
  image: '/polkamarkets_meta.jpg'
};

const metadataByPage = {
  achievements: {
    title:
      'NFT Achievements - Illuminate Fantasy League, powered by Polkamarkets',
    description:
      'Predict Football World Cup match winners and grab your exclusive NFT Achievements. The Illuminate Fantasy League is a fantasy predictions tournament focused on the 2022 Football World Cup.',
    image: '/ifl_meta_achievements.png'
  },
  clubs: {
    title: 'Clubs - Illuminate Fantasy League, powered by Polkamarkets',
    description:
      "Build your own Club, league and leaderboard with your friends, against colleagues or around communities. Wear your own logo, tease your clubmates and let all fight to climb the Club's leaderboard.",
    image: '/ifl_meta_clubs.png'
  },
  leaderboard: {
    title: 'Leaderboard - Illuminate Fantasy League, powered by Polkamarkets',
    description:
      'Rank up higher on the leaderboard and be the #1 forecaster of the Football World Cup. The best global players will earn prizes from the $1500 USD pool, distributed as gift cards.',
    image: '/ifl_meta_leaderboard.png'
  },
  portfolio: {
    title: 'Portfolio - Illuminate Fantasy League, powered by Polkamarkets',
    description:
      'Participate in the Illuminate Fantasy League and compete with your friends, coworkers or other community members. Predict Football World Cup match winners and manage your portfolio outcome shares with a seamless and user friendly page.',
    image: '/ifl_meta_portfolio.png'
  }
};

const defaultMetadataTemplate = (request, htmlData) => {
  return replaceToMetadataTemplate({
    htmlData,
    url: `${request.headers['x-forwarded-proto'] || 'http'}://${
      request.headers.host
    }${request.url}`,
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    image: `${request.headers['x-forwarded-proto'] || 'http'}://${
      request.headers.host
    }${defaultMetadata.image}`
  });
};

const metadataByPageTemplate = (page, request, htmlData) => {
  const metadata = metadataByPage[page];

  return replaceToMetadataTemplate({
    htmlData,
    url: `${request.headers['x-forwarded-proto'] || 'http'}://${
      request.headers.host
    }${request.url}`,
    title: metadata.title,
    description: metadata.description,
    image: `${request.headers['x-forwarded-proto'] || 'http'}://${
      request.headers.host
    }${metadata.image}`
  });
};

app.get('/', (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    return response.send(defaultMetadataTemplate(request, htmlData));
  });
});

app.get('/portfolio', (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }
    return response.send(
      metadataByPageTemplate('portfolio', request, htmlData)
    );
  });
});

app.get('/achievements', (request, response) => {
  if (!isAchievementsEnabled) {
    next();
    return;
  }

  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    return response.send(
      metadataByPageTemplate('achievements', request, htmlData)
    );
  });
});

app.get('/clubs', (request, response, next) => {
  if (!isClubsEnabled) {
    next();
    return;
  }

  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }
    return response.send(metadataByPageTemplate('clubs', request, htmlData));
  });
});

app.get('/clubs/:slug', async (request, response, next) => {
  if (!isClubsEnabled) {
    next();
    return;
  }

  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    const groupSlug = request.params.slug;

    try {
      const leaderboardGroup = await getLeaderboardGroupBySlug(groupSlug);
      const { title, bannerUrl } = leaderboardGroup.data;

      return response.send(
        replaceToMetadataTemplate({
          htmlData,
          url: `${request.headers['x-forwarded-proto'] || 'http'}://${
            request.headers.host
          }/clubs/${request.params.slug}`,
          title:
            `${title} - Illuminate Fantasy League` || defaultMetadata.title,
          description:
            metadataByPage.clubs.description || defaultMetadata.description,
          image:
            bannerUrl ||
            `${request.headers['x-forwarded-proto'] || 'http'}://${
              request.headers.host
            }${defaultMetadata.image}`
        })
      );
    } catch (e) {
      return response.send(defaultMetadataTemplate(request, htmlData));
    }
  });
});

app.get('/leaderboard', (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }
    return response.send(
      metadataByPageTemplate('leaderboard', request, htmlData)
    );
  });
});

app.get('/leaderboard/:slug', async (request, response, next) => {
  if (!isClubsEnabled) {
    next();
    return;
  }

  response.redirect(`/clubs/${request.params.slug}`);
});

app.get('/user/:address', (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    return response.send(defaultMetadataTemplate(request, htmlData));
  });
});

app.get('/market/create', (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    return response.send(defaultMetadataTemplate(request, htmlData));
  });
});

app.get('/markets/:slug', async (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    const marketSlug = request.params.slug;

    try {
      const market = await getMarket(marketSlug);
      const { title, category, subcategory, expiresAt, bannerUrl } =
        market.data;

      const marketMetadata = formatMarketMetadata({
        title,
        category,
        subcategory,
        expiresAt,
        bannerUrl
      });

      return response.send(
        replaceToMetadataTemplate({
          htmlData,
          url: `${request.headers['x-forwarded-proto'] || 'http'}://${
            request.headers.host
          }/markets/${request.params.slug}`,
          title: marketMetadata.title || defaultMetadata.title,
          description:
            marketMetadata.description || defaultMetadata.description,
          image:
            marketMetadata.image ||
            `${request.headers['x-forwarded-proto'] || 'http'}://${
              request.headers.host
            }${defaultMetadata.image}`
        })
      );
    } catch (e) {
      return response.send(defaultMetadataTemplate(request, htmlData));
    }
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (_request, response) => {
  response.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
