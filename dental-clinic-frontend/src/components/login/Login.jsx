import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccessMessage('');

    // Client-side validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Start loading
    setLoading(true);

    try {
      // SIMULATED API CALL - Replace with actual API later
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful login
      setSuccessMessage('Welcome back! Redirecting...');

      console.log('Login successful!', { email, password, rememberMe });

    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-container">
      {/* Background decoration */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
      <div className="bg-blob bg-blob-3"></div>

      <div className="container">
        <div className="login-box">
          <form className="form" onSubmit={handleSubmit}>
            {/* Logo */}
            <div className="logo">
              <svg className="user" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c-2.1 0-3.2 1.1-4.5 1.1-1.6 0-2.8-1-3.7 0-.9 1-.6 2.8-.3 4.3.4 2.1.9 4.4 1.6 6.4.5 1.5 1 3.2 2.1 3.2 1.2 0 1.3-1.8 1.6-3.4.2-1.2.5-2.4 1.2-2.4s1 1.2 1.2 2.4c.3 1.6.4 3.4 1.6 3.4 1.1 0 1.6-1.7 2.1-3.2.7-2 1.2-4.3 1.6-6.4.3-1.5.6-3.3-.3-4.3-.9-1-2.1 0-3.7 0C15.2 4.1 14.1 3 12 3z"/>
              </svg>
            </div>

            {/* Header */}
            <span className="header">Welcome back</span>
            <span className="sub-header">Sign in to manage your appointments and care</span>

            {/* Signature divider — quiet smile arc */}
            <div className="smile-divider" aria-hidden="true">
              <svg viewBox="0 0 84 14" fill="none">
                <path d="M2 2 C 28 14, 56 14, 82 2" stroke="url(#smileGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="smileGradient" x1="0" y1="0" x2="84" y2="0">
                    <stop offset="0" stopColor="#BDDBD1" />
                    <stop offset="1" stopColor="#C7E7EC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <label className="input-label">Email address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="remember-forgot">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="button sign-in"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" aria-label="Signing in"></span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
