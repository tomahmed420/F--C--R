'use client';

export function HoodedFigure() {
  return <svg className="hooded-svg" viewBox="0 0 420 360" role="img" aria-label="Fictional hooded investigation artwork">
    <defs>
      <radialGradient id="hoodRed" cx="30%" cy="45%" r="70%"><stop offset="0" stopColor="#ff2438" stopOpacity=".8"/><stop offset=".55" stopColor="#8b0717" stopOpacity=".35"/><stop offset="1" stopColor="#020305" stopOpacity="0"/></radialGradient>
      <radialGradient id="hoodBlue" cx="75%" cy="45%" r="70%"><stop offset="0" stopColor="#00bfff" stopOpacity=".75"/><stop offset=".55" stopColor="#005d86" stopOpacity=".28"/><stop offset="1" stopColor="#020305" stopOpacity="0"/></radialGradient>
      <linearGradient id="cloak" x1="0" x2="1"><stop stopColor="#030406"/><stop offset=".5" stopColor="#171a22"/><stop offset="1" stopColor="#020304"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="7"/></filter>
    </defs>
    <rect width="420" height="360" fill="#020305"/>
    <ellipse cx="105" cy="175" rx="180" ry="150" fill="url(#hoodRed)" filter="url(#glow)"/>
    <ellipse cx="315" cy="175" rx="180" ry="150" fill="url(#hoodBlue)" filter="url(#glow)"/>
    <path d="M62 360C69 286 82 233 119 185C142 154 150 93 210 67C270 93 278 154 301 185C338 233 351 286 358 360Z" fill="url(#cloak)" stroke="#2b3038" strokeWidth="2"/>
    <path d="M113 176C126 87 154 40 210 22C266 40 294 87 307 176L273 205C252 222 168 222 147 205Z" fill="#090b10" stroke="#343944" strokeWidth="3"/>
    <path d="M144 163C151 91 177 53 210 45C243 53 269 91 276 163C255 184 165 184 144 163Z" fill="#010204"/>
    <ellipse cx="210" cy="133" rx="46" ry="62" fill="#000103"/>
    <path d="M166 132C178 116 192 109 210 109C228 109 242 116 254 132C241 147 228 153 210 153C192 153 179 147 166 132Z" fill="#010102"/>
    <path d="M210 22V350M73 316L147 205M347 316L273 205" stroke="#fff" strokeOpacity=".05" strokeWidth="2"/>
    <path d="M26 284L120 224M394 284L300 224" stroke="#ff2638" strokeOpacity=".25" strokeWidth="2"/>
    <path d="M30 90L150 185M390 90L270 185" stroke="#00bfff" strokeOpacity=".18" strokeWidth="2"/>
    <g opacity=".45" fill="#ff3044"><circle cx="72" cy="112" r="2"/><circle cx="91" cy="74" r="1.5"/><circle cx="348" cy="120" r="2"/><circle cx="325" cy="82" r="1.5"/></g>
  </svg>;
}

export function WorldMap() {
  return <svg className="world-map-svg" viewBox="0 0 900 430" aria-hidden="true">
    <g fill="currentColor" stroke="currentColor" strokeWidth="2" opacity=".72">
      <path d="M92 116l42-29 64 6 34 31-13 31-38 5-21 29-41-18-31-28z"/>
      <path d="M208 177l36 10 21 45-12 57-25 43-22-20 6-53-23-43z"/>
      <path d="M370 110l28-18 39 8 24 23-16 21-37-3-22 18-24-19z"/>
      <path d="M416 157l38-5 31 29-4 36-26 28-10 54-29 42-25-28 13-57-18-42 8-36z"/>
      <path d="M486 92l66-11 61 22 8 29-45 18-21-14-48 10-28-22z"/>
      <path d="M554 154l63-5 42 28-9 45-34 16-18 57-33 34-19-38 10-49-27-43z"/>
      <path d="M670 94l48-11 62 19 27 32-23 27-58-3-22-23-42 5-16-21z"/>
      <path d="M735 181l50-8 45 29-9 38-43 12-31-25z"/>
    </g>
    <g fill="none" stroke="#ff3348" strokeWidth="2" opacity=".8">
      <path d="M120 146Q410 20 785 170"/><path d="M170 250Q450 100 820 245"/><path d="M290 70Q470 210 680 350"/>
    </g>
    <g fill="#ff3045"><circle cx="178" cy="145" r="5"/><circle cx="456" cy="183" r="5"/><circle cx="622" cy="198" r="5"/><circle cx="760" cy="162" r="5"/></g>
  </svg>;
}