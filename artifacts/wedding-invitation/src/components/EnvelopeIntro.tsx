import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Botanical } from './Botanical';
import { invitationConfig, type Language } from '../invitation.config';

type EnvelopeIntroProps = {
  language: Language;
  onOpen: () => void;
  onFirstGesture: () => void;
  opened: boolean;
};

function SealMark({ initials }: { initials: string }) {
  return (
    <span aria-hidden="true" className="seal-scallop relative inline-flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#c9a227]">
      <svg viewBox="0 0 100 100" className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)]">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#b18a23" strokeWidth="1.2" strokeDasharray="1.4 3.3" strokeLinecap="round" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#fff4e8" strokeOpacity=".65" strokeWidth="1" />
        <path className="paper-flourish" strokeWidth="1.5" d="M50 31c-5-8-15-7-15 1 0 7 9 12 15 18 6-6 15-11 15-18 0-8-10-9-15-1Zm0 23v12m-8-5c2-4 5-6 8-7 3 1 6 3 8 7M41 76c5-4 13-4 18 0" opacity=".76" />
      </svg>
      <span className="relative z-10 font-editorial text-[17px] italic leading-none text-[#3e4a32]">{initials}</span>
    </span>
  );
}

export function EnvelopeIntro({ language, onOpen, onFirstGesture, opened }: EnvelopeIntroProps) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [returnVisit, setReturnVisit] = useState(false);
  const copy = invitationConfig.copy;

  useEffect(() => {
    try {
      setReturnVisit(sessionStorage.getItem('wedding-invitation-opened') === 'yes');
    } catch {
      setReturnVisit(false);
    }
  }, []);

  const open = () => {
    if (opening || opened) return;
    setOpening(true);
    onFirstGesture();
    try {
      sessionStorage.setItem('wedding-invitation-opened', 'yes');
    } catch {
      // The intro still opens when session storage is unavailable.
    }
    try {
      if ('vibrate' in navigator) navigator.vibrate(30);
    } catch {
      // Haptics are optional and may be blocked by the browser.
    }
    if (reduce) {
      onOpen();
      return;
    }
    window.setTimeout(onOpen, returnVisit ? 400 : 1950);
  };

  const skipOpening = () => {
    if (opened) return;
    onFirstGesture();
    try {
      sessionStorage.setItem('wedding-invitation-opened', 'yes');
    } catch {
      // The visitor can continue without session storage.
    }
    onOpen();
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!opened && (event.key === 'Enter' || event.key === ' ')) {
        const target = event.target as HTMLElement;
        if (target?.tagName === 'BUTTON' || target?.tagName === 'INPUT') return;
        event.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={copy.openEnvelope[language]}
          data-testid="envelope-intro"
          className="fixed inset-0 z-40 flex min-h-[100dvh] items-center justify-center bg-[#f4cdb8] px-0 sm:px-5"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.55 }}
        >
          <div className="paper-grain embossed-green-paper relative flex min-h-[100dvh] w-full max-w-[480px] flex-col items-center justify-center overflow-hidden px-8 pt-[max(36px,env(safe-area-inset-top))] pb-[max(36px,env(safe-area-inset-bottom))] text-center">
            <Botanical className="absolute start-[-25px] top-[12%] w-32 opacity-35" mirrored={language === 'ur'} />
            <Botanical className="absolute bottom-[10%] end-[-30px] w-36 opacity-30" mirrored={language !== 'ur'} />
            <p className={`relative z-10 mb-7 text-[15px] italic tracking-[.12em] text-[#fbf4e9] ${language === 'ur' ? 'urdu-copy' : ''}`}>
              {copy.envelopeHint[language]}
            </p>
            <button
              type="button"
              onClick={open}
              disabled={opening}
              aria-label={copy.openEnvelope[language]}
              data-testid="button-open-envelope"
              className="relative z-10 w-full max-w-[300px] focus-visible:outline-offset-8"
            >
              <motion.div
                className="embossed-envelope relative aspect-[.68] overflow-visible rounded-[3px]"
                style={{ perspective: 1200 }}
                animate={opening && !reduce ? { x: [0, -2, 3, -2, 0], y: [0, 1, -1, 1, 0] } : {}}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-[9px] z-[2] border border-[#efe2b6]/45" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-[8%] start-1/2 z-[3] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#eee0b1]/40 to-transparent" />
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-40">
                  <Botanical className="absolute bottom-0 start-2 w-24" mirrored={language === 'ur'} />
                  <Botanical className="absolute bottom-0 end-2 w-24" mirrored={language !== 'ur'} />
                </div>
                <motion.div
                  aria-hidden="true"
                  className="envelope-curtain pointer-events-none absolute inset-y-0 start-0 z-[8] w-[25%] border-e border-[#d8c486]/50"
                  initial={false}
                  animate={opening && !reduce ? { x: language === 'ur' ? '100%' : '-100%', rotateY: language === 'ur' ? 20 : -20, opacity: 0 } : { x: 0, rotateY: 0, opacity: 1 }}
                  transition={{ duration: .72, delay: .08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: language === 'ur' ? 'right center' : 'left center', transformStyle: 'preserve-3d' }}
                />
                <motion.div
                  aria-hidden="true"
                  className="envelope-curtain pointer-events-none absolute inset-y-0 end-0 z-[8] w-[25%] border-s border-[#d8c486]/50"
                  initial={false}
                  animate={opening && !reduce ? { x: language === 'ur' ? '-100%' : '100%', rotateY: language === 'ur' ? -20 : 20, opacity: 0 } : { x: 0, rotateY: 0, opacity: 1 }}
                  transition={{ duration: .72, delay: .08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: language === 'ur' ? 'left center' : 'right center', transformStyle: 'preserve-3d' }}
                />
                <motion.div
                  className="embossed-invitation-card absolute inset-x-[9%] bottom-[8%] z-[5] flex h-[76%] flex-col items-center justify-end px-3 pb-[4%]"
                  animate={opening && !reduce ? { y: '-48%', scale: 2.8, opacity: 0.08 } : { y: 0, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 1.25, ease: [0.2, 0.7, 0.3, 1] }}
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-[9px] border border-[#b18a23]/35" />
                  <span className={`small-caps-label relative text-[10px] text-[#5b6a4a] ${language === 'ur' ? 'urdu-copy' : ''}`}>{copy.inviteEyebrow[language]}</span>
                  <span className="relative mt-4 font-display text-[31px] leading-none text-[#3e4a32]">{copy.coupleFooter[language]}</span>
                  <span aria-hidden="true" className="my-3 h-px w-12 bg-[#c9a227]/75" />
                  <span className="relative font-editorial text-[12px] text-[#3e4a32]">{copy.date[language]}</span>
                  <span className={`relative mt-1 text-[12px] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{copy.time[language]} · {copy.programTitle[language]}</span>
                  <svg aria-hidden="true" viewBox="0 0 84 24" className="pointer-events-none absolute top-3 h-6 w-[84px] opacity-65">
                    <path d="M3 20c15-1 20-15 37-14 17-1 22 13 41 14M12 19c1-7 5-11 12-13m48 13c-1-7-5-11-12-13M40 6c-3-5-10-4-10 1 0 4 5 6 10 10 5-4 10-6 10-10 0-5-7-6-10-1Z" fill="none" stroke="#b18a23" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  className="embossed-flap absolute inset-x-0 top-0 z-10 h-[63%] origin-top [clip-path:polygon(0_0,100%_0,50%_100%)]"
                  animate={opening && !reduce ? { rotateX: 175 } : { rotateX: 0 }}
                  transition={{ duration: reduce ? 0.25 : 0.7, ease: [0.7, 0, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'top' }}
                />
                <motion.div
                  className={`${opening ? '' : 'intro-pulse'} absolute start-1/2 top-[55%] z-20 flex h-[68px] w-[68px] -translate-x-1/2 items-center justify-center`}
                  animate={opening && !reduce ? { scale: 0.55, opacity: 0 } : {}}
                  transition={{ duration: 0.18 }}
                >
                  <SealMark initials={copy.sealInitials[language]} />
                </motion.div>
                {opening && !reduce && (
                  <>
                    <motion.div
                      aria-hidden="true"
                      className="absolute start-1/2 top-[55%] z-30 h-[68px] w-[68px] -translate-x-1/2 [clip-path:inset(0_50%_0_0_round_50%)]"
                      initial={{ opacity: 1 }}
                      animate={{ x: -33, y: 24, rotate: -26, opacity: 0 }}
                      transition={{ delay: 0.08, duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
                    >
                      <SealMark initials={copy.sealInitials[language]} />
                    </motion.div>
                    <motion.div
                      aria-hidden="true"
                      className="absolute start-1/2 top-[55%] z-30 h-[68px] w-[68px] -translate-x-1/2 [clip-path:inset(0_0_0_50%_round_50%)]"
                      initial={{ opacity: 1 }}
                      animate={{ x: 33, y: 24, rotate: 26, opacity: 0 }}
                      transition={{ delay: 0.08, duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
                    >
                      <SealMark initials={copy.sealInitials[language]} />
                    </motion.div>
                  </>
                )}
              </motion.div>
            </button>
            {!returnVisit && <p className={`relative z-10 mt-7 font-editorial text-[17px] italic text-[#fbf4e9] ${language === 'ur' ? 'urdu-copy' : ''}`}>{copy.tapToOpen[language]}</p>}
            {returnVisit && (
              <button
                type="button"
                onClick={skipOpening}
                data-testid="button-skip-intro"
                className="relative z-10 mt-3 rounded-full border border-[#fbf4e9]/55 px-4 py-2 text-[14px] text-[#fbf4e9] hover:bg-white/10"
              >
                {copy.skip[language]}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
