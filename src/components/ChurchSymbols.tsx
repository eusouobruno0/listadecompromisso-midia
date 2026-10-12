import React from 'react';

export const AgapeLogo: React.FC<{ className?: string; subtitle?: boolean }> = ({
  className = '',
  subtitle = true,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-1.5 font-bold tracking-tight text-[#2A2418]">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#2A2418]">
          ágape<span className="text-[#62723A]">.</span>
        </span>
      </div>
      {subtitle && (
        <span className="text-xs sm:text-sm font-normal italic text-[#B8862E] -mt-0.5 tracking-wide">
          lugar de amar &amp; cuidar
        </span>
      )}
    </div>
  );
};

export const WheatIcon: React.FC<{ className?: string; width?: number; height?: number }> = ({
  className = 'text-[#B8862E]',
  width = 24,
  height = 24,
}) => (
  <svg
    viewBox="0 0 40 170"
    width={width}
    height={height}
    className={`inline-block ${className}`}
    fill="currentColor"
  >
    <path
      d="M20 170 Q18 100 20 18"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
    />
    <ellipse cx="20" cy="14" rx="3.5" ry="9" />
    <ellipse cx="13" cy="30" rx="3.6" ry="9.5" transform="rotate(-28 13 30)" />
    <ellipse cx="27" cy="30" rx="3.6" ry="9.5" transform="rotate(28 27 30)" />
    <ellipse cx="13" cy="46" rx="3.6" ry="9.5" transform="rotate(-28 13 46)" />
    <ellipse cx="27" cy="46" rx="3.6" ry="9.5" transform="rotate(28 27 46)" />
    <ellipse cx="13" cy="62" rx="3.6" ry="9.5" transform="rotate(-28 13 62)" />
    <ellipse cx="27" cy="62" rx="3.6" ry="9.5" transform="rotate(28 27 62)" />
    <ellipse cx="13" cy="78" rx="3.6" ry="9.5" transform="rotate(-28 13 78)" />
    <ellipse cx="27" cy="78" rx="3.6" ry="9.5" transform="rotate(28 27 78)" />
  </svg>
);

export const SeedIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#62723A]',
  size = 24,
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`inline-block ${className}`}
    fill="currentColor"
  >
    <path
      d="M16 29V16"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <path d="M16 17C16 10 21 6 28 6C28 13 23 17 16 17Z" fill="currentColor" />
    <path
      d="M16 21C16 15 12 11 5 11C5 17 9 21 16 21Z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

export const SheepIcon: React.FC<{ className?: string; size?: number; animated?: boolean }> = ({
  className = '',
  size = 40,
  animated = true,
}) => (
  <svg
    viewBox="0 0 120 90"
    width={size}
    height={(size * 3) / 4}
    className={`inline-block select-none overflow-visible ${animated ? 'animate-sheep' : ''} ${className}`}
  >
    {/* Patinhas */}
    <g fill="#2a2622">
      <rect x="40" y="62" width="6" height="22" rx="3" />
      <rect x="52" y="64" width="6" height="22" rx="3" />
      <rect x="70" y="64" width="6" height="22" rx="3" />
      <rect x="82" y="62" width="6" height="22" rx="3" />
    </g>

    {/* Rabinho que abana */}
    <g className={animated ? 'animate-sheep-tail' : ''}>
      <circle cx="26" cy="46" r="6.5" fill="#F2EAD8" stroke="#D3C7B2" strokeWidth="0.8" />
    </g>

    {/* Lã do Corpo */}
    <g fill="#F2EAD8" stroke="#D3C7B2" strokeWidth="0.8">
      <circle cx="40" cy="42" r="18" />
      <circle cx="60" cy="32" r="20" />
      <circle cx="80" cy="40" r="18" />
      <circle cx="50" cy="56" r="17" />
      <circle cx="72" cy="56" r="17" />
      <circle cx="32" cy="54" r="13" />
      <circle cx="88" cy="54" r="13" />
    </g>

    {/* Cabeça da ovelha com animação de mastigar/pastar e olhar */}
    <g className={animated ? 'animate-sheep-head' : ''}>
      <ellipse cx="100" cy="44" rx="12" ry="15" fill="#2a2622" />

      {/* Orelhinha com animação de mexer */}
      <ellipse
        cx="92"
        cy="34"
        rx="7"
        ry="3.5"
        fill="#2a2622"
        transform="rotate(-25 92 34)"
        className={animated ? 'animate-sheep-ear' : ''}
      />

      {/* Olho com brilho simpático */}
      <circle cx="104" cy="41" r="2.2" fill="#f2ead8" />
      <circle cx="104.6" cy="40.4" r="0.8" fill="#ffffff" />
    </g>
  </svg>
);

export const HillsVector: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      className="w-full h-16 sm:h-24 md:h-28 block opacity-85"
    >
      <path
        fill="#D6D8AE"
        opacity="0.65"
        d="M0,80 C320,40 640,110 960,60 C1200,30 1340,75 1440,55 L1440,180 L0,180Z"
      />
      <path
        fill="#C2C993"
        opacity="0.8"
        d="M0,110 C260,85 520,130 780,105 C1040,80 1280,120 1440,100 L1440,180 L0,180Z"
      />
      <path
        fill="#AAB57A"
        opacity="0.9"
        d="M0,140 C280,125 560,155 840,135 C1120,115 1300,145 1440,135 L1440,180 L0,180Z"
      />
    </svg>
  </div>
);
