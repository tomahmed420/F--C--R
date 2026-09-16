'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Share2, RotateCcw, ShieldAlert } from 'lucide-react';
import { makeResult } from '@/lib/crimes';

export default function ResultPage() {
  const router = useRouter();
  const [name, setName] = useState('Unknown Friend');
  const [photo, setPhoto] = useState('');
  const [report, setReport] = useState<ReturnType<typeof makeResult> | null>(null);

  useEffect(() => {
    const p = localStorage.getItem('fcr_photo') || '';
    const n = localStorage.getItem('fcr_name') || 'Unknown Friend';
    setPhoto(p); setName(n); setReport(makeResult(`${n}|${p.slice(0,80)}`));
  }, []);

  const downloadCard = async () => {
    const node = document.getElementById('report-card');
    if (!node || !report) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
    const a = document.createElement('a');
    a.download = `friend-criminal-record-${report.caseId}.png`;
    a.href = dataUrl; a.click();
  };

  const share = async () => {
    const text = `🚨 ${name} has been investigated by Friend Criminal Record. Case: ${report?.caseId}`;
    if (navigator.share) await navigator.share({ title:'Friend Criminal Record', text, url:location.href });
    else { await navigator.clipboard.writeText(`${text}\n${location.href}`); alert('Share text copied!'); }
  };

  if (!report) return <main className="app"><section className="shell"><div className="glass"><div className="content"><div className="hero"><h1 style={{fontSize:34}}>GENERATING<br/>REPORT…</h1></div></div></div></section></main>;

  return <main className="app"><section className="shell"><div className="glass"><header className="topbar"><strong>F.C.R.</strong><span className="badge"><ShieldAlert size={14}/> Case Closed</span></header><div className="content">
    <div className="eyebrow">FINAL CLASSIFICATION</div><h1 style={{fontSize:34,marginBottom:18}}>MOST WANTED<br/>FRIEND</h1>
    <div id="report-card" className="result-card">
      <div className="result-head"><div style={{fontSize:12,letterSpacing:'.16em',fontWeight:900,color:'#ff8489'}}>FRIEND CRIMINAL RECORD • FICTIONAL</div><div style={{fontSize:30,fontWeight:1000,marginTop:7}}>{name}</div><div style={{color:'#9ea5b4',fontSize:13,marginTop:4}}>{report.alias}</div></div>
      {photo && <img className="photo" src={photo} alt="Friend submitted for the comedy report"/>}
      <div className="result-body">
        <div className="row"><span className="label">Primary allegation</span><span className="value">{report.crime}</span></div>
        <div className="row"><span className="label">Case ID</span><span className="value">{report.caseId}</span></div>
        <div className="meter"><div className="meter-top"><span>Talkative Level</span><b>{report.talk}%</b></div><div className="meter-bar"><span style={{width:`${report.talk}%`}}/></div></div>
        <div className="meter"><div className="meter-top"><span>Annoying Level</span><b>{report.annoying}%</b></div><div className="meter-bar"><span style={{width:`${report.annoying}%`}}/></div></div>
        <div className="meter"><div className="meter-top"><span>Common Sense</span><b>{report.commonSense}%</b></div><div className="meter-bar"><span style={{width:`${report.commonSense}%`}}/></div></div>
        <div className="meter"><div className="meter-top"><span>Biryani Threat</span><b>{report.biryani}%</b></div><div className="meter-bar"><span style={{width:`${report.biryani}%`}}/></div></div>
        <div className="row"><span className="label">Threat level</span><span className="value">{report.threat}% — EXTREMELY FRIENDLY 😂</span></div>
        <p className="small" style={{marginTop:15}}>This report is fictional and generated for entertainment. It is not a real criminal, biometric, or background record.</p>
      </div>
    </div>
    <div className="stack" style={{marginTop:16}}><button className="primary" onClick={downloadCard}><Download size={18} style={{verticalAlign:'-3px',marginRight:6}}/> DOWNLOAD REPORT CARD</button><button className="secondary" onClick={share}><Share2 size={17} style={{verticalAlign:'-3px',marginRight:6}}/> SHARE WITH THE SUSPECT</button><button className="secondary" onClick={()=>router.push('/')}><RotateCcw size={17} style={{verticalAlign:'-3px',marginRight:6}}/> INVESTIGATE ANOTHER FRIEND</button></div>
    <div className="footer">FCR • Fictional Friend Investigation System • No real-world identification</div>
  </div></div></section></main>;
}