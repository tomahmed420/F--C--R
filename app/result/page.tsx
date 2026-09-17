'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Share2, RotateCcw, ShieldAlert, Fingerprint, Skull, AlertTriangle, ScanLine } from 'lucide-react';
import { makeResult } from '@/lib/crimes';

export default function ResultPage() {
  const router = useRouter();
  const [name,setName] = useState('Unknown Friend');
  const [photo,setPhoto] = useState('');
  const [report,setReport] = useState<ReturnType<typeof makeResult>|null>(null);

  useEffect(() => {
    const p=localStorage.getItem('fcr_photo')||'', n=localStorage.getItem('fcr_name')||'Unknown Friend';
    setPhoto(p); setName(n); setReport(makeResult(n+'|'+p.slice(0,80)));
  },[]);

  const downloadCard = async () => {
    const node=document.getElementById('report-card'); if(!node||!report)return;
    const {toPng}=await import('html-to-image');
    const dataUrl=await toPng(node,{pixelRatio:2,cacheBust:true});
    const a=document.createElement('a'); a.download='fcr-most-wanted-'+report.caseId+'.png'; a.href=dataUrl; a.click();
  };
  const share = async () => {
    const text='🚨 '+name+' has been investigated by Friend Criminal Record. Case: '+report?.caseId;
    if(navigator.share) await navigator.share({title:'FCR // MOST WANTED',text,url:location.href});
    else { await navigator.clipboard.writeText(text+'\n'+location.href); alert('Share text copied!'); }
  };

  if(!report)return <main className="app"><section className="shell"><div className="glass"><div className="content"><div className="hero"><h1>GENERATING<br/>DOSSIER…</h1></div></div></div></section></main>;

  return <main className="app result-page"><section className="shell result-shell"><div className="glass result-screen">
    <header className="topbar result-top"><strong className="logo-mark">F<span>CR</span></strong><span className="badge"><ShieldAlert size={13}/> CASE CLOSED</span></header>
    <div className="content">
      <div className="result-kicker">FEDERAL FRIEND INTELLIGENCE // FILE 09</div>
      <h1 className="result-title">MOST WANTED<br/><span>FRIEND</span></h1>
      <div id="report-card" className="wanted-card">
        <div className="hazard-top">⚠ CLASSIFIED // FICTIONAL DOSSIER // DO NOT TAKE SERIOUSLY ⚠</div>
        <div className="wanted-header"><div><div className="micro">F.C.R. // SUBJECT IDENTIFICATION</div><div className="card-title">MOST WANTED</div><div className="micro">FRIEND CRIMINAL RECORD • FICTIONAL</div></div><div className="case-stamp">THREAT<br/><b>FCR</b></div></div>
        <div className="photo-frame">{photo?<img src={photo} alt="Friend submitted for fictional report"/>:<div className="photo-placeholder"><Skull size={50}/></div>}<div className="photo-crosshair"/><div className="photo-tag">SUBJECT // {report.caseId} // VISUAL FILE</div></div>
        <div className="subject-line"><span>LEGAL NAME / NICKNAME</span><b>{name}</b></div>
        <div className="alias-line"><span>KNOWN ALIAS</span><b>{report.alias}</b></div>
        <div className="crime-box"><div className="micro">PRIMARY ALLEGATION</div><strong>{report.crime}</strong></div>
        <div className="wanted-grid"><div><span>THREAT INDEX</span><b>{report.threat}%</b></div><div><span>BIRYANI THREAT</span><b>{report.biryani}%</b></div><div><span>ANNOYANCE</span><b>{report.annoying}%</b></div><div><span>COMMON SENSE</span><b>{report.commonSense}%</b></div></div>
        <div className="warning-strip"><AlertTriangle size={18}/><div><b>HANDLE WITH FRIENDSHIP</b><br/><span>Extremely dangerous to group-chat peace. Otherwise fictional.</span></div></div>
        <div className="wanted-security"><span>FCR // EYES ONLY</span><ScanLine size={28}/><span>CASE {report.caseId}</span></div>
        <div className="card-bottom"><span>ISSUED 2026</span><Fingerprint size={34}/><span>FICTIONAL UNIT</span></div>
        <div className="diagonal-stamp">MOST WANTED</div><div className="card-barcode" aria-hidden="true">|||| ||| |||||| | |||| ||| || ||||||</div>
      </div>
      <div className="result-note">This is a fictional comedy card. It does not identify a person or create a real criminal, biometric, or background record.</div>
      <div className="stack result-actions"><button className="primary" onClick={downloadCard}><Download size={18}/> DOWNLOAD MOST-WANTED CARD</button><button className="secondary" onClick={share}><Share2 size={17}/> SHARE WITH THE SUSPECT</button><button className="secondary" onClick={()=>router.push('/')}><RotateCcw size={17}/> INVESTIGATE ANOTHER FRIEND</button></div>
      <div className="footer">FCR • FICTIONAL FRIEND INVESTIGATION SYSTEM • FOR FRIENDS, FOR FUN</div>
    </div>
  </div></section></main>;
}