
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Mail, ArrowRight, Shield, LogOut } from 'lucide-react';

interface VerificationPendingProps {
  email: string;
}

export const VerificationPending: React.FC<VerificationPendingProps> = ({ email }) => {
  const handleBackToLogin = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50/50 grid-pattern relative">
      <div className="max-w-[440px] w-full bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden p-8">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-100">
            <Mail size={28} strokeWidth={2} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Verify your email</h2>
          <p className="text-gray-500 text-[14px] mt-4 leading-relaxed">
            We have sent you a verification email to <span className="font-bold text-gray-900">{email}</span>. <br/>
            Please verify it and log in.
          </p>
        </div>

        <button
          onClick={handleBackToLogin}
          className="w-full py-4 bg-[#10b981] text-white rounded-xl font-bold text-[15px] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 group"
        >
          Login
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
        </button>

        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
          <p className="text-[11px] text-gray-400 font-medium">
            Already verified? Try refreshing or logging in again.
          </p>
        </div>
      </div>
    </div>
  );
};
