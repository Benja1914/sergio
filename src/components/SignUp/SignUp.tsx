import React, { useState } from 'react';

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Signup attempt:', { email, username, password });
  };

  return (
    <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-md rounded-3xl border border-slate-700/60 p-8 shadow-2xl">
      <h1 className="text-3xl font-semibold text-white text-center mb-8">Signup</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full px-4 py-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 mt-8 bg-transparent border-2 border-white/90 rounded-full text-white font-medium text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignupComponent;