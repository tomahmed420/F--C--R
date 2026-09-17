'use client';

import { useRouter } from 'next/navigation';
import { Fingerprint, Volume2, ShieldAlert, LockKeyhole, ScanFace } from 'lucide-react';
import { useFCRSounds } from '@/components/SoundSystem';
import { HoodedFigure } from '@/components/FCRVisuals';

export default function Home() {
  const router = useRouter();
  const { startAmbient, playFCRSound } = useFCRSounds();
  const start = () => { startAmbient(); playFCRSound('boot'); router.push('/scan'); };

  return <main className="app home-page">
    <div className="home-backdrop" aria-hidden="true">
      <HoodedFigure/><div className="home-red-wash"/><div className="home-blue-wash"/>
      <div className="home-vignette"/><div className="home-scanline"/><div className="home-grain"/>
    </div>
    <section className="home-viewport">
      <header className="home-topbar">
        <div className="home-classified"><ShieldAlert size={12}/> FCR // FICTIONAL INTELLIGENCE UNIT</div>
        <div className="home-secure"><LockKeyhole size={12}/> SECURE</div>
      </header>
      <div className="home-center">
        <div className="home-kicker">FRIEND INTELLIGENCE UNIT</div>
        <div className="home-logo"><span>F</span>CR</div>
        <div className="home-brand">FRIEND CRIMINAL <b>RECORD</b></div>
        <div className="home-tagline">EVERY FRIEND<br/><strong>HAS A DARK SIDE 😏</strong></div>
      </div>
      <div className="home-bottom">
        <div className="home-warning"><ScanFace size={16}/><span>FICTIONAL INVESTIGATION SYSTEM<br/><b>NO REAL CRIMINAL OR BIOMETRIC IDENTIFICATION</b></span></div>
        <button className="home-start" onClick={start}><Fingerprint size={21}/><span>START INVESTIGATION</span><span className="home-arrow">→</span></button>
        <div className="home-audio"><Volume2 size={13}/> TAP TO BEGIN • CINEMATIC AUDIO EXPERIENCE</div>
        <div className="home-footer"><span>100% FUN</span><i/><span>CONSENT BASED</span><i/><span>NO REAL DATA</span></div>
      </div>
    </section>
  </main>;
}