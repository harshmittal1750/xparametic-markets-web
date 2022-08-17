import { useState } from 'react';

import { ArrowDown, ArrowUp } from 'assets/icons/components/vote';

import Text from '../Text';

const initialVotes = 0;

function VoteArrows() {
  const [votes, setVotes] = useState(initialVotes);
  const [sentiment, setSentiment] = useState<
    'neutral' | 'positive' | 'negative'
  >('neutral');

  function handleChangeVote(vote: 'up' | 'down') {
    const newVotes = vote === 'up' ? votes + 1 : votes - 1;
    const newSentiment = vote === 'up' ? 'positive' : 'negative';

    setVotes(newVotes);

    if (newVotes === initialVotes) {
      setSentiment('neutral');
    } else {
      setSentiment(newSentiment);
    }
  }

  return (
    <div className={`pm-c-vote-arrows--normal pm-c-vote-arrows--${sentiment}`}>
      <button
        type="button"
        className="pm-c-button--sm pm-c-button-normal--noborder"
        onClick={() => handleChangeVote('down')}
      >
        <ArrowDown className="pm-c-vote-arrows__down" />
      </button>
      <Text
        className="pm-c-vote-arrows__counter"
        as="span"
        fontWeight="extrabold"
        color="2"
      >
        {votes}
      </Text>
      <button
        type="button"
        className="pm-c-button--sm pm-c-button-normal--noborder"
        onClick={() => handleChangeVote('up')}
      >
        <ArrowUp className="pm-c-vote-arrows__up" />
      </button>
    </div>
  );
}

export default VoteArrows;
