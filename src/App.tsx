import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateUserComponent from './components/CreateUserComponent';
import CreatePollComponent from './components/CreatePollComponent';
import VoteComponent from './components/VoteComponent';
import { Poll } from './types'

interface User {
  username: string;
  email: string;
}


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [polls, setPolls] = useState<Poll[]>([]);

  const fetchPolls = async () => {
    try {
      const response = await fetch('http://localhost:8080/polls');
      const data: Poll[] = await response.json();
  
      setPolls(data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };
  

  useEffect(() => {
    if (isAuthenticated) {
      fetchPolls();
    }
  }, [isAuthenticated]);

  const handleLogin = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
          isAuthenticated ? (
            <Navigate to="/polls" replace />
          ) : (
            <CreateUserComponent onLogin={handleLogin} />
          )
        }
        />
        <Route
          path="/polls"
          element={
            isAuthenticated && user ? (
              <div>
                <CreatePollComponent username={user.username} onPollCreated={fetchPolls} />
                <VoteComponent username={user.username} polls={polls} fetchPolls={fetchPolls} />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
