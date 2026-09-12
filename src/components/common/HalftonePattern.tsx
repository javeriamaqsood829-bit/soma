import React from 'react';

interface HalftonePatternProps {
  className?: string;
  dotColor?: string;
  size?: number; // width and height in px
  gridCount?: number; // number of dots along each axis
}

export const HalftonePattern: React.FC<HalftonePatternProps> = ({
  className = 'w-36 h-36 md:w-48 md:h-48',
  dotColor = '#FFA500',
  gridCount = 10,
}) => {
  // Generate dots with varying radiuses based on distance from bottom-left (0, height)
  const dots: { cx: number; cy: number; r: number; opacity: number }[] = [];
  const spacing = 100 / gridCount;

  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      const cx = x * spacing + spacing / 2;
      const cy = y * spacing + spacing / 2;

      // Distance from bottom-left corner (0, 100)
      const dx = cx;
      const dy = 100 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Max distance across the 100x100 quadrant
      const maxDist = 95;

      if (dist < maxDist) {
        // Closer to bottom-left -> larger radius
        const factor = 1 - dist / maxDist;
        const r = Math.max(0.6, factor * 3.4);
        const opacity = Math.min(1, Math.max(0.2, factor * 1.1));
        dots.push({ cx, cy, r, opacity });
      }
    }
  }

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill={dotColor}
            opacity={dot.opacity}
          />
        ))}
      </svg>
    </div>
  );
};
