import React from "react";
import { services } from "../../data/services";
import { pillars } from "../../data/pillars";

export default function Marquee() {
  const itemsRow1 = [...services, ...services, ...services];
  const itemsRow2 = [...pillars, ...pillars, ...pillars];

  return (
    <div className="w-full flex flex-col z-10 select-none overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 28s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 22s linear infinite;
        }
        .marquee-hover-pause:hover .animate-marquee-left,
        .marquee-hover-pause:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />
      
      {/* Row 1: scrolls LEFT (remains black backdrop for high-contrast highlight) */}
      <div 
        className="w-full bg-black border-t border-b border-black dark:border-border-main overflow-hidden flex items-center marquee-hover-pause"
        style={{ height: "44px" }}
      >
        <div className="animate-marquee-left whitespace-nowrap flex items-center">
          {itemsRow1.map((item, idx) => (
            <div key={idx} className="inline-flex items-center mx-8">
              <span className="font-sans-body font-extrabold text-[0.85rem] tracking-[0.15em] text-white uppercase">
                {item.title}
              </span>
              <span className="text-white ml-8 text-[8px] select-none pointer-events-none opacity-50">■</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: scrolls RIGHT */}
      <div 
        className="w-full bg-bg-primary border-b border-border-main overflow-hidden flex items-center marquee-hover-pause"
        style={{ height: "36px" }}
      >
        <div className="animate-marquee-right whitespace-nowrap flex items-center">
          {itemsRow2.map((pillar, idx) => (
            <div key={idx} className="inline-flex items-center mx-8">
              <span 
                className="font-mono-code font-normal uppercase text-text-secondary/60 text-[0.72rem] tracking-[0.1em]"
              >
                {pillar}
              </span>
              <span className="text-text-primary ml-8 text-[8px] select-none pointer-events-none opacity-30">■</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export { Marquee };
