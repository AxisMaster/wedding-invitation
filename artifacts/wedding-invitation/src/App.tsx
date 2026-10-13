import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setBaseUrl } from '@workspace/api-client-react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Volume2, VolumeX } from 'lucide-react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { Hero } from './components/Hero';
import { ScratchReveal } from './components/ScratchReveal';
import { Countdown } from './components/Countdown';
import { ProgramTimeline } from './components/ProgramTimeline';
import { VenueDetails } from './components/VenueDetails';
import { RsvpForm } from './components/RsvpForm';
import { LanguageControl } from './components/LanguageControl';
import { Botanical } from './components/Botanical';
import { invitationConfig, type Language } from './invitation.config';

const queryClient = new QueryClient();

function Invitation() {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('wedding-invitation-language') === 'ur' ? 'ur' : 'en'; } catch { return 'en'; }
  });
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const reduceMotion = useReducedMotion();
  const audioRef = useRef<{ context: AudioContext; gain: GainNode } | null>(null);
  const trackRef = useRef<HTMLAudioElement | null>(null);
  const c = invitationConfig.copy;
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.title = invitationConfig.meta.title[language];
    const metadata: Array<[string, string]> = [
      ['meta[name="description"]', invitationConfig.meta.description[language]],
      ['meta[property="og:title"]', invitationConfig.meta.title[language]],
      ['meta[property="og:description"]', invitationConfig.meta.description[language]],
      ['meta[property="og:image:alt"]', invitationConfig.meta.ogAlt[language]],
      ['meta[name="twitter:title"]', invitationConfig.meta.title[language]],
      ['meta[name="twitter:description"]', invitationConfig.meta.description[language]],
    ];
    metadata.forEach(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    });
  }, [language]);
  useEffect(() => {
    setBaseUrl(import.meta.env.VITE_API_BASE_URL || null);
  }, []);
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);
  const toggleLanguage = () => {
    setLanguage(current => {
      const next = current === 'en' ? 'ur' : 'en';
      try { localStorage.setItem('wedding-invitation-language', next); } catch { /* storage may be unavailable */ }
      return next;
    });
  };
  const startMusic = () => {
    try {
      if (!invitationConfig.music.placeholder) {
        const track = trackRef.current ?? new Audio(invitationConfig.music.audioFilePath);
        trackRef.current = track;
        track.loop = true;
        track.volume = 0.28;
        void track.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
        return;
      }
      const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;
      let audio = audioRef.current;
      if (!audio) {
        const context = new AudioContextCtor();
        const gain = context.createGain();
        gain.gain.value = .014;
        gain.connect(context.destination);
        [174.61, 261.63, 349.23].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const voice = context.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.value = frequency;
          voice.gain.value = index === 0 ? .28 : .12;
          oscillator.connect(voice); voice.connect(gain); oscillator.start();
        });
        audio = { context, gain }; audioRef.current = audio;
      }
      void audio.context.resume();
      audio.gain.gain.setTargetAtTime(.014, audio.context.currentTime, .55);
      setMusicOn(true);
    } catch { setMusicOn(false); }
  };
  const toggleMusic = () => {
    const track = trackRef.current;
    if (track) {
      if (musicOn) {
        track.pause();
        setMusicOn(false);
      } else {
        void track.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
      }
      return;
    }
    const audio = audioRef.current;
    if (!audio) { startMusic(); return; }
    const next = !musicOn;
    audio.gain.gain.setTargetAtTime(next ? .014 : 0, audio.context.currentTime, .18);
    if (next) void audio.context.resume();
    setMusicOn(next);
  };
  return <ErrorBoundary>
    <div className="invitation-shell paper-grain relative">
      <LanguageControl language={language} onToggle={toggleLanguage}/>
      <button type="button" onClick={toggleMusic} aria-pressed={musicOn} aria-label={musicOn ? c.mute[language] : c.unmute[language]} data-testid="button-mute-music" className="fixed z-50 top-[max(12px,env(safe-area-inset-top))] sm:top-[34px] end-[max(14px,calc((100vw-480px)/2+14px))] flex h-11 w-11 items-center justify-center rounded-full border border-[#6f7f5b]/30 bg-[#fbf4e9]/90 text-[#3e4a32] shadow-sm backdrop-blur" title={musicOn ? c.mute[language] : c.unmute[language]}>
        {musicOn ? <Volume2 size={18}/> : <VolumeX size={18}/>}
      </button>
      <EnvelopeIntro language={language} opened={opened} onOpen={() => setOpened(true)} onFirstGesture={startMusic}/>
      <motion.main
        dir={language === 'ur' ? 'rtl' : 'ltr'}
        aria-hidden={!opened}
        inert={!opened}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985 }}
        transition={{ duration: reduceMotion ? 0.4 : 0.72, delay: opened && !reduceMotion ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-[1] ${language === 'ur' ? 'urdu-copy' : ''}`}
      >
        <Hero language={language} opened={opened}/>
        <ScratchReveal language={language}/>
        <Countdown language={language}/>
        <ProgramTimeline language={language}/>
        <VenueDetails language={language}/>
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent"/>
        <RsvpForm language={language}/>
        <footer className="embroidered-footer relative overflow-hidden px-8 pb-[max(32px,env(safe-area-inset-bottom))] pt-12 text-center">
          <Botanical className="absolute -bottom-8 start-[-20px] w-28 opacity-30" mirrored={language === 'ur'} />
          <Botanical className="absolute -bottom-8 end-[-20px] w-28 opacity-30" mirrored={language !== 'ur'} />
          <p className="font-editorial text-[23px] italic text-[#3e4a32]">{c.celebrationTitle[language]}</p>
          <p className={`mx-auto mt-3 max-w-[290px] text-[16px] leading-relaxed text-[#62564e] ${language === 'ur' ? '' : 'italic'}`}>{c.celebration[language]}</p>
          <p className="mt-4 font-display text-[40px] leading-none text-[#3e4a32]">{c.coupleFooter[language]}</p>
          <p className="mt-5 text-[11px] tracking-[.16em] text-[#3e4a32]">{c.footer[language]}</p>
        </footer>
      </motion.main>
    </div>
  </ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><MotionConfig reducedMotion="user"><Invitation/><Toaster/></MotionConfig></TooltipProvider></QueryClientProvider>;
}

export default App;
