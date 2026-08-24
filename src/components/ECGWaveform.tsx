import { useRef, useEffect, useCallback } from 'react';

interface Props {
  patientId: string;
  heartRate: number;
}

export default function ECGWaveform({ patientId, heartRate }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dataRef = useRef<number[]>([]);

  const generateECGBeat = useCallback(() => {
    const samples: number[] = [];
    const baseline = 0;
    // P wave
    for (let i = 0; i < 12; i++) samples.push(baseline + Math.sin((i / 12) * Math.PI) * 0.15);
    // PR segment
    for (let i = 0; i < 8; i++) samples.push(baseline);
    // Q wave
    samples.push(baseline - 0.1);
    samples.push(baseline - 0.15);
    // R wave (sharp peak)
    samples.push(baseline + 0.3);
    samples.push(baseline + 1.0);
    samples.push(baseline + 0.3);
    // S wave
    samples.push(baseline - 0.25);
    samples.push(baseline - 0.1);
    // ST segment
    for (let i = 0; i < 10; i++) samples.push(baseline + 0.02);
    // T wave
    for (let i = 0; i < 16; i++) samples.push(baseline + Math.sin((i / 16) * Math.PI) * 0.25);
    // Baseline
    for (let i = 0; i < 20; i++) samples.push(baseline);
    return samples;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const beat = generateECGBeat();
    let beatPos = 0;

    const draw = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;
      const ampScale = h * 0.35;

      ctx.fillStyle = '#060b18';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(0,230,118,0.06)';
      ctx.lineWidth = 0.5;
      const gridSize = 20;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Add new samples based on heart rate
      const samplesPerFrame = Math.max(1, Math.round(heartRate / 60 * (beat.length / 60)));
      for (let i = 0; i < samplesPerFrame; i++) {
        dataRef.current.push(beat[beatPos % beat.length] + (Math.random() - 0.5) * 0.02);
        beatPos++;
      }

      const maxPoints = w;
      if (dataRef.current.length > maxPoints) {
        dataRef.current = dataRef.current.slice(dataRef.current.length - maxPoints);
      }

      // Draw waveform
      ctx.strokeStyle = '#00e676';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00e676';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      const data = dataRef.current;
      const xStep = w / maxPoints;
      for (let i = 0; i < data.length; i++) {
        const x = i * xStep;
        const y = midY - data[i] * ampScale;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Sweep line
      if (data.length > 1) {
        const sweepX = data.length * xStep;
        ctx.strokeStyle = 'rgba(0,230,118,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sweepX, 0); ctx.lineTo(sweepX, h); ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [heartRate, generateECGBeat]);

  return (
    <div className="icu-panel h-full relative overflow-hidden">
      <div className="icu-panel-header">
        <span className="vital-label">ECG Lead II</span>
        <span className="text-vital-green text-[10px]">{patientId}</span>
      </div>
      <div className="ecg-grid absolute inset-0 top-8">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      {/* HR overlay */}
      <div className="absolute top-10 right-4 text-right">
        <div className="vital-label">HEART RATE</div>
        <div className="text-3xl font-bold text-vital-green vital-value animate-beep">{heartRate}</div>
        <div className="text-[10px] text-gray-500">bpm</div>
      </div>
    </div>
  );
}