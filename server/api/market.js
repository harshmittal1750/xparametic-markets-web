const { api } = require('./index');

async function getMarket(marketSlug) {
  const url = `https://api.polkamarkets.com/markets/${marketSlug}`;
  return api.get(url);
}

module.exports = {
  getMarket
};
