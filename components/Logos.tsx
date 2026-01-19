
import React from 'react';

export const Logos: React.FC = () => {
  return (
    <section className="py-12 border-t border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">
          Trusted by high-performance teams globally
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {['Stripe', 'Linear', 'vercel', 'Slack', 'GitHub'].map((brand) => (
            <span key={brand} className="text-2xl font-bold text-gray-600 tracking-tighter">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
