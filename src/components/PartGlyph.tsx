/* Fine-line drawings of each part family, in the same hand as the hero stove. */

export type GlyphKind = 'knobs' | 'dial-plates' | 'legs' | 'coupler-pins' | 'auto-safety';

export function PartGlyph({ kind }: { kind: GlyphKind }) {
  return (
    <svg viewBox="0 0 240 180" aria-hidden>
      <ellipse className="g-faint" cx="120" cy="166" rx="86" ry="6" />
      {kind === 'knobs' && (
        <g>
          {/* side elevation behind, front view in front */}
          <path className="g-solid" d="M150 62 h44 a6 6 0 0 1 6 6 v52 a6 6 0 0 1 -6 6 h-44 z" />
          <line className="g-faint" x1="200" y1="94" x2="216" y2="94" />
          <rect className="g-solid" x="208" y="88" width="16" height="12" rx="2" />
          <circle className="g-solid" cx="104" cy="94" r="58" />
          <circle className="g-faint" cx="104" cy="94" r="48" />
          <rect className="g-solid" x="91" y="40" width="26" height="108" rx="13" transform="rotate(-35 104 94)" />
          <circle className="g-accent" cx="104" cy="56" r="4" transform="rotate(-35 104 94)" />
        </g>
      )}
      {kind === 'dial-plates' && (
        <g>
          <ellipse className="g-solid" cx="120" cy="90" rx="56" ry="74" />
          <ellipse className="g-faint" cx="120" cy="90" rx="45" ry="62" />
          <path className="g-line" d="M120 23 A 50 67 0 0 0 71 112" />
          <circle className="g-solid" cx="120" cy="90" r="20" />
          <rect className="g-line" x="114" y="44" width="12" height="16" rx="5" />
          <rect className="g-line" x="114" y="120" width="12" height="16" rx="5" />
          <text className="g-tiny" x="130" y="30">OFF</text>
          <text className="g-tiny" x="82" y="148">SIM</text>
          <circle className="g-accent" cx="120" cy="20" r="3" />
        </g>
      )}
      {kind === 'legs' && (
        <g>
          <rect className="g-solid" x="113" y="10" width="14" height="34" rx="2" />
          {[16, 22, 28, 34, 40].map((y) => (
            <line key={y} className="g-faint" x1="113" y1={y} x2="127" y2={y - 3} />
          ))}
          <rect className="g-solid" x="100" y="40" width="40" height="8" rx="2" />
          <path className="g-solid" d="M76 48 H164 L148 150 H92 Z" />
          <line className="g-faint" x1="90" y1="132" x2="150" y2="132" />
          <line className="g-faint" x1="100" y1="60" x2="96" y2="120" />
          <rect className="g-accent" x="92" y="150" width="56" height="4" rx="2" />
        </g>
      )}
      {kind === 'coupler-pins' && (
        <g>
          {/* burner pin */}
          <circle className="g-solid" cx="70" cy="34" r="16" />
          <circle className="g-faint" cx="70" cy="34" r="6" />
          <path className="g-solid" d="M66 50 h8 v96 l-4 12 l-4 -12 z" />
          {/* coupler */}
          <path className="g-solid" d="M138 56 l20 -12 h24 l20 12 v24 l-20 12 h-24 l-20 -12 z" />
          <circle className="g-faint" cx="170" cy="68" r="10" />
          <rect className="g-solid" x="152" y="92" width="36" height="58" rx="4" />
          {[104, 116, 128, 140].map((y) => (
            <line key={y} className="g-faint" x1="152" y1={y} x2="188" y2={y} />
          ))}
          <circle className="g-accent" cx="70" cy="34" r="3" />
        </g>
      )}
      {kind === 'auto-safety' && (
        <g>
          <path className="g-solid" d="M52 70 L150 70 L190 46 L92 46 Z" />
          <path className="g-solid" d="M52 70 V150 H150 V70 Z" />
          <path className="g-solid" d="M150 70 L190 46 V126 L150 150 Z" />
          <rect className="g-line" x="72" y="92" width="58" height="34" rx="4" />
          <rect className="g-line" x="130" y="102" width="6" height="14" rx="1" />
          <text className="g-tiny" x="80" y="113">+  1.5V  −</text>
          <circle className="g-accent" cx="170" cy="60" r="4" />
        </g>
      )}
    </svg>
  );
}
