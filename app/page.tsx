'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert, Fingerprint, Sparkles, Volume2 } from 'lucide-react';
import { useFCRSounds } from '@/components/SoundSystem';

export default function Home() {
  const router = useRouter();
  const { startAmbient, playFCRSound } = useFCRSounds();
  const start = () => { startAmbient(); playFCRSound('boot'); router.push('/scan'); };

  return <main className="app cinematic-home"><section className="shell"><div className="glass hero-glass">
    <header className="topbar"><strong className="logo-mark">F<span>CR</span></strong><span className="badge"><ShieldAlert size={14}/> CONFIDENTIAL</span></header>
    <div className="content">
      <div className="hero">
        <div className="hero-art"><div className="hood"/><div className="art-glow"/></div>
        <div className="eyebrow">FRIEND INTELLIGENCE UNIT</div>
        <h1 className="hero-title"><span>FCR</span><small>FRIEND CRIMINAL RECORD</small></h1>
        <p className="sub">Every friend has a dark side. Discover their <b>fictional</b> criminal record.</p>
      </div>
      <div className="feature-strip"><span>◉ 100% FUN</span><span>◉ NO REAL DATA</span><span>◉ MADE FOR FRIENDS</span></div>
      <div className="disclaimer">⚠️ <b>Entertainment only.</b> This is a fictional game. Camera access and photo selection happen only after your action.</div>
      <button className="primary hero-cta" onClick={start}><Fingerprint size={20}/> START INVESTIGATION <span>→</span></button>
      <div className="sound-note"><Volume2 size={14}/> Cinematic sound experience • Tap to begin</div>
      <div className="mini-grid"><div><Sparkles size={17}/><b>ABSURD RESULTS</b><span>Random comedy crimes</span></div><div><ShieldAlert size={17}/><b>FRIEND SAFE</b><span>No hidden capture</span></div></div>
      <div className="footer">FCR • FICTIONAL FRIEND INVESTIGATION SYSTEM • 2026</div>
    </div>
  </div></section></main>;
}
