'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/*
 * The hero figure: a gas stove drawn in fine lines. The pointer's position
 * across the stove turns the knob under it; that burner's flame rises and its
 * neighbours rise less. The parts SR makes (knob, dial plate, leg) are
 * numbered and listed beside the drawing. State lives in React; a rAF loop
 * eases each burner toward its target and stops when it arrives.
 */

const W = 1200;
const BURNERS = [330, 600, 870];
const BY = 212; // burner centre on the hob
const PY = 372; // dial plate / knob centre on the front panel
const IDLE = [0, 0.62, 0];
const LEVEL = (v: number) => (v < 0.08 ? 'off' : v < 0.4 ? 'low' : v < 0.75 ? 'medium' : 'high');
const NAMES = ['Left', 'Middle', 'Right'];

export type FigurePart = { n: number; kind: 'knob' | 'plate' | 'leg'; name: string; code: string; price?: string; href: string };

function Flames({ cx, v, front }: { cx: number; v: number; front: boolean }) {
  if (v < 0.03) return null;
  const tongues = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const s = Math.sin(a);
    if (front ? s < 0 : s >= 0) continue;
    const bx = cx + Math.cos(a) * 46;
    const by = BY - 4 + s * 14;
    const k = 0.82 + 0.18 * Math.sin(i * 2.3);
    const h = (8 + 34 * v) * k;
    const lean = Math.cos(a) * 6 * v;
    const tx = bx + lean;
    const ty = by - h;
    tongues.push(
      <path
        key={i}
        d={`M${bx - 3.4} ${by} Q${bx - 4} ${by - h * 0.55} ${tx} ${ty} Q${bx + 4} ${by - h * 0.55} ${bx + 3.4} ${by} Z`}
      />,
    );
  }
  return (
    <g className="fig-flame" style={{ opacity: Math.min(1, v * 3) }}>
      {tongues}
    </g>
  );
}

function Burner({ cx, v }: { cx: number; v: number }) {
  const arms = [45, 135, 225, 315].map((d) => {
    const r = (d * Math.PI) / 180;
    return (
      <line
        key={d}
        x1={cx + Math.cos(r) * 72}
        y1={BY + Math.sin(r) * 24}
        x2={cx + Math.cos(r) * 116}
        y2={BY + Math.sin(r) * 39}
      />
    );
  });
  return (
    <g>
      <ellipse className="fig-faint" cx={cx} cy={BY} rx={118} ry={40} />
      <g className="fig-faint">{arms}</g>
      <ellipse className="fig-line" cx={cx} cy={BY + 2} rx={60} ry={19} />
      <Flames cx={cx} v={v} front={false} />
      <ellipse className="fig-solid" cx={cx} cy={BY - 6} rx={40} ry={13} />
      <ellipse className="fig-faint" cx={cx} cy={BY - 10} rx={26} ry={8} />
      <Flames cx={cx} v={v} front />
    </g>
  );
}

function Plate({ cx, hi }: { cx: number; hi: boolean }) {
  return (
    <g className={hi ? 'is-hi' : undefined}>
      <ellipse className="fig-solid fig-part" cx={cx} cy={PY} rx={42} ry={54} />
      <ellipse className="fig-faint" cx={cx} cy={PY} rx={33} ry={44} />
      <path className="fig-faint" d={`M${cx} ${PY - 49} A 38 49 0 0 0 ${cx - 37} ${PY + 12}`} />
      <line className="fig-line" x1={cx} y1={PY - 52} x2={cx} y2={PY - 45} />
      <text className="fig-tiny" x={cx + 9} y={PY - 40}>OFF</text>
      <text className="fig-tiny" x={cx - 31} y={PY + 30}>SIM</text>
    </g>
  );
}

function Knob({ cx, v, hi }: { cx: number; v: number; hi: boolean }) {
  return (
    <g className={hi ? 'is-hi' : undefined} transform={`rotate(${-v * 150} ${cx} ${PY})`}>
      <circle className="fig-solid fig-part" cx={cx} cy={PY} r={29} />
      <circle className="fig-faint" cx={cx} cy={PY} r={22} />
      <rect className="fig-solid fig-part" x={cx - 7} y={PY - 26} width={14} height={52} rx={7} />
      <circle className="fig-dot" cx={cx} cy={PY - 18} r={3} />
    </g>
  );
}

function Leg({ x, hi, back }: { x: number; hi: boolean; back?: boolean }) {
  const top = 442;
  const bot = back ? 528 : 546;
  return (
    <g className={hi ? 'is-hi' : undefined}>
      <path
        className={back ? 'fig-faint' : 'fig-solid fig-part'}
        d={`M${x - 22} ${top} L${x + 22} ${top} L${x + 15} ${bot} L${x - 15} ${bot} Z`}
      />
      {!back && <line className="fig-faint" x1={x - 16.5} y1={bot - 14} x2={x + 16.5} y2={bot - 14} />}
    </g>
  );
}

