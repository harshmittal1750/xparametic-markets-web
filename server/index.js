/* eslint-disable import-helpers/order-imports */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet.frameguard({ action: 'deny' }));

const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');

const { getMarket } = require('./api/market');
const {
  formatMarketMetadata,
  replaceToMetadataTemplate
} = require('./helpers/string');

const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

const defaultMetadata = {
  title: 'Illuminate Fantasy League, Powered By Polkamarkets',
  description:
    'The Illuminate Fantasy League is a prediction marketplace powered by Polkamarkets, made to celebrate the Football World Cup 2022 with the Moonbeam Community. Join now, bring your friends and start placing your World Cup Predictions for every tournament match to win the IFC title!',
  image: '/ifl_meta.jpg'
};

const metadataByPage = {
  achievements: {
    title:
      'NFT Achievements - Illuminate Fantasy League, powered by Polkamarkets',
    description:
      'Predict Football World Cup match winners and grab your exclusive NFT Achievements. The Illuminate Fantasy League is a fantasy predictions tournament focused on the 2022 Football World Cup.',
    image: '/ifl_meta_achievements.png'
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
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }

    return response.send(
      metadataByPageTemplate('achievements', request, htmlData)
    );
  });
});

app.get('/leaderboard/:slug?', (request, response) => {
  fs.readFile(indexPath, 'utf8', async (error, htmlData) => {
    if (error) {
      return response.status(404).end();
    }
    return response.send(
      metadataByPageTemplate('leaderboard', request, htmlData)
    );
  });
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
