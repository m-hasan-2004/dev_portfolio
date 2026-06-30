import { useAppStore } from "@/lib/store";

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

export function playPageTransition(ctx: AudioContext, time: number) {
  // Click: sine oscillator chirp
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, time);
  osc.frequency.exponentialRampToValueAtTime(800, time + 0.05);
  gain.gain.setValueAtTime(0.04, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.06);

  // Whoosh: filtered noise burst
  const duration = 0.12;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2000;
  filter.Q.value = 0.5;
  const wGain = ctx.createGain();
  wGain.gain.setValueAtTime(0.03, time);
  wGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  source.connect(filter).connect(wGain).connect(ctx.destination);
  source.start(time);
  source.stop(time + duration);
}

export function playUiClick() {
  if (!useAppStore.getState().soundEnabled) return;
  const ctx = getAudioContext();
  const time = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, time);
  osc.frequency.exponentialRampToValueAtTime(1200, time + 0.03);
  gain.gain.setValueAtTime(0.06, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  osc.connect(gain).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.04);
}
