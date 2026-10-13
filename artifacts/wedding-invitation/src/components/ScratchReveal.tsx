import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { invitationConfig, type Language } from '../invitation.config';

type Shape = 'heart' | 'petal' | 'sparkle';
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  shape: Shape;
  rotation: number;
};

function traceHeart(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.beginPath();
  ctx.moveTo(width * 0.5, height * 0.94);
  ctx.bezierCurveTo(width * 0.38, height * 0.79, width * 0.02, height * 0.55, width * 0.02, height * 0.34);
  ctx.bezierCurveTo(width * 0.02, height * 0.08, width * 0.37, height * 0.04, width * 0.5, height * 0.28);
  ctx.bezierCurveTo(width * 0.63, height * 0.04, width * 0.98, height * 0.08, width * 0.98, height * 0.34);
  ctx.bezierCurveTo(width * 0.98, height * 0.55, width * 0.62, height * 0.79, width * 0.5, height * 0.94);
  ctx.closePath();
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.fillStyle = particle.color;
  if (particle.shape === 'petal') {
    ctx.beginPath();
    ctx.ellipse(0, 0, particle.size * 0.6, particle.size * 1.25, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (particle.shape === 'heart') {
    const s = particle.size;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.65);
    ctx.bezierCurveTo(-s * 1.1, -s * 0.05, -s * 0.55, -s * 0.85, 0, -s * 0.34);
    ctx.bezierCurveTo(s * 0.55, -s * 0.85, s * 1.1, -s * 0.05, 0, s * 0.65);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(0, -particle.size);
    ctx.lineTo(particle.size * 0.25, -particle.size * 0.25);
    ctx.lineTo(particle.size, 0);
    ctx.lineTo(particle.size * 0.25, particle.size * 0.25);
    ctx.lineTo(0, particle.size);
    ctx.lineTo(-particle.size * 0.25, particle.size * 0.25);
    ctx.lineTo(-particle.size, 0);
    ctx.lineTo(-particle.size * 0.25, -particle.size * 0.25);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function Confetti({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ['#c9a227', '#6f7f5b', '#f4cdb8', '#b98f70'];
    const shapes: Shape[] = ['heart', 'petal', 'sparkle'];
    const particles: Particle[] = Array.from({ length: 42 }, (_, index) => ({
      x: rect.width / 2,
      y: rect.height * 0.48,
      vx: (Math.random() - 0.5) * 4.8,
      vy: -Math.random() * 4.8 - 1,
      life: 1,
      color: colors[index % colors.length],
      size: 3 + Math.random() * 3.5,
      shape: shapes[index % shapes.length],
      rotation: Math.random() * Math.PI,
    }));
    let frame = 0;
    let animation = 0;
    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.12;
        particle.rotation += 0.035;
        particle.life -= 1 / 72;
        ctx.globalAlpha = Math.max(0, particle.life);
        drawParticle(ctx, particle);
      });
      ctx.globalAlpha = 1;
      frame += 1;
      if (frame < 72) animation = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animation);
  }, [active]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}

const revealStorageKey = 'wedding-invitation-date-revealed';

function readRevealedState() {
  try {
    return localStorage.getItem(revealStorageKey) === 'yes';
  } catch {
    return false;
  }
}

