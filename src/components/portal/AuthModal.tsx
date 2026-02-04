
import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    company: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      const result = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        company: formData.company
      });

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Registration failed');
      }
    } else {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Login failed');
      }
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111111] border border-[#d4af37]/30 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#111111] border-b border-[#d4af37]/20 p-4 flex justify-between items-center">
          <h2 className="font-playfair text-xl font-semibold text-white">
            {mode === 'login' ? 'Client Portal Login' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder="Your full name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Password *</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Company/Organization</label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/30 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    placeholder="Company name (optional)"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>

          <div className="text-center pt-4 border-t border-[#d4af37]/20">
            {mode === 'login' ? (
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); }}
                  className="text-[#d4af37] hover:text-[#f4d03f] font-medium"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-[#d4af37] hover:text-[#f4d03f] font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {mode === 'login' && (
            <p className="text-gray-500 text-xs text-center">
              Demo: demo@example.com / demo123
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
