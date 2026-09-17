'use client';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Fingerprint, Volume2, Radio, LockKeyhole } from 'lucide-react';
import { useFCRSounds } from '@/components/SoundSystem';
import { HoodedFigure } from '@/components/FCRVisuals';

export default function Home(){
 const router=useRouter(); const {startAmbient,playFCRSound}=useFCRSounds();
 const start=()=>{startAmbient();playFCRSound('boot');router.push('/scan')};
 return <main className="app home-page"><div className="noise"/><section className="shell"><div className="glass home-card">
  <div className="classified-ribbon">FICTIONAL // FRIEND INTELLIGENCE UNIT</div>
  <div className="hero-art"><HoodedFigure/><div className="art-vignette"/><div className="scanline"/></div>
  <div className="home-content"><div className="hero">
   <div className="logo-lockup"><span>F</span>CR</div><div className="brand-name">FRIEND CRIMINAL <b>RECORD</b></div>
   <div className="tagline">EVERY FRIEND<br/>HAS A <span>DARK SIDE</span> 😏</div>
  </div>
  <div className="feature-strip"><span>◉ 100% FUN</span><span>◉ NO REAL DATA</span><span>◉ CONSENT BASED</span></div>
  <div className="disclaimer"><Radio size={16}/><span><b>FICTIONAL INVESTIGATION SYSTEM</b><br/>No real criminal, biometric, or background data is created.</span></div>
  <button className="primary hero-cta" onClick={start}><Fingerprint size={21}/> START INVESTIGATION <span>→</span></button>
  <div className="sound-note"><Volume2 size={14}/> Tap to activate cinematic audio</div>
  <div className="home-meta"><span><LockKeyhole size={13}/> PRIVATE BY DESIGN</span><span>FCR-2026</span></div>
 </div></div></section></main>;
}