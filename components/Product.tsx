import React from 'react';
import { Lock, Shield, Users, FileText, BarChart3, Cloud, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Product: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Everything You Need to Secure, Store, and Collaborate
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            RyzenFlow is a secure cloud workspace designed for teams to collaborate confidently. Store files, organize notes, and manage access with enterprise-grade encryption.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Features</h2>
            <p className="text-lg text-slate-600">Everything you need to protect and manage your digital assets</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Secure File Vault</h3>
              <p className="text-slate-600">End-to-end encryption with AES-256 standard keeps your files safe from unauthorized access.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Role-Based Access</h3>
              <p className="text-slate-600">Define custom permissions and control who has access to which files and features.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Team Workspaces</h3>
              <p className="text-slate-600">Create isolated workspaces for different teams and manage collaboration seamlessly.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Notes</h3>
              <p className="text-slate-600">Create and organize encrypted notes with full collaboration and version history.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Activity Logs & Audits</h3>
              <p className="text-slate-600">Track all actions with detailed logs for compliance and security monitoring.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Cloud size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Cloud Sync & Backup</h3>
              <p className="text-slate-600">Automatic synchronization and redundant backups ensure your data is always available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Create Workspace</h3>
                <p className="text-slate-600">Sign up and create your first secure workspace in under 2 minutes.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-0.5 bg-emerald-200"></div>
                <ArrowRight className="absolute top-1/2 -translate-y-1/2 left-0.5 text-emerald-200" size={20} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Upload & Organize</h3>
                <p className="text-slate-600">Drag and drop files, create folders, and organize your digital assets.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-0.5 bg-emerald-200"></div>
                <ArrowRight className="absolute top-1/2 -translate-y-1/2 left-0.5 text-emerald-200" size={20} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Collaborate Securely</h3>
                <p className="text-slate-600">Invite team members and control access with granular permissions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Security & Compliance</h2>
            <p className="text-lg text-slate-300">Enterprise-grade protection for your peace of mind</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <Lock className="text-emerald-400 mb-6" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">AES-256 Encryption</h3>
              <p className="text-slate-300">Military-grade encryption standard protects all your data at rest and in transit.</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <Shield className="text-emerald-400 mb-6" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Zero-Knowledge Architecture</h3>
              <p className="text-slate-300">We cannot access your data. Only you and authorized team members can.</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <CheckCircle2 className="text-emerald-400 mb-6" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">GDPR & SOC-2 Ready</h3>
              <p className="text-slate-300">Compliant with global data protection and security standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Protect Your Digital Assets Today</h2>
          <p className="text-lg text-slate-600 mb-8">Join thousands of teams who trust RyzenFlow with their sensitive data.</p>
          <button className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2">
            Start Your Free Trial
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
