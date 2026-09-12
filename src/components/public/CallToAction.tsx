import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#14100c] border border-neutral-800/90 overflow-hidden shadow-2xl text-center flex flex-col items-center">
          
          {/* Ambient Orange Aura */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none mb-6 max-w-3xl">
            READY TO SCALE YOUR DIGITAL PRESENCE & REVENUE?
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10">
            Whether you need a complete multichannel growth overhaul, high-converting social campaigns, or high-intent SEO domination, let's architect a solution tailored to your goals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              id="cta-start-project-btn"
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-[#FF6B00]/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Schedule a Strategy Discovery</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
