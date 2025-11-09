import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simple password for now - you can change this!
  const ADMIN_PASSWORD = 'heritage2025'; // Change this to your secure password

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Store admin session
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminLoginTime', Date.now());
      navigate('/admin/qr-generator');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nepal-red/5 to-nepal-blue/5 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-nepal-red to-nepal-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600">Enter password to access QR Generator</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nepal-red/50 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg"
          >
            Access Admin Panel
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-nepal-red transition"
          >
            ← Back to Home
          </button>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-xs text-gray-600">
            <strong>For Site Administrators:</strong> Use this panel to generate QR codes for heritage sites.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
