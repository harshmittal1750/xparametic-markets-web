import { Container } from 'ui';

import TournamentsList from './TournamentsList';

function Tournaments() {
  return (
    <Container className="pm-p-leaderboard max-width-screen-xl">
      <div className="pm-p-leaderboard__header">
        <div className="flex-column gap-3">
          <h1 className="heading semibold text-1">Tournaments</h1>
          <p className="tiny medium text-2">
            Compete with your friends, coworkers and community.
          </p>
        </div>
      </div>
      <div className="padding-y-6 bg-2 border-radius-medium border-solid border-1 width-full">
        <TournamentsList />
      </div>
    </Container>
  );
}

export default Tournaments;
