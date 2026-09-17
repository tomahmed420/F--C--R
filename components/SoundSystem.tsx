'use client';

import { useCallback, useEffect, useRef } from 'react';

export type SoundType = 'boot' | 'camera' | 'shutter' | 'confirm' | 'scan' | 'complete' | 'click';

let sharedCtx: AudioContext | null = null;
let ambientStarted = false;

function getContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  sharedCtx ||= new AudioCtx();
  if (sharedCtx.state === 'suspended') void sharedCtx.resume();
  return sharedCtx;
}

export function startAmbient() {
  const ctx = getContext();
  if (!ctx || ambientStarted) return;
  ambientStarted = true;
  const master = ctx.createGain();
  master.gain.value = 0.018;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass'; filter.frequency.value = 180; filter.Q.value = 0.8;
  master.connect(filter).connect(ctx.destination);
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  osc1.type = 'sine'; osc2.type = 'triangle';
  osc1.frequency.value = 42; osc2.frequency.value = 57;
  osc1.connect(master); osc2.connect(master);
  osc1.start(); osc2.start();
}

export function playFCRSound(type: SoundType) {
  const ctx = getContext();
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
    boot: [72, 118, 0.45], camera: [210, 420, 0.28], shutter: [75, 38, 0.16],
    confirm: [260, 520, 0.22], scan: [48, 62, 0.65], complete: [180, 420, 0.5], click: [420, 260, 0.08],
  };
  const [from, to, duration] = presets[type];
  osc.frequency.setValueAtTime(from, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), now + duration);
  gain.gain.exponentialRampToValueAtTime(type === 'scan' ? 0.025 : 0.11, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.start(now); osc.stop(now + duration + 0.03);
}

export function useFCRSounds() {
  useEffect(() => {
    const unlock = () => startAmbient();
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, []);
  return { startAmbient, playFCRSound };
}

export default function SoundSystem() {
  useFCRSounds();
  return null;
}