export function ScratchReveal({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const sampleOffsets = useRef<number[]>([]);
  const hasDrawnRef = useRef(false);
  const [revealed, setRevealed] = useState(readRevealedState);
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const [saved, setSaved] = useState(false);
  const [scratchSupported, setScratchSupported] = useState(true);
  const copy = invitationConfig.copy;

  const fullReveal = useCallback(() => {
    setRevealed(true);
    setProgress(1);
    try {
      localStorage.setItem(revealStorageKey, 'yes');
    } catch {
      // Continue without persistence when browser storage is unavailable.
    }
    if (!reduceMotion) {
      setBurst(true);
      window.setTimeout(() => setBurst(false), 1200);
    }
  }, [reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const previous = hasDrawnRef.current ? document.createElement('canvas') : null;
      if (previous) {
        previous.width = canvas.width;
        previous.height = canvas.height;
        previous.getContext('2d')?.drawImage(canvas, 0, 0);
      }
      canvas.width = Math.max(1, Math.round(box.width * dpr));
      canvas.height = Math.max(1, Math.round(box.height * dpr));
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        setScratchSupported(false);
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.save();
      traceHeart(ctx, box.width, box.height);
      ctx.clip();
      const foil = ctx.createLinearGradient(0, 0, box.width, box.height);
      foil.addColorStop(0, '#d8bd6a');
      foil.addColorStop(0.45, '#b8ac72');
      foil.addColorStop(1, '#889276');
      ctx.fillStyle = foil;
      ctx.fillRect(0, 0, box.width, box.height);
      for (let index = 0; index < 980; index += 1) {
        ctx.fillStyle = index % 4 === 0 ? 'rgba(255,248,218,.34)' : 'rgba(77,68,38,.12)';
        ctx.beginPath();
        ctx.arc(Math.random() * box.width, Math.random() * box.height, Math.random() * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      if (previous) {
        ctx.save();
        traceHeart(ctx, box.width, box.height);
        ctx.clip();
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(previous, 0, 0, box.width, box.height);
        ctx.restore();
      }
      hasDrawnRef.current = true;
      try {
        const alpha = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const samples: number[] = [];
        const step = Math.max(2, Math.floor(Math.min(canvas.width, canvas.height) / 60));
        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const offset = (y * canvas.width + x) * 4 + 3;
            if (alpha[offset] > 30) samples.push(offset);
          }
        }
        sampleOffsets.current = samples;
      } catch {
        setScratchSupported(false);
      }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, []);

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const current = point(event);
    ctx.save();
    traceHeart(ctx, canvas.clientWidth, canvas.clientHeight);
    ctx.clip();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(current.x, current.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // Keep the transform explicit after saving/restoring so DPR changes remain aligned.
    if (ctx.getTransform().a !== dpr) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    const indices = sampleOffsets.current;
    if (!canvas || !ctx || revealed || indices.length === 0) return;
    try {
      const alpha = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (const offset of indices) if (alpha[offset] < 30) cleared += 1;
      const ratio = cleared / indices.length;
      setProgress(ratio);
      if (ratio >= 0.55) fullReveal();
    } catch {
      setScratchSupported(false);
    }
  }, [fullReveal, revealed]);

  useEffect(() => {
    const interval = window.setInterval(checkProgress, 150);
    return () => window.clearInterval(interval);
  }, [checkProgress]);

  const openGoogleCalendar = () => {
    const start = new Date(invitationConfig.weddingDate);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, '');

    const title = encodeURIComponent(invitationConfig.event.title[language]);
    const location = encodeURIComponent(invitationConfig.event.venue[language]);
    const details = encodeURIComponent(
      `${invitationConfig.event.description[language]}\n\nVenue: ${invitationConfig.event.venue[language]}\nGoogle Maps: ${invitationConfig.venue.mapsUrl}`
    );
    const dates = `${formatUtc(start)}/${formatUtc(end)}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    setSaved(true);
  };

  return (
    <section id="scratch" data-testid="section-date-reveal" className="relative px-7 py-16 text-center">
      <div aria-hidden="true" className="ornament-divider text-[17px]">❧</div>
      <p className={`small-caps-label mt-5 text-[14px] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : ''}`}>{copy.scratchTitle[language]}</p>
      <p className={`mx-auto mt-2 max-w-[310px] text-[18px] leading-relaxed text-[#4a4038] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{copy.scratchHint[language]}</p>
      <div className="relative mx-auto mt-7 flex h-[220px] w-full max-w-[300px] items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[46%] border border-[#c9a227]/35 bg-[#f7eadb] px-6 shadow-[inset_0_0_0_7px_rgba(201,162,39,.08)]">
          <span className={`small-caps-label text-[14px] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : ''}`}>{copy.revealed[language]}</span>
          <strong className="font-editorial mt-2 text-[25px] leading-tight text-[#3e4a32]">{copy.date[language]}</strong>
          <span className="mt-1 text-[17px] italic text-[#3e4a32]">{copy.time[language]}</span>
        </div>
        <canvas
          ref={canvasRef}
          aria-label={copy.scratchHint[language]}
          data-testid="canvas-scratch-date"
          className={`reveal-canvas absolute inset-0 h-full w-full ${revealed || !scratchSupported ? 'pointer-events-none opacity-0' : 'cursor-crosshair opacity-100'}`}
          onPointerDown={(event) => {
            event.preventDefault();
            drawing.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            scratch(event);
          }}
          onPointerMove={(event) => {
            if (drawing.current) scratch(event);
          }}
          onPointerUp={() => {
            drawing.current = false;
            checkProgress();
          }}
          onPointerCancel={() => {
            drawing.current = false;
          }}
          onLostPointerCapture={() => {
            drawing.current = false;
          }}
        />
        <Confetti active={burst && !reduceMotion} />
      </div>
      {!revealed && (
        <button type="button" data-testid="button-reveal-date" onClick={fullReveal} className="mt-4 rounded-full border border-[#6f7f5b]/50 px-5 py-2 text-[15px] text-[#3e4a32] hover:bg-[#f4cdb8]/40">
          {copy.revealDate[language]}
          {progress > 0.02 && <span className="sr-only"> {Math.round(progress * 100)}%</span>}
        </button>
      )}
      {revealed && (
        <button
          type="button"
          data-testid="button-save-date"
          onClick={openGoogleCalendar}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#3e4a32] hover:bg-[#526447] px-6 py-3 text-[15px] font-medium tracking-wide text-[#fff8ed] shadow-md transition-all hover:scale-105"
        >
          <Calendar size={17} className="text-[#ffd700]" />
          <span>{saved ? '✓  ' : ''}{copy.saveDate[language]}</span>
        </button>
      )}
    </section>
  );
}
