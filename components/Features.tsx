
import React from 'react';
import { Shield, Key, Users, Globe, Database, Cpu } from 'lucide-react';

const features = [
  {
    title: 'Enterprise Security',
    description: 'Military-grade encryption for every single file and communication channel in your workspace.',
    icon: <Shield className="text-emerald-500" />
  },
  {
    title: 'Granular Access',
    description: 'Define precise permissions for every user, ensuring the right people have the right access.',
    icon: <Key className="text-emerald-500" />
  },
  {
    title: 'Team Collaboration',
    description: 'Work together in real-time with zero latency. Seamless editing and instant sync.',
    icon: <Users className="text-emerald-500" />
  },
  {
    title: 'Global Compliance',
    description: 'Fully compliant with GDPR, SOC2, and HIPAA. We handle the complexity for you.',
    icon: <Globe className="text-emerald-500" />
  },
  {
    title: 'Asset Vault',
    description: 'A dedicated, highly-secure vault for your most sensitive digital assets.',
    icon: <Database className="text-emerald-500" />
  },
  {
    title: 'Scalable Infra',
    description: 'Built on high-performance architecture that scales with your organization needs.',
    icon: <Cpu className="text-emerald-500" />
  }
];

export const Features: React.FC = () => {
  return (
    <section id="product" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Powerful protection, <span className="text-emerald-600">effortless use</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to manage your organization securely in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-emerald-100 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-50/50">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
