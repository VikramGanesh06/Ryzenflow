
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Shield, ArrowRight, Loader2, Mail, Lock, X, Github, Chrome, User } from 'lucide-react';

interface AuthFormProps {
  onBack: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Firebase automatically signs in the user after registration
        // We trigger the verification email here
        if (userCredential.user) {
          await sendEmailVerification(userCredential.user);
        }
      }
    } catch (err: any) {
      if (isLogin) {
        setError("Email or password is incorrect");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("User already exists. Please sign in");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50/50 grid-pattern relative">
      <div className="max-w-[440px] w-full bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 pb-4">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-100">
              <Lock size={28} strokeWidth={2} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-[14px] mt-2 leading-relaxed">
              {isLogin ? 'Enter your credentials to access your vault.' : 'Start your secure journey with RyzenFlow today.'}
            </p>
          </div>

          <div className="flex border-b border-gray-100 mb-8">
            <button 
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 pb-4 text-sm font-bold transition-all relative ${isLogin ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              Sign In
              {isLogin && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
            </button>
            <button 
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 pb-4 text-sm font-bold transition-all relative ${!isLogin ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              Sign Up
              {!isLogin && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[12px] font-bold text-gray-500 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <div className="w-5 h-5 bg-gray-200 rounded-full" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-[14px] placeholder:text-gray-400"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[12px] font-bold text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-[14px] placeholder:text-gray-400"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[12px] font-bold text-gray-500">Password</label>
                {isLogin && (
                  <button type="button" className="text-[12px] font-bold text-emerald-600 hover:text-emerald-700">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-[14px] placeholder:text-gray-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#10b981] text-white rounded-xl font-bold text-[15px] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest text-[10px]">OR CONTINUE WITH</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm">
              <Github size={18} />
              GitHub
            </button>
            <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm">
              <Chrome size={18} className="text-red-500" />
              Google
            </button>
          </div>
        </div>

        <div className="bg-gray-50/50 p-6 text-center border-t border-gray-100">
          <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
            By continuing, you agree to RyzenFlow's{' '}
            <button type="button" className="text-emerald-600 hover:underline">Terms of Service</button> and{' '}
            <button type="button" className="text-emerald-600 hover:underline">Privacy Policy</button>.
          </p>
        </div>
      </div>
    </div>
  );
};
