import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LearnMoreButtonProps {
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
}

export const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({
  text = 'Learn More',
  onClick,
  href,
  className = '',
  iconClassName = '',
  ariaLabel,
}) => {
  const content = (
    <>
      <span className="font-bold text-black text-sm tracking-tight">{text}</span>
      <span className={`w-8 h-8 rounded-full bg-black flex items-center justify-center text-[#FFA500] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 ${iconClassName}`}>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </span>
    </>
  );

  const baseClasses =
    'inline-flex items-center gap-3.5 pl-6 pr-1.5 py-1.5 rounded-full bg-[#FFA500] hover:bg-[#FF9900] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#FFA500]/20 group cursor-pointer';

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel || text}
        className={`${baseClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || text}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
};
