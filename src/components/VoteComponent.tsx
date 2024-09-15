import React, { useState } from 'react';
import { Poll } from '../types';

interface VoteComponentProps {
  username: string;
  polls: Poll[];
  fetchPolls: () => void;
}

const VoteComponent: React.FC<VoteComponentProps> = ({ username, polls, fetchPolls }) => {
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});

  const handleVote = async (pollId: number, optionCaption: string) => {
    try {
      const response = await fetch(`http://localhost:8080/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          pollId,
          option: optionCaption,
        }),
      });

      if (response.ok) {
        alert('Vote submitted successfully!');
        fetchPolls();
      } else {
        alert('Failed to submit vote.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div>
      <h2>Vote on Polls</h2>
      {polls.map((poll) => (
        <div key={poll.id}>
          <h3>{poll.question}</h3>
          {poll.voteOptions.map((option, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name={`poll-${poll.id}`}
                value={option.caption}
                checked={selectedOption[poll.id] === option.caption}
                onChange={() =>
                  setSelectedOption({ ...selectedOption, [poll.id]: option.caption })
                }
              />
              <span>{option.caption}</span>
              <span style={{ marginLeft: '10px' }}>
                Votes: {option.votes.length}
              </span>
            </div>
          ))}
          <button
            onClick={() =>
              selectedOption[poll.id]
                ? handleVote(poll.id, selectedOption[poll.id])
                : alert('Please select an option to vote.')
            }
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default VoteComponent;
