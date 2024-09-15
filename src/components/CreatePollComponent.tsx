import React, { useState } from 'react';

interface CreatePollComponentProps {
  username: string;
  onPollCreated: () => void;
}

const CreatePollComponent: React.FC<CreatePollComponentProps> = ({ username, onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']); 

  const handleAddOption = () => setOptions([...options, '']);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) => (i === index ? value : option));
    setOptions(updatedOptions);
  };

  const handleCreatePoll = async () => {
    if (!question || options.some((option) => !option.trim())) {
      alert('Please fill in the question and all options.');
      return;
    }

    // Prepare voteOptions array
    const voteOptions = options.map((caption) => ({ caption, votes: [] }));

    try {
      const response = await fetch('http://localhost:8080/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: null, 
          username,
          question,
          publishedAt: new Date().toISOString(),
          validUntil: new Date(Date.now() + 3600 * 1000).toISOString(), 
          voteOptions,
        }),
      });

      if (response.ok) {
        alert('Poll created successfully!');
        setQuestion('');
        setOptions(['', '']);
        onPollCreated();
      } else {
        alert('Failed to create poll.');
      }
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div>
      <h2>Create Poll</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Poll Question"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <button onClick={handleAddOption}>Add Option</button>
      <button onClick={handleCreatePoll}>Create Poll</button>
    </div>
  );
};

export default CreatePollComponent;
