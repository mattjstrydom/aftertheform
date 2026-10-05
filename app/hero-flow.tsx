"use client";

import { useState } from "react";
import s from "./hero-flow.module.css";

const STAGES = ["MQL", "SQL", "Opportunity", "Customer"];

const Check = () => (
  <svg className={s.tick} viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2 6.5 5 9.5 10 3" pathLength="1" />
  </svg>
);

// Final state is the base CSS; the animation only plays *toward* it, so
// no-JS and prefers-reduced-motion both land on the finished frame.
export default function HeroFlow() {
  const [run, setRun] = useState(0);

  return (
    <figure className={s.wrap}>
      <figcaption className="sr-only">
        A lead moves from Form submitted through MQL, SQL, Opportunity and
        Customer, and Google Ads changes from bidding on form fills to bidding
        on qualified stages.
      </figcaption>

      <div key={run} className={s.stage} aria-hidden="true">
        <svg className={`${s.lines} ${s.wide}`} viewBox="0 0 66 19">
          {[2.6, 7.2, 11.8, 16.4].map((c, i) => (
            <g key={c} style={{ "--i": i } as React.CSSProperties}>
              <path className={s.fan} d={`M10.5 9.5 C17 9.5 17 ${c} 24 ${c}`} pathLength="1" />
              <path className={s.fan} d={`M24 ${c} H36`} pathLength="1" />
              <path className={s.merge} d={`M36 ${c} C41 ${c} 41 9.5 46 9.5`} pathLength="1" />
            </g>
          ))}
        </svg>
        <svg className={`${s.lines} ${s.tall}`} viewBox="0 0 22 38">
          <path className={s.fan} d="M11 3.4 V24.5" pathLength="1" />
        </svg>

        <div className={`${s.card} ${s.form}`}>Form submitted</div>

        {STAGES.map((name, i) => (
          <div
            key={name}
            className={`${s.card} ${s.stageCard}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className={s.mono}>{name}</span>
            <Check />
          </div>
        ))}

        <div className={`${s.card} ${s.google}`}>
          <div className={s.gHead}>
            <span className={s.dot} />
            Google Ads
          </div>
          <div className={s.bid}>
            <span className={s.bidOld}>Bidding on: form fills</span>
            <span className={s.bidNew}>Bidding on: qualified stages</span>
          </div>
          <div className={s.chips}>
            {STAGES.map((name, i) => (
              <span
                key={name}
                className={`${s.chip} ${s.mono}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                {name}
                <Check />
              </span>
            ))}
          </div>
        </div>
      </div>

      <button type="button" className={s.replay} onClick={() => setRun((r) => r + 1)}>
        Replay
      </button>
    </figure>
  );
}
