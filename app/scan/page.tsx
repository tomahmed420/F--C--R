'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CameraCapture from '@/components/CameraCapture';
import { makeResult } from '@/lib/crimes';
import { Search, ShieldCheck } from 'lucide-react';

const steps = [
  'Connecting to Intelligence Network',
  'Loading fictional case database',
  'Checking suspicious activities',
  'Analyzing friendship history',
  'Compiling subject profile',
];

export default function ScanPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('Unknown Friend');
  const [running, setRunning] = useState(false);
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(0);

  const result = useMemo(() => photo ? makeResult(`${name}|${photo.slice(0, 80)}`) : null, [name, photo]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setPct(v => {
        const next = Math.min(v + Math.ceil(Math.random() * 13), 100);
        setStep(Math.min(Math.floor(next / 21), steps.length - 1));
        if (next >= 100) { window.clearInterval(timer); window.setTimeout(() => router.push(`/result?name=${encodeURIComponent(name)}`), 450); }
        return next;
      });
    }, 420);
    return () => window.clearInterval(timer);
  }, [running, name, router]);

  const captured = (data: string) => {
    setPhoto(data);
    localStorage.setItem('fcr_photo', data);
    localStorage.setItem('fcr_name', name);
    setRunning(true); setPct(3); setStep(0);
  };

  if (running) return <main className="app"><section className="shell"><div className="glass"><header className="topbar"><strong>F.C.R.</strong><span className="badge"><Search size={14}/> Investigating</span></header><div className="content">
    <div className="hero"><div className="eyebrow">CASE IN PROGRESS</div><h1 style={{fontSize:38}}>SUBJECT<br/>ANALYSIS</h1><p className="sub">{steps[step]}…</p></div>
    <div className="progress"><div style={{width:`${pct}%`}}/></div>
    <div className="row" style={{marginTop:18}}><span className="label">Progress</span><span className="value">{pct}%</span></div>
    <div className="stack" style={{marginTop:16}}>{steps.map((s,i)=><div key={s} className="row"><span className="label">{i < step ? '✓' : i === step ? '●' : '○'} &nbsp;{s}</span><span className="label">{i < step ? 'DONE' : i === step ? 'RUNNING' : 'WAIT'}</span></div>)}</div>
    <div className="disclaimer" style={{marginTop:20}}><ShieldCheck size={16} style={{verticalAlign:'-3px',marginRight:5}}/> This is a fictional comedy report. No biometric identification is performed.</div>
  </div></div></section></main>;

  return <main className="app"><section className="shell"><div className="glass"><header className="topbar"><strong>F.C.R.</strong><span className="badge">Step 1 / 2</span></header><div className="content">
    <div className="hero" style={{paddingBottom:14}}><div className="eyebrow">SUBJECT REGISTRATION</div><h1 style={{fontSize:38}}>WHO ARE<br/>WE CHECKING?</h1><p className="sub">Enter a nickname, then let the fictional investigation begin.</p></div>
    <input className="input" value={name} onChange={e=>setName(e.target.value)} maxLength={40} placeholder="Friend's name / nickname"/>
    <div style={{height:14}}/>
    <CameraCapture onCaptured={captured}/>
  </div></div></section></main>;
}
