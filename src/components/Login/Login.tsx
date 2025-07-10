import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { loginUser } from '@/store/auth/thunk';
import { AuthService } from '@/services/auth.service';

interface LoginComponentProps {
  onLoginSuccess?: (user: any) => void;
  onClose?: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const storeError = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async () => {
    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    setLocalError('');

    try {
      await dispatch(loginUser({ email, password }));
      
      // Notificar al componente padre (mantener compatibilidad)
      if (onLoginSuccess) {
        onLoginSuccess({ email }); // You may want to adjust this to pass the correct user data
      }
      
      if (onClose) {
        onClose();
      }
      
      console.log('Login successful');
    } catch (error: any) {
      console.error('Login error:', error);
      setLocalError(error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-md rounded-3xl border border-slate-700/60 p-8 shadow-2xl">
      <h1 className="text-3xl font-semibold text-white text-center mb-8">Login</h1>
      
      {(localError || storeError) && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
          <p className="text-red-300 text-sm text-center">{localError || storeError}</p>
        </div>
      )}
      
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
          disabled={isLoading}
          className="w-full py-4 mt-8 bg-transparent border-2 border-white/90 rounded-full text-white font-medium text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;