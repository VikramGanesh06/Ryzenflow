
import React from 'react';
import { Play, ArrowRight, FileText, Cloud } from 'lucide-react';

interface HeroProps {
  onAuthClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAuthClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-0 overflow-hidden hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 bg-white text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          SECURE STORAGE · BUILT FOR TEAMS
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-[84px] font-extrabold tracking-tight text-gray-900 mb-8 max-w-5xl mx-auto leading-[1.05]">
          The secure workspace for <br />
          <span className="text-[#10b981]">modern teams</span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          RyzenFlow securely manages assets, controls permissions, and scales your organization with enterprise-grade protection.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
          <button 
            onClick={onAuthClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#10b981] text-white rounded-full font-bold text-base hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-emerald-500/20"
          >
            Get Started Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 border border-gray-100 rounded-full font-bold text-base hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-500">
              <Play size={10} fill="currentColor" />
            </div>
            View Demo
          </button>
        </div>

        {/* Canvas / Preview Area */}
        <div className="relative max-w-5xl mx-auto mt-10">
          <div className="relative rounded-t-[40px] border-x border-t border-gray-100 bg-white grid-pattern pt-20 pb-40 px-10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.05)] min-h-[500px]">
            {/* Minimal floating elements to simulate the Canvas */}
            <div className="absolute top-1/3 left-1/4 p-4 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-xl flex items-center justify-center text-gray-400 hover:scale-110 transition-transform cursor-pointer">
              <FileText size={24} strokeWidth={1.5} />
            </div>
            <div className="absolute top-1/2 right-1/4 p-4 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-xl flex items-center justify-center text-gray-400 hover:scale-110 transition-transform cursor-pointer">
              <Cloud size={24} strokeWidth={1.5} />
            </div>
            
            <div className="w-full h-full flex flex-col items-center justify-center opacity-20 pointer-events-none">
               <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full mb-4"></div>
               <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
            </div>

            {/* Fading bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
