import React, { useState } from 'react';
import { BookOpen, CreditCard, Shield, Users, MessageCircle, Mail, LifeBuoy, CheckCircle2, ArrowRight } from 'lucide-react';

export const Support: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'billing', label: 'Account & Billing', icon: CreditCard },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'team', label: 'Team Management', icon: Users }
  ];

  const faqItems = {
    'getting-started': [
      {
        q: 'How do I create a new workspace?',
        a: 'Simply sign up for a RyzenFlow account and you\'ll be guided through creating your first workspace. It takes just a few minutes.'
      },
      {
        q: 'Can I invite team members?',
        a: 'Yes! In your workspace settings, go to Team Members and click "Invite." You can set custom permissions for each member.'
      },
      {
        q: 'How do I upload files?',
        a: 'Use the drag-and-drop interface or click the upload button. Files are automatically encrypted and stored securely.'
      },
      {
        q: 'What file types are supported?',
        a: 'RyzenFlow supports all file types including documents, images, videos, and more. No file type restrictions.'
      }
    ],
    'billing': [
      {
        q: 'How do I update my payment method?',
        a: 'Go to Settings > Billing and update your payment method. Your change takes effect on your next billing date.'
      },
      {
        q: 'Can I get an invoice?',
        a: 'Yes, invoices are automatically sent to your email after each payment. You can also download them from your billing history.'
      },
      {
        q: 'What happens if my payment fails?',
        a: 'We\'ll send you notifications and retry the payment. If payment fails, we\'ll suspend your account until it\'s resolved.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'We offer a 30-day money-back guarantee. Contact support within 30 days of your purchase for a full refund.'
      }
    ],
    'security': [
      {
        q: 'Is my data encrypted?',
        a: 'Yes, all data is encrypted with AES-256 encryption in transit and at rest. Only you can access your data.'
      },
      {
        q: 'How secure is RyzenFlow?',
        a: 'We use enterprise-grade security, zero-knowledge architecture, and are GDPR and SOC-2 compliant.'
      },
      {
        q: 'Can you access my files?',
        a: 'No. RyzenFlow uses zero-knowledge encryption, meaning we cannot access your files even if we wanted to.'
      },
      {
        q: 'How is two-factor authentication set up?',
        a: 'Enable 2FA in your account security settings. We support authenticator apps and SMS-based verification.'
      }
    ],
    'team': [
      {
        q: 'How do I change team member permissions?',
        a: 'Go to Team Members, select the member, and adjust their role. Changes take effect immediately.'
      },
      {
        q: 'Can I create multiple workspaces?',
        a: 'Yes, you can create and manage multiple workspaces. Each workspace is completely isolated.'
      },
      {
        q: 'How do I remove a team member?',
        a: 'In Team Members, click the three dots next to the member and select "Remove." They lose access immediately.'
      },
      {
        q: 'What roles are available?',
        a: 'Owner (full control), Admin (manage team and settings), Editor (create and modify), Viewer (read-only).'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get answers to common questions and learn how to make the most of RyzenFlow.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Support Options</h2>
          <p className="text-lg text-slate-600 text-center mb-16">Choose how you want to get help</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Knowledge Base */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Knowledge Base</h3>
              <p className="text-slate-600 text-sm mb-4">Browse articles and tutorials</p>
              <button className="text-blue-600 font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all w-full">
                Explore <ArrowRight size={16} />
              </button>
            </div>

            {/* Live Chat */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-600 text-sm mb-4">Chat with our support team</p>
              <button className="text-emerald-600 font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all w-full">
                Open Chat <ArrowRight size={16} />
              </button>
            </div>

            {/* Email Support */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
                <Mail size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600 text-sm mb-4">support@ryzenflow.com</p>
              <button className="text-purple-600 font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all w-full">
                Send Email <ArrowRight size={16} />
              </button>
            </div>

            {/* System Status */}
            <div className="p-8 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-6">
                <LifeBuoy size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">System Status</h3>
              <p className="text-slate-600 text-sm mb-4">Check uptime and incidents</p>
              <button className="text-orange-600 font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all w-full">
                View Status <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 text-center mb-16">Find answers to common questions</p>

          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-emerald-200'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {faqItems[selectedCategory as keyof typeof faqItems].map((item, idx) => (
              <details
                key={idx}
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 cursor-pointer hover:border-emerald-300 transition-colors"
              >
                <summary className="flex items-center justify-between font-bold text-slate-900">
                  <span>{item.q}</span>
                  <span className="transition-transform group-open:rotate-180 text-emerald-500">▼</span>
                </summary>
                <p className="text-slate-600 mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Still need help?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is ready to assist you.
          </p>
          <button className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2">
            Talk to Support Team
            <ArrowRight size={18} />
          </button>
          <p className="text-slate-400 text-sm mt-6">Average response time: under 2 hours</p>
        </div>
      </section>
    </div>
  );
};