function Marker({ n, x, y, lx, ly, hi }: { n: number; x: number; y: number; lx: number; ly: number; hi: boolean }) {
  return (
    <g className={`fig-marker${hi ? ' is-hi' : ''}`}>
      <line x1={x} y1={y} x2={lx} y2={ly} />
      <circle cx={lx} cy={ly} r={17} />
      <text x={lx} y={ly + 6} textAnchor="middle">{n}</text>
    </g>
  );
}

export function StoveFigure({ parts }: { parts: FigurePart[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vals, setVals] = useState<number[]>(IDLE);
  const [hi, setHi] = useState<FigurePart['kind'] | null>(null);
  const target = useRef<number[]>(IDLE);
  const cur = useRef<number[]>(IDLE);
  const raf = useRef(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const run = () => {
    if (raf.current) return;
    const step = () => {
      let moving = false;
      cur.current = cur.current.map((c, i) => {
        const t = target.current[i];
        const n = reduce.current ? t : c + (t - c) * 0.14;
        if (Math.abs(t - n) > 0.002) moving = true;
        return Math.abs(t - n) > 0.002 ? n : t;
      });
      setVals(cur.current);
      raf.current = moving ? requestAnimationFrame(step) : 0;
    };
    raf.current = requestAnimationFrame(step);
  };

  const aim = (clientX: number) => {
    const r = svgRef.current!.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * W;
    target.current = BURNERS.map((b) => {
      const d = Math.abs(x - b) / 270;
      return Math.max(0, 1 - d * d);
    });
    run();
  };
  const rest = () => {
    target.current = IDLE;
    run();
  };

  const strongest = vals.indexOf(Math.max(...vals));
  const readout = vals[strongest] < 0.08 ? 'All burners off' : `${NAMES[strongest]} burner, ${LEVEL(vals[strongest])}`;

  return (
    <div className="fig">
      <div className="fig-stage">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} 580`}
          role="img"
          aria-label="Line drawing of a three-burner gas stove. Its knobs, dial plates and legs are SR Industries parts."
          onPointerMove={(e) => aim(e.clientX)}
          onPointerDown={(e) => aim(e.clientX)}
          onPointerLeave={rest}
        >
          <ellipse className="fig-shadow" cx={600} cy={548} rx={520} ry={9} />
          <line className="fig-faint" x1={20} y1={548} x2={1180} y2={548} />
          <Leg x={215} hi={false} back />
          <Leg x={985} hi={false} back />

          {/* hob glass */}
          <path className="fig-solid" d="M190 118 L1010 118 L1110 300 L90 300 Z" />
          <path className="fig-faint" d="M230 132 L970 132" />
          <line className="fig-glint" x1={720} y1={128} x2={640} y2={290} />
          <line className="fig-glint" x1={760} y1={128} x2={690} y2={290} />
          {BURNERS.map((b, i) => (
            <Burner key={b} cx={b} v={vals[i]} />
          ))}

          {/* front panel */}
          <path className="fig-solid" d="M90 300 L1110 300 L1110 428 Q1110 442 1096 442 L104 442 Q90 442 90 428 Z" />
          <line className="fig-faint" x1={90} y1={312} x2={1110} y2={312} />
          {BURNERS.map((b) => (
            <Plate key={b} cx={b} hi={hi === 'plate'} />
          ))}
          {BURNERS.map((b, i) => (
            <Knob key={b} cx={b} v={vals[i]} hi={hi === 'knob'} />
          ))}
          <Leg x={150} hi={hi === 'leg'} />
          <Leg x={1050} hi={hi === 'leg'} />

          <Marker n={1} x={902} y={PY} lx={1160} ly={PY} hi={hi === 'knob'} />
          <Marker n={2} x={286} y={PY} lx={40} ly={PY} hi={hi === 'plate'} />
          <Marker n={3} x={1070} y={492} lx={1160} ly={492} hi={hi === 'leg'} />
        </svg>
        <p className="fig-readout" aria-live="polite">
          <span className="fig-pulse" data-on={vals[strongest] >= 0.08 || undefined} />
          {readout}
          <span className="fig-hint"> &nbsp;Move across the stove to turn the knobs</span>
        </p>
      </div>

      <ol className="fig-legend">
        {parts.map((p) => (
          <li key={p.n}>
            <Link
              href={p.href}
              onPointerEnter={() => setHi(p.kind)}
              onPointerLeave={() => setHi(null)}
              onFocus={() => setHi(p.kind)}
              onBlur={() => setHi(null)}
            >
              <span className="fig-num" aria-hidden>{p.n}</span>
              <span className="fig-li">
                <span className="fig-li-name">{p.name}</span>
                <span className="fig-li-meta">
                  <span className="code">{p.code}</span>
                  {p.price && <span>{p.price} a piece</span>}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
