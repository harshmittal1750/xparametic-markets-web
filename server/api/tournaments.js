const { api } = require('./index');

async function getTournamentBySlug(tournamentSlug) {
  const url = `${process.env.REACT_APP_POLKAMARKETS_API_URL}/tournaments/${tournamentSlug}`;
  return api.get(url);
}

module.exports = {
  getTournamentBySlug
};
