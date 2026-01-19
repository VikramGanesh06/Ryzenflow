import React from 'react';
import { Rocket, Building2, Users2, Lock, FileStack, Share2, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';

export const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Solutions Built for Every Team
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            RyzenFlow adapts to your unique needs, whether you're a startup scaling fast or an enterprise managing compliance.
          </p>
        </div>
      </section>

      {/* By Team Type */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">By Team Type</h2>
          <p className="text-lg text-slate-600 text-center mb-16">Choose a solution tailored to your organization</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Startups */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Rocket size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Startups</h3>
              <p className="text-slate-600 mb-6">Fast setup and affordable pricing to secure your growing team.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Quick onboarding in minutes</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Affordable plans starting free</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Easy team expansion</span>
                </div>
              </div>
              <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* Enterprises */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Enterprises</h3>
              <p className="text-slate-600 mb-6">Advanced compliance, audit trails, and dedicated support.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Full audit logs and compliance reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Dedicated account manager</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Custom integrations</span>
                </div>
              </div>
              <button className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* Remote Teams */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Users2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Remote Teams</h3>
              <p className="text-slate-600 mb-6">Secure collaboration across time zones and locations.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Seamless file sharing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Real-time collaboration tools</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Activity tracking and visibility</span>
                </div>
              </div>
              <button className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* IT & Security Teams */}
            <div className="p-8 bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">IT & Security Teams</h3>
              <p className="text-slate-600 mb-6">Access control, logging, and advanced security features.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Granular access control</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Detailed activity logs</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span className="text-slate-700">Security policy enforcement</span>
                </div>
              </div>
              <button className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* By Use Case */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">By Use Case</h2>
          <p className="text-lg text-slate-600 text-center mb-16">Solutions for every business need</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Document Management */}
            <div className="p-8 bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <FileStack size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure Document Management</h3>
              <p className="text-slate-600 mb-6">Organize, version, and control access to sensitive documents with encryption and audit trails.</p>
              <div className="space-y-2 mb-8 text-sm text-slate-700">
                <p>• Central repository for all documents</p>
                <p>• Version history and recovery</p>
                <p>• Compliance-ready audit logs</p>
              </div>
              <button className="text-orange-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* Team Collaboration */}
            <div className="p-8 bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6">
                <Users2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Internal Team Collaboration</h3>
              <p className="text-slate-600 mb-6">Create workspaces for different teams and projects with controlled access and secure communication.</p>
              <div className="space-y-2 mb-8 text-sm text-slate-700">
                <p>• Isolated team workspaces</p>
                <p>• Permission-based access</p>
                <p>• Activity visibility</p>
              </div>
              <button className="text-cyan-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* Client Sharing */}
            <div className="p-8 bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Share2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Client File Sharing</h3>
              <p className="text-slate-600 mb-6">Safely share files with external clients using secure links with expiration dates and download limits.</p>
              <div className="space-y-2 mb-8 text-sm text-slate-700">
                <p>• Time-limited access links</p>
                <p>• Download restrictions</p>
                <p>• No passwords required</p>
              </div>
              <button className="text-green-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* Knowledge Base */}
            <div className="p-8 bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure Knowledge Base</h3>
              <p className="text-slate-600 mb-6">Build an internal knowledge base with secure notes, procedures, and documentation accessible to your team.</p>
              <div className="space-y-2 mb-8 text-sm text-slate-700">
                <p>• Organized note structure</p>
                <p>• Team-wide accessibility</p>
                <p>• Search and discovery</p>
              </div>
              <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Solution?</h2>
          <p className="text-lg text-slate-300 mb-8">Schedule a demo with our team to see how RyzenFlow fits your needs.</p>
          <button className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2">
            Schedule a Demo
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
