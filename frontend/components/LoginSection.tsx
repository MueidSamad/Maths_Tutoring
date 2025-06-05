import React, { useState } from 'react';

interface LoginSectionProps {
  onLogin: () => void;
}

export const LoginSection: React.FC<LoginSectionProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter username and password.');
      return;
    }
    // In a real app credentials would be verified on the server
    onLogin();
  };

  return (
    <section id="login" aria-labelledby="login-heading">
      <h2 id="login-heading">Member Login</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
          />
        </div>
        {error && (
          <p className="error-message" role="alert" style={{color: '#ffacac'}}>
            {error}
          </p>
        )}
        <button type="submit" className="cta-button" style={{marginTop: '10px'}}>
          Log In
        </button>
      </form>
    </section>
  );
};
