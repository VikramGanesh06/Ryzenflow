
import React from 'react';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">RyzenFlow</span>
            </div>
            <p className="text-gray-500 max-w-xs mb-6 text-sm leading-relaxed">
              The high-performance secure workspace built for modern organizations that value speed and security.
            </p>
            <div className="flex gap-4">
              <Twitter size={20} className="text-gray-400 hover:text-emerald-500 cursor-pointer" />
              <Linkedin size={20} className="text-gray-400 hover:text-emerald-500 cursor-pointer" />
              <Github size={20} className="text-gray-400 hover:text-emerald-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-emerald-600 cursor-pointer">Features</li>
              <li className="hover:text-emerald-600 cursor-pointer">Security</li>
              <li className="hover:text-emerald-600 cursor-pointer">Enterprise</li>
              <li className="hover:text-emerald-600 cursor-pointer">API</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-emerald-600 cursor-pointer">About</li>
              <li className="hover:text-emerald-600 cursor-pointer">Careers</li>
              <li className="hover:text-emerald-600 cursor-pointer">Legal</li>
              <li className="hover:text-emerald-600 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-emerald-600 cursor-pointer">Documentation</li>
              <li className="hover:text-emerald-600 cursor-pointer">Community</li>
              <li className="hover:text-emerald-600 cursor-pointer">Support</li>
              <li className="hover:text-emerald-600 cursor-pointer">Changelog</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <p>© 2024 RyzenFlow Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-600 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
