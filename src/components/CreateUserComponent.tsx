import React, { useState } from 'react';

interface CreateUserComponentProps {
  onLogin: (user: { username: string; email: string }) => void;
}

const CreateUserComponent: React.FC<CreateUserComponentProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      if (response.ok) {
        alert('User created successfully!');
        onLogin({ username, email }); 
        setUsername('');
        setEmail('');
      } else {
        alert('Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUserComponent;
