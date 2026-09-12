import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { IconRenderer } from '../common/IconRenderer';

export const ResultsBar: React.FC = () => {
  const { results } = usePortfolio();

  if (!results || results.length === 0) return null;

  return (
    <section id="results" className="relative py-16 bg-[#0a0a0a] border-y border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-neutral-850">
          {results.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex flex-col items-start ${
                index > 0 ? 'pt-6 sm:pt-0 lg:pl-8' : ''
              } group`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FF6B00] group-hover:border-[#FF6B00]/40 group-hover:scale-105 transition-all">
                  <IconRenderer name={item.icon || 'TrendingUp'} className="w-5 h-5 text-[#FF6B00]" />
                </div>
                <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline">
                  {item.prefix && <span className="text-[#FF6B00] text-3xl mr-0.5">{item.prefix}</span>}
                  {item.number}
                  {item.suffix && <span className="text-[#F59E0B] text-3xl ml-0.5">{item.suffix}</span>}
                </span>
              </div>
              <h2 className="text-base font-bold text-neutral-200 tracking-tight mb-1">
                {item.label}
              </h2>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
