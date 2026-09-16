'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert, Camera, Fingerprint, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  return <main className="app"><section className="shell"><div className="glass">
    <header className="topbar"><strong>F.C.R.</strong><span className="badge"><ShieldAlert size={14}/> Confidential</span></header>
    <div className="content">
      <div className="hero">
        <div className="eyebrow">FRIEND INTELLIGENCE UNIT</div>
        <h1>FRIEND<br/>CRIMINAL<br/>RECORD</h1>
        <p className="sub">Run a completely fictional investigation and discover what your friend is allegedly guilty of.</p>
      </div>
      <div className="disclaimer">⚠️ Comedy experience only. A photo is uploaded only after the participant chooses to take/select it and confirms the upload.</div>
      <div className="stack">
        <button className="primary" onClick={() => router.push('/scan')}><Camera size={19} style={{verticalAlign:'-4px',marginRight:8}}/> START INVESTIGATION</button>
        <div className="small" style={{textAlign:'center'}}> <Fingerprint size={14} style={{verticalAlign:'-3px',marginRight:5}}/> biometric-style animation is fictional</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginTop:24}}>
        <div className="disclaimer" style={{margin:0}}><Sparkles size={17}/><br/><b>Absurd Results</b><br/><span>Random comedy crimes</span></div>
        <div className="disclaimer" style={{margin:0}}><ShieldAlert size={17}/><br/><b>Friend Safe</b><br/><span>Clear user action before upload</span></div>
      </div>
      <div className="footer">FCR • Fictional Friend Investigation System • 2026</div>
    </div>
  </div></section></main>;
}
