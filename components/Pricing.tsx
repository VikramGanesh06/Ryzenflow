import React, { useState } from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for individuals and small teams',
      features: [
        '2 GB storage',
        'Basic encryption',
        'Personal workspace',
        'Email support',
        'Community access'
      ],
      cta: 'Get Started',
      highlighted: false,
      ctaStyle: 'bg-slate-200 text-slate-900 hover:bg-slate-300'
    },
    {
      name: 'Professional',
      price: { monthly: 2499, yearly: 24990 },
      description: 'For growing teams and collaboration',
      features: [
        '100 GB storage',
        'End-to-end encryption',
        'Unlimited team members',
        'Role-based access control',
        'Activity logs',
        'Priority email support',
        '99.9% uptime SLA'
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      ctaStyle: 'bg-emerald-500 text-white hover:bg-emerald-600'
    },
    {
      name: 'Enterprise',
      price: { monthly: 8299, yearly: 83190 },
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited storage',
        'AES-256 encryption',
        'Advanced security features',
        'Unlimited team members',
        'Complete audit logs',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone & email support',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      highlighted: false,
      ctaStyle: 'bg-slate-900 text-white hover:bg-slate-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. Scale up anytime. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="flex justify-center items-center gap-4 mb-16">
            <span className={`text-sm font-medium ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 bg-slate-300 rounded-full transition-colors"
              style={{ backgroundColor: isYearly ? '#10b981' : '#cbd5e1' }}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              ></div>
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly
              <span className="ml-2 inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl transition-all ${
                  plan.highlighted
                    ? 'bg-white border-2 border-emerald-500 shadow-2xl scale-105 md:scale-110'
                    : 'bg-white border-2 border-slate-200 hover:border-slate-300'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                      <Zap size={16} /> Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 pb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price.monthly === 0 ? (
                      <div>
                        <span className="text-4xl font-bold text-slate-900">Free</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-5xl font-bold text-slate-900">
                          ₹{isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-slate-600 text-sm ml-2">
                          {isYearly ? '/year' : '/month'}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all mb-8 flex items-center justify-center gap-2 ${plan.ctaStyle}`}
                  >
                    {plan.cta}
                    {plan.cta !== 'Contact Sales' && <ArrowRight size={18} />}
                  </button>
                </div>

                <div className="border-t border-slate-200 px-8 py-6">
                  <p className="text-sm font-bold text-slate-900 mb-4">What's included:</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 text-center mb-16">Have questions? We have answers.</p>

          <div className="space-y-6">
            <details className="group border-2 border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-300">
              <summary className="flex items-center justify-between font-bold text-slate-900">
                <span>Can I upgrade my plan later?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.
              </p>
            </details>

            <details className="group border-2 border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-300">
              <summary className="flex items-center justify-between font-bold text-slate-900">
                <span>Is there a contract?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4">
                No, there are no long-term contracts. You can cancel anytime, and your access continues until the end of your billing cycle.
              </p>
            </details>

            <details className="group border-2 border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-300">
              <summary className="flex items-center justify-between font-bold text-slate-900">
                <span>Do you offer discounts for annual billing?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Yes! Annual billing saves you 20% compared to monthly billing. Choose yearly payment during checkout.
              </p>
            </details>

            <details className="group border-2 border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-300">
              <summary className="flex items-center justify-between font-bold text-slate-900">
                <span>What payment methods do you accept?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4">
                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.
              </p>
            </details>

            <details className="group border-2 border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-300">
              <summary className="flex items-center justify-between font-bold text-slate-900">
                <span>Is there a free trial?</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4">
                Professional plan includes a 14-day free trial with full access. No credit card required to start.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
          <p className="text-lg text-slate-600 mb-8">Start your free trial today. No credit card required.</p>
          <button className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2">
            Start Free Trial
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
