const { api } = require('./index');

async function getLeaderboardGroupBySlug(groupSlug) {
  const url = `https://api.polkamarkets.com/group_leaderboards/${groupSlug}`;
  return api.get(url);
}

module.exports = {
  getLeaderboardGroupBySlug
};
