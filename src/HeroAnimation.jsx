export default function HeroAnimation() {
  return (
    <svg
      viewBox="0 0 500 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    >
      <defs>
        <filter id="stampBlur">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>
      </defs>

      {/* ─── PARTICLES ─── */}
      {[
        { x: 60, delay: '0s', dur: '7s', size: 2 },
        { x: 150, delay: '1.5s', dur: '8s', size: 2 },
        { x: 250, delay: '0.8s', dur: '6s', size: 3 },
        { x: 350, delay: '2s', dur: '9s', size: 2 },
        { x: 430, delay: '0.3s', dur: '7.5s', size: 2 },
        { x: 100, delay: '3s', dur: '7s', size: 2 },
        { x: 380, delay: '1.8s', dur: '8.5s', size: 2 },
      ].map((p, i) => (
        <rect
          key={`particle-${i}`}
          x={p.x}
          y={200}
          width={p.size}
          height={p.size}
          rx={p.size > 2 ? 0 : p.size}
          fill="white"
          opacity="0.12"
          className="hero-particle"
          style={{ animationDelay: p.delay, animationDuration: p.dur }}
        />
      ))}

      {/* ─── FLOATING DOCUMENT 1 ─── */}
      <g className="hero-float" style={{ animationDelay: '0s' }}>
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="80" height="105" rx="5" fill="white" stroke="#1E40AF" strokeWidth="1.2" opacity="0.55" />
          <line x1="10" y1="18" x2="70" y2="18" stroke="#1E40AF" strokeWidth="1.2" opacity="0.25" />
          <line x1="10" y1="28" x2="58" y2="28" stroke="#1E40AF" strokeWidth="1.2" opacity="0.25" />
          <line x1="10" y1="38" x2="65" y2="38" stroke="#1E40AF" strokeWidth="1.2" opacity="0.25" />
          <line x1="10" y1="48" x2="48" y2="48" stroke="#1E40AF" strokeWidth="1.2" opacity="0.25" />
          <line x1="10" y1="58" x2="60" y2="58" stroke="#1E40AF" strokeWidth="1.2" opacity="0.25" />
          <circle cx="62" cy="85" r="11" fill="none" stroke="#1E40AF" strokeWidth="1.2" opacity="0.2" />
          <circle cx="62" cy="85" r="7" fill="none" stroke="#1E40AF" strokeWidth="0.6" opacity="0.15" />
        </g>
      </g>

      {/* ─── FLOATING DOCUMENT 2 ─── */}
      <g className="hero-float" style={{ animationDelay: '1.2s' }}>
        <g transform="translate(130, 10)">
          <rect x="0" y="0" width="90" height="110" rx="5" fill="white" stroke="#1E40AF" strokeWidth="1.2" opacity="0.7" />
          <rect x="0" y="0" width="90" height="20" rx="5" fill="#1E40AF" opacity="0.08" />
          <rect x="0" y="12" width="90" height="8" fill="#1E40AF" opacity="0.08" />
          <line x1="10" y1="11" x2="50" y2="11" stroke="#1E40AF" strokeWidth="1.5" opacity="0.3" />
          <line x1="10" y1="32" x2="80" y2="32" stroke="#1E40AF" strokeWidth="1.2" opacity="0.2" />
          <line x1="10" y1="42" x2="68" y2="42" stroke="#1E40AF" strokeWidth="1.2" opacity="0.2" />
          <line x1="10" y1="52" x2="75" y2="52" stroke="#1E40AF" strokeWidth="1.2" opacity="0.2" />
          <line x1="10" y1="62" x2="55" y2="62" stroke="#1E40AF" strokeWidth="1.2" opacity="0.2" />
          <line x1="10" y1="72" x2="65" y2="72" stroke="#1E40AF" strokeWidth="1.2" opacity="0.2" />
          <circle cx="70" cy="92" r="10" fill="none" stroke="#1E40AF" strokeWidth="1.2" opacity="0.25" />
        </g>
      </g>

      {/* ─── FLOATING DOCUMENT 3 ─── */}
      <g className="hero-float" style={{ animationDelay: '2.4s' }}>
        <g transform="translate(380, 30)">
          <rect x="0" y="0" width="75" height="95" rx="5" fill="white" stroke="#1E40AF" strokeWidth="1" opacity="0.45" />
          <line x1="10" y1="16" x2="65" y2="16" stroke="#1E40AF" strokeWidth="1" opacity="0.2" />
          <line x1="10" y1="26" x2="52" y2="26" stroke="#1E40AF" strokeWidth="1" opacity="0.2" />
          <line x1="10" y1="36" x2="58" y2="36" stroke="#1E40AF" strokeWidth="1" opacity="0.2" />
          <line x1="10" y1="46" x2="42" y2="46" stroke="#1E40AF" strokeWidth="1" opacity="0.2" />
          <circle cx="56" cy="74" r="10" fill="none" stroke="#1E40AF" strokeWidth="1" opacity="0.18" />
        </g>
      </g>

      {/* ─── SIGNATURE DOCUMENT (center) ─── */}
      <g transform="translate(240, 50)">
        <rect x="0" y="0" width="130" height="100" rx="5" fill="white" stroke="#1E40AF" strokeWidth="1.5" opacity="0.9" />
        <rect x="0" y="0" width="130" height="18" rx="5" fill="#1E40AF" opacity="0.07" />
        <rect x="0" y="10" width="130" height="8" fill="#1E40AF" opacity="0.07" />
        <line x1="10" y1="10" x2="55" y2="10" stroke="#1E40AF" strokeWidth="1.5" opacity="0.3" />
        <line x1="10" y1="28" x2="120" y2="28" stroke="#1E40AF" strokeWidth="1" opacity="0.15" />
        <line x1="10" y1="36" x2="105" y2="36" stroke="#1E40AF" strokeWidth="1" opacity="0.15" />
        <line x1="10" y1="44" x2="115" y2="44" stroke="#1E40AF" strokeWidth="1" opacity="0.15" />
        <line x1="10" y1="52" x2="90" y2="52" stroke="#1E40AF" strokeWidth="1" opacity="0.15" />

        {/* Signature line */}
        <line x1="10" y1="80" x2="75" y2="80" stroke="#1E40AF" strokeWidth="0.6" opacity="0.35" />
        <text x="10" y="90" fontSize="5" fill="#1E40AF" opacity="0.25" fontFamily="Sora, sans-serif">Semnatura</text>

        {/* Animated signature */}
        <path
          d="M 12,77 C 18,69 20,79 26,73 C 32,67 34,78 40,72 C 44,68 48,76 54,70 C 58,67 62,75 68,70"
          fill="none"
          stroke="#1E40AF"
          strokeWidth="1.3"
          strokeLinecap="round"
          className="hero-signature"
        />

        {/* Checkmark */}
        <g transform="translate(88, 68)">
          <circle cx="10" cy="10" r="9" fill="#10B981" opacity="0.12" className="hero-checkmark-bg" />
          <path d="M 5,10 L 8,13 L 16,6" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="hero-checkmark" />
        </g>
      </g>

      {/* ─── STAMP ─── */}
      <g className="hero-stamp-group-mini">
        <g className="hero-stamp-handle">
          <rect x="108" y="-15" width="30" height="14" rx="3" fill="#B91C1C" opacity="0.7" />
          <rect x="112" y="-3" width="22" height="7" rx="1.5" fill="#991B1B" opacity="0.6" />
          <rect x="109" y="2" width="28" height="4" rx="1" fill="#7F1D1D" opacity="0.5" />
        </g>
        <g className="hero-stamp-imprint-mini" filter="url(#stampBlur)">
          <circle cx="123" cy="30" r="17" fill="none" stroke="#EF4444" strokeWidth="1.8" opacity="0.6" />
          <circle cx="123" cy="30" r="13" fill="none" stroke="#EF4444" strokeWidth="0.7" opacity="0.4" />
          <text x="123" y="28" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#EF4444" opacity="0.65" fontFamily="Sora, sans-serif">APROBAT</text>
          <line x1="110" y1="34" x2="136" y2="34" stroke="#EF4444" strokeWidth="0.5" opacity="0.4" />
          <text x="123" y="40" textAnchor="middle" fontSize="4" fill="#EF4444" opacity="0.4" fontFamily="Sora, sans-serif">ONRC 2024</text>
        </g>
      </g>
    </svg>
  )
}
