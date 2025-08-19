// PetfolioLogo.jsx
export default function PetfolioLogo({
  size = 220,
  title = 'PETFOLIO logo',
  className,
  style,
  animated = true
}) {
  return (
    <svg
      viewBox="0 0 900 220"
      width={size}
      height={(size * 220) / 900}
      role="img"
      aria-label={title}
      className={className}
      style={style}
    >
      <style>{`
        .word { font-family: "Baloo 2","Fredoka","Quicksand","Nunito",system-ui,sans-serif;
                font-weight: 900; font-size: 118px; letter-spacing: 2px; }
        .main { fill: var(--text-main, #2B2B2B); }
        .accent { fill: var(--accent-main, #B78F57); }
        .accent2 { fill: var(--accent-secondary, #D9A76C); }
        .strokeAccent { stroke: var(--accent-secondary, #D9A76C); fill: none; stroke-width: 10; stroke-linecap: round; }

        /* fun wag animation (optional) */
        @keyframes wag {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(6deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-6deg); }
          100% { transform: rotate(0deg); }
        }
        .tail { transform-origin: 820px 178px; }
        .tail.animated { animation: wag 1.6s ease-in-out infinite; }
        /* pause on reduce-motion */
        @media (prefers-reduced-motion: reduce) {
          .tail.animated { animation: none; }
        }
      `}</style>

      {/* Wordmark */}
      <text className="word" x="48" y="150">
        <tspan className="accent">PET</tspan><tspan className="main">FOLIO</tspan>
      </text>

      {/* Ears on the P */}
      <polygon className="accent2" points="78,72 92,28 110,72" />
      <polygon className="accent2" points="112,72 128,32 146,72" />

      {/* Paw over the i */}
      <g transform="translate(700,78)">
        <circle className="accent2" cx="0" cy="0" r="11"/>
        <circle className="accent2" cx="-18" cy="16" r="7"/>
        <circle className="accent2" cx="0" cy="19" r="7"/>
        <circle className="accent2" cx="18" cy="16" r="7"/>
        <ellipse className="accent2" cx="0" cy="37" rx="14" ry="10"/>
      </g>

      {/* Tail (animated) */}
      <g className={`tail ${animated ? 'animated' : ''}`}>
        <path className="strokeAccent" d="M720,158 C780,148 815,170 842,196" />
        <path className="strokeAccent" d="M735,170 C772,168 800,184 822,200" opacity="0.45"/>
      </g>
    </svg>
  );
}