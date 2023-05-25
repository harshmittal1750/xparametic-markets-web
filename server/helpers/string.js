const { toUTC } = require('./datetime');

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function formatMarketMetadata({
  title,
  category,
  subcategory,
  expiresAt,
  bannerUrl
}) {
  return {
    title,
    description: `${capitalize(category)} / ${capitalize(
      subcategory
    )} - Market closes on ${toUTC(expiresAt, 'YYYY/MM/DD')}`,
    image: bannerUrl
  };
}

function replaceToMetadataTemplate({
  htmlData,
  url,
  title,
  description,
  image
}) {
  return htmlData
    .replace(
      '<title>Polkamarkets - Autonomous Prediction Markets</title>',
      `<title>${title}</title>`
    )
    .replace('__META_TITLE__', title)
    .replace('__META_DESCRIPTION__', description)
    .replace('__META_OG_URL__', url)
    .replace('__META_OG_TITLE__', title)
    .replace('__META_OG_DESCRIPTION__', description)
    .replace('__META_OG_IMAGE__', image)
    .replace('__META_TWITTER_URL__', url)
    .replace('__META_TWITTER_TITLE__', title)
    .replace('__META_TWITTER_DESCRIPTION__', description)
    .replace('__META_TWITTER_IMAGE__', image);
}

module.exports = {
  formatMarketMetadata,
  replaceToMetadataTemplate
};
