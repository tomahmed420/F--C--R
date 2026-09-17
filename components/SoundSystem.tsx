'use client';

import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'boot' | 'camera' | 'shutter' | 'confirm' | 'scan' | 'complete' | 'click';

export default function SoundSystem({ enabled = true }: { enabled?: boolean }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const ensure = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = ctxRef.current || new AudioCtx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  }, [enabled]);

  const tone = useCallback((type: SoundType) => {
    const ctx = ensure();
    if (!ctx) return;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = type === 'scan' ? 'lowpass' : 'bandpass';
    filter.frequency.value = type === 'scan' ? 520 : 1100;
    filter.Q.value = 1.2;
    gain.connect(filter).connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, now);

    const osc = ctx.createOscillator();
    osc.type = type === 'shutter' ? 'square' : 'sine';
    osc.connect(gain);

    const presets: Record<SoundType, [number, number, number]> = {
      boot: [72, 118, 0.45],
      camera: [210, 420, 0.28],
      shutter: [75, 38, 0.16],
      confirm: [260, 520, 0.22],
      scan: [48, 62, 0.65],
      complete: [180, 420, 0.5],
      click: [420, 260, 0.08],
    };
    const [from, to, duration] = presets[type];
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), now + duration);
    gain.gain.exponentialRampToValueAtTime(type === 'scan' ? 0.025 : 0.11, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }, [ensure]);

  const startAmbient = useCallback(() => {
    const ctx = ensure();
    if (!ctx || ambientRef.current) return;
    const master = ctx.createGain();
    master.gain.value = 0.018;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 0.8;
    master.connect(filter).connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine'; osc2.type = 'triangle';
    osc1.frequency.value = 42; osc2.frequency.value = 57;
    osc1.connect(master); osc2.connect(master);
    osc1.start(); osc2.start();
    ambientRef.current = { osc1, osc2, gain: master };
  }, [ensure]);

  useEffect(() => () => {
    ambientRef.current?.osc1.stop();
    ambientRef.current?.osc2.stop();
    ctxRef.current?.close();
  }, []);

  useEffect(() => {
    const unlock = () => startAmbient();
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, [startAmbient]);

  return <button aria-label="Toggle sound" className="sound-toggle" onClick={() => { startAmbient(); tone('click'); }}>🔊</button>;
}

export { tone };
