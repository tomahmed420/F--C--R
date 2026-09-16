'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, RotateCcw, Check, Upload } from 'lucide-react';

export default function CameraCapture({ onCaptured }: { onCaptured: (dataUrl: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string>('');
  const [starting, setStarting] = useState(false);

  const start = async () => {
    setError(''); setStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError('Camera access was not granted. You can use Upload Photo instead.');
    } finally { setStarting(false); }
  };

  useEffect(() => () => streamRef.current?.getTracks().forEach(t => t.stop()), []);

  const capture = () => {
    const video = videoRef.current; if (!video) return;
    const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/jpeg', 0.84); setPreview(data);
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  const chooseFile = (file: File) => {
    if (!file.type.startsWith('image/')) return setError('Please select an image file.');
    if (file.size > 8 * 1024 * 1024) return setError('Please choose an image smaller than 8MB.');
    const reader = new FileReader(); reader.onload = () => setPreview(String(reader.result)); reader.readAsDataURL(file);
  };

  if (preview) return <div className="stack">
    <div className="camera-wrap"><img src={preview} alt="Selected subject" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
    <button className="secondary" onClick={() => { setPreview(''); start(); }}><RotateCcw size={17} style={{verticalAlign:'-3px',marginRight:6}}/> RETAKE</button>
    <button className="primary" onClick={() => onCaptured(preview)}><Check size={18} style={{verticalAlign:'-3px',marginRight:6}}/> USE THIS PHOTO</button>
  </div>;

  return <div className="stack">
    <div className="disclaimer" style={{margin:0}}><b>Before you continue:</b><br/>Choose whether to take or select a photo. Nothing is uploaded until you press <b>USE THIS PHOTO</b>.</div>
    <div className="camera-wrap">
      <video ref={videoRef} autoPlay muted playsInline />
      {!videoRef.current?.srcObject && <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',padding:28,textAlign:'center',color:'#8f97a8'}}>Camera preview will appear here after you allow camera access.</div>}
      <div className="camera-guide"/>
    </div>
    {error && <div className="disclaimer" style={{margin:0,color:'#ff969d'}}>{error}</div>}
    <button className="primary" onClick={start} disabled={starting}><Camera size={18} style={{verticalAlign:'-3px',marginRight:6}}/>{starting ? 'OPENING CAMERA…' : 'OPEN CAMERA'}</button>
    <label className="secondary" style={{textAlign:'center',display:'block'}}><Upload size={17} style={{verticalAlign:'-3px',marginRight:6}}/> SELECT PHOTO<input type="file" accept="image/*" onChange={e => e.target.files?.[0] && chooseFile(e.target.files[0])} style={{display:'none'}}/></label>
  </div>;
}
