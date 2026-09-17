'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CameraCapture from '@/components/CameraCapture';
import { Search, ShieldCheck, UserRound, ArrowLeft } from 'lucide-react';
import { useFCRSounds } from '@/components/SoundSystem';

const steps = ['Connecting to Intelligence Network','Loading fictional case database','Checking suspicious activities','Analyzing friendship history','Compiling subject profile','Finalizing results'];

export default function ScanPage() {
  const router = useRouter();
  const { startAmbient, playFCRSound } = useFCRSounds();
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [running, setRunning] = useState(false);
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(0);

  const continueToCamera = () => {
    if (!name.trim()) return;
    startAmbient(); playFCRSound('confirm'); setStage(2);
  };

  useEffect(() => {
    if (!running) return;
    playFCRSound('scan');
    const timer = window.setInterval(() => {
      setPct(v => {
        const next = Math.min(v + Math.ceil(Math.random() * 12), 100);
        setStep(Math.min(Math.floor(next / 17), steps.length - 1));
        if (next >= 100) {
          window.clearInterval(timer);
          playFCRSound('complete');
          window.setTimeout(() => router.push('/result'), 700);
        }
        return next;
      });
    }, 430);
    return () => window.clearInterval(timer);
  }, [running, router, playFCRSound]);

  const captured = (data: string) => {
    playFCRSound('confirm');
    localStorage.setItem('fcr_photo', data);
    localStorage.setItem('fcr_name', name.trim());
    setStage(3); setRunning(true); setPct(2); setStep(0);
  };

  if (stage === 1) return <main className="app"><section className="shell"><div className="glass"><header className="topbar"><button className="icon-btn" onClick={()=>router.push('/')}><ArrowLeft size={18}/></button><strong className="logo-mark">F<span>CR</span></strong><span className="badge">STEP 1 OF 3</span></header><div className="content">
    <div className="stepbar"><i className="active"/><i/><i/></div>
    <div className="hero compact"><div className="step-icon"><UserRound size={28}/></div><div className="eyebrow">SUBJECT REGISTRATION</div><h1 className="screen-title">WHO'S UNDER<br/>INVESTIGATION?</h1><p className="sub">Enter your friend's name or nickname.</p></div>
    <input autoFocus className="input name-input" value={name} onChange={e=>setName(e.target.value)} maxLength={40} placeholder="e.g. Rakib, Rifat, Pola..."/>
    <button className="primary hero-cta" onClick={continueToCamera} disabled={!name.trim()}>CONTINUE <span>→</span></button>
    <div className="quote">“Good friends.<br/><b>Bad records.</b> 😎”</div>
  </div></div></section></main>;

  if (stage === 2) return <main className="app"><section className="shell"><div className="glass"><header className="topbar"><button className="icon-btn" onClick={()=>setStage(1)}><ArrowLeft size={18}/></button><strong className="logo-mark">F<span>CR</span></strong><span className="badge">STEP 2 OF 3</span></header><div className="content">
    <div className="stepbar"><i className="done"/><i className="active"/><i/></div>
    <div className="hero compact"><div className="eyebrow">SUBJECT VERIFICATION</div><h1 className="screen-title">TAKE A<br/>PHOTO</h1><p className="sub">Position your friend's face inside the frame.</p></div>
    <CameraCapture onCaptured={captured}/>
  </div></div></section></main>;

  return <main className="app"><section className="shell"><div className="glass"><header className="topbar"><strong className="logo-mark">F<span>CR</span></strong><span className="badge"><Search size={14}/> STEP 3 OF 3</span></header><div className="content">
    <div className="stepbar"><i className="done"/><i className="done"/><i className="active"/></div>
    <div className="hero compact"><div className="eyebrow">CASE IN PROGRESS</div><h1 className="screen-title">INVESTIGATING<span className="blink">...</span></h1><p className="sub">{steps[step]}…</p></div>
    <div className="scan-map"><div className="scan-ring"/><div className="scan-dot"/></div>
    <div className="progress"><div style={{width:pct + '%'}}/></div>
    <div className="row" style={{marginTop:18}}><span className="label">Investigation progress</span><span className="value">{pct}%</span></div>
    <div className="stack" style={{marginTop:10}}>{steps.map((s,i)=><div key={s} className="row"><span className={i < step ? 'check done-text' : i === step ? 'check running-text' : 'check'}>{i < step ? '✓' : i === step ? '●' : '○'}</span><span className="label" style={{flex:1}}>{s}</span><span className="label">{i < step ? 'DONE' : i === step ? 'RUNNING' : 'WAIT'}</span></div>)}</div>
    <div className="disclaimer" style={{marginTop:18}}><ShieldCheck size={16} style={{verticalAlign:'-3px',marginRight:5}}/> Fictional analysis only. No biometric identification is performed.</div>
  </div></div></section></main>;
}