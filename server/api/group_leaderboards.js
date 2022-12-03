const { api } = require('./index');

async function getLeaderboardGroupBySlug(groupSlug) {
  const url = `${process.env.REACT_APP_POLKAMARKETS_API_URL}/group_leaderboards/${groupSlug}`;
  return api.get(url);
}

module.exports = {
  getLeaderboardGroupBySlug
};
