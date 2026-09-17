'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, RotateCcw, Check, Upload, Image as ImageIcon } from 'lucide-react';
import { useFCRSounds } from '@/components/SoundSystem';

export default function CameraCapture({ onCaptured }: { onCaptured: (dataUrl: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [starting, setStarting] = useState(false);
  const { startAmbient, playFCRSound } = useFCRSounds();

  const start = async () => {
    startAmbient(); playFCRSound('camera');
    setError(''); setStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError('Camera access was not granted. You can use Select Photo instead.');
    } finally { setStarting(false); }
  };

  useEffect(() => () => streamRef.current?.getTracks().forEach(t => t.stop()), []);

  const capture = () => {
    const video = videoRef.current; if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/jpeg', 0.84);
    playFCRSound('shutter'); setPreview(data);
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  const chooseFile = (file: File) => {
    if (!file.type.startsWith('image/')) return setError('Please select an image file.');
    if (file.size > 8 * 1024 * 1024) return setError('Please choose an image smaller than 8MB.');
    const reader = new FileReader(); reader.onload = () => { playFCRSound('camera'); setPreview(String(reader.result)); }; reader.readAsDataURL(file);
  };

  if (preview) return <div className="stack">
    <div className="camera-wrap"><img src={preview} alt="Selected subject" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
    <div className="disclaimer" style={{margin:0}}>Photo selected. It will only be used after you press <b>USE THIS PHOTO</b>.</div>
    <button className="secondary" onClick={() => { setPreview(''); start(); }}><RotateCcw size={17}/> RETAKE</button>
    <button className="primary" onClick={() => { startAmbient(); playFCRSound('confirm'); onCaptured(preview); }}><Check size={18}/> USE THIS PHOTO</button>
  </div>;

  return <div className="stack">
    <div className="disclaimer" style={{margin:0}}><b>PHOTO VERIFICATION</b><br/>Choose whether to take or select a photo. Nothing is used in the report until you press <b>USE THIS PHOTO</b>.</div>
    <div className="camera-wrap">
      <video ref={videoRef} autoPlay muted playsInline />
      {!videoRef.current?.srcObject && <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',padding:28,textAlign:'center',color:'#8f97a8'}}>Press <b style={{color:'#dfe3ea'}}>OPEN CAMERA</b> to start the preview.</div>}
      <div className="camera-guide"/>
    </div>
    {error && <div className="disclaimer" style={{margin:0,color:'#ff969d'}}>{error}</div>}
    <button className="primary" onClick={start} disabled={starting}><Camera size={18}/>{starting ? 'OPENING CAMERA…' : 'OPEN CAMERA'}</button>
    <label className="secondary" style={{textAlign:'center',display:'flex'}}><ImageIcon size={17}/> SELECT PHOTO<input type="file" accept="image/*" onChange={e => e.target.files?.[0] && chooseFile(e.target.files[0])} style={{display:'none'}}/></label>
  </div>;
}