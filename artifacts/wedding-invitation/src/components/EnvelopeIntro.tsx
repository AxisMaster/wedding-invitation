import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Botanical } from './Botanical';
import { invitationConfig, type Language } from '../invitation.config';

type EnvelopeIntroProps = {
  language: Language;
  onOpen: () => void;
  onFirstGesture: () => void;
  opened: boolean;
};

// Generates gold sparkle particles that burst during unsealing
function generateSparkles(count = 28) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
    const distance = 45 + Math.random() * 95;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 25,
      size: 3 + Math.random() * 4.5,
      delay: 0.04 + Math.random() * 0.22,
      duration: 0.75 + Math.random() * 0.45,
      isStar: i % 3 === 0,
    };
  });
}

// Ornate Royal Baroque Cartouche Plaque SVG
function CartouchePlaque({
  initials,
  tapLabel,
  urdu,
  showRays,
}: {
  initials: string;
  tapLabel: string;
  urdu: boolean;
  showRays?: boolean;
}) {
  return (
    <div className="relative flex h-[190px] w-[142px] items-center justify-center select-none">
      <svg
        viewBox="0 0 142 190"
        className="absolute inset-0 h-full w-full overflow-visible"
        style={{
          filter:
            'drop-shadow(0 14px 26px rgba(20, 26, 15, 0.55)) drop-shadow(0 0 16px rgba(220, 180, 90, 0.35))',
        }}
      >
        <defs>
          <radialGradient id="cartoucheFill" cx="40%" cy="32%" r="76%">
            <stop offset="0%" stopColor="#fff9f3" />
            <stop offset="42%" stopColor="#fae4d4" />
            <stop offset="78%" stopColor="#efbea9" />
            <stop offset="100%" stopColor="#df9e86" />
          </radialGradient>
          <linearGradient id="cartoucheGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae59e" />
            <stop offset="25%" stopColor="#caa042" />
            <stop offset="50%" stopColor="#fff2be" />
            <stop offset="75%" stopColor="#b6892a" />
            <stop offset="100%" stopColor="#8d6414" />
          </linearGradient>
          <linearGradient id="cartoucheFoilInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c59832" />
            <stop offset="100%" stopColor="#8c6418" />
          </linearGradient>
        </defs>

        {/* Outer Baroque Scalloped Silhouette */}
        <path
          d="M 71 8
             C 82 8, 94 15, 103 23
             C 114 18, 128 26, 132 40
             C 137 53, 131 69, 126 79
             C 135 87, 137 103, 126 111
             C 131 121, 137 137, 132 150
             C 128 164, 114 172, 103 167
             C 94 175, 82 182, 71 182
             C 60 182, 48 175, 39 167
             C 28 172, 14 164, 10 150
             C 5 137, 11 121, 16 111
             C 5 103, 7 87, 16 79
             C 11 69, 5 53, 10 40
             C 14 26, 28 18, 39 23
             C 48 15, 60 8, 71 8 Z"
          fill="url(#cartoucheFill)"
          stroke="url(#cartoucheGold)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Concentric Inner Gilded Accent Border */}
        <path
          d="M 71 14
             C 80 14, 91 20, 99 28
             C 109 23, 120 30, 124 42
             C 128 53, 123 66, 119 75
             C 126 83, 128 97, 119 105
             C 123 114, 128 128, 124 139
             C 120 150, 109 157, 99 153
             C 91 160, 80 166, 71 166
             C 62 166, 51 160, 43 153
             C 33 157, 22 150, 18 139
             C 14 128, 19 114, 23 105
             C 14 97, 16 83, 23 75
             C 19 66, 14 53, 18 42
             C 22 30, 33 23, 43 28
             C 51 20, 62 14, 71 14 Z"
          fill="none"
          stroke="url(#cartoucheGold)"
          strokeWidth="1.1"
          strokeDasharray="2 3"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Top Heraldic Flourish */}
        <g stroke="url(#cartoucheFoilInner)" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
          <path d="M 71 23 v 11" />
          <path d="M 63 28 c 4 3, 8 1, 8 -3 c 0 4, 4 6, 8 3" />
          <circle cx="71" cy="20" r="1.8" fill="url(#cartoucheFoilInner)" stroke="none" />
          <circle cx="62" cy="28" r="1.3" fill="url(#cartoucheFoilInner)" stroke="none" />
          <circle cx="80" cy="28" r="1.3" fill="url(#cartoucheFoilInner)" stroke="none" />
        </g>

        {/* Bottom Heraldic Flourish */}
        <g stroke="url(#cartoucheFoilInner)" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
          <path d="M 71 167 v -11" />
          <path d="M 63 162 c 4 -3, 8 -1, 8 3 c 0 -4, 4 -6, 8 -3" />
          <circle cx="71" cy="170" r="1.8" fill="url(#cartoucheFoilInner)" stroke="none" />
          <circle cx="62" cy="162" r="1.3" fill="url(#cartoucheFoilInner)" stroke="none" />
          <circle cx="80" cy="162" r="1.3" fill="url(#cartoucheFoilInner)" stroke="none" />
        </g>

        {/* Center Ornamental Separator */}
        <g stroke="url(#cartoucheFoilInner)" fill="none" opacity="0.8">
          <line x1="43" y1="97" x2="59" y2="97" strokeWidth="0.8" />
          <line x1="83" y1="97" x2="99" y2="97" strokeWidth="0.8" />
          <polygon points="71,93 75,97 71,101 67,97" fill="url(#cartoucheFoilInner)" strokeWidth="0" />
          <circle cx="61" cy="97" r="1" fill="url(#cartoucheFoilInner)" stroke="none" />
          <circle cx="81" cy="97" r="1" fill="url(#cartoucheFoilInner)" stroke="none" />
        </g>
      </svg>

      {/* Cartouche Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Monogram Initials */}
        <span
          className={`font-editorial text-[27px] italic leading-none tracking-wider text-[#694b1a] ${
            urdu ? 'urdu-copy text-[24px]' : ''
          }`}
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.85), 0 -1px 0 rgba(110,65,25,0.25)' }}
        >
          {initials}
        </span>

        {/* Spacing for center diamond divider */}
        <div className="h-5" />

        {/* Action Callout */}
        <span
          className={`small-caps-label text-[10px] font-semibold tracking-[0.24em] text-[#78541c] ${
            urdu ? 'urdu-copy text-[12px] tracking-normal' : ''
          }`}
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}
        >
          {tapLabel}
        </span>
      </div>

      {showRays && (
        <motion.div
          className="pointer-events-none absolute inset-[-20%] rounded-full bg-gradient-to-tr from-[#ffeeb8]/80 to-transparent"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.95, 0], scale: [0.6, 1.4, 1.6] }}
          transition={{ duration: 0.55 }}
        />
      )}
    </div>
  );
}

export function EnvelopeIntro({ language, onOpen, onFirstGesture, opened }: EnvelopeIntroProps) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [returnVisit, setReturnVisit] = useState(false);
  const copy = invitationConfig.copy;
  const sparkles = useMemo(() => generateSparkles(28), []);

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
      // Ignored
    }
    try {
      if ('vibrate' in navigator) navigator.vibrate([40, 60, 40]);
    } catch {
      // Haptics optional
    }
    if (reduce) {
      onOpen();
      return;
    }
    window.setTimeout(onOpen, returnVisit ? 450 : 1350);
  };

  const skipOpening = () => {
    if (opened) return;
    onFirstGesture();
    try {
      sessionStorage.setItem('wedding-invitation-opened', 'yes');
    } catch {
      // Ignored
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
          className="fixed inset-0 z-40 flex min-h-[100dvh] items-center justify-center bg-[#212c1b] px-0 sm:px-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.3 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="paper-grain embossed-green-paper relative flex min-h-[100dvh] w-full max-w-[480px] flex-col items-center justify-between overflow-hidden px-6 pt-[max(28px,env(safe-area-inset-top))] pb-[max(28px,env(safe-area-inset-bottom))] text-center shadow-2xl">
            {/* Ambient Corner Botanicals with Gold Flecks */}
            <Botanical className="pointer-events-none absolute start-[-22px] top-[8%] w-36 opacity-35" mirrored={language === 'ur'} />
            <Botanical className="pointer-events-none absolute bottom-[6%] end-[-26px] w-40 opacity-30" mirrored={language !== 'ur'} />

            {/* Top Calligraphy Header */}
            <div className="relative z-10 w-full pt-2">
              <motion.p
                lang="ar"
                dir="rtl"
                className="mb-1 text-[27px] font-normal leading-[2] text-[#f7e6a7] drop-shadow-[0_2px_10px_rgba(201,162,39,0.38)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                {invitationConfig.quran.bismillah[language]}
              </motion.p>
              <motion.span
                className="mx-auto block h-px w-24 bg-gradient-to-r from-transparent via-[#ffd700]/60 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, delay: 0.3 }}
              />
            </div>

            {/* Main Interactive Gatefold Envelope Suite */}
            <div className="relative z-10 my-auto flex w-full max-w-[325px] flex-col items-center justify-center">
              <button
                type="button"
                onClick={open}
                disabled={opening}
                aria-label={copy.openEnvelope[language]}
                data-testid="button-open-envelope"
                className="group relative w-full cursor-pointer focus-visible:outline-offset-8"
              >
                <div
                  className="relative aspect-[0.67] w-full overflow-visible rounded-[6px]"
                  style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
                >
                  {/* Outer Gilded Box Frame */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[-3px] z-[1] rounded-[8px] border border-[#d4af37]/35 shadow-[0_20px_50px_rgba(15,22,12,0.6)]"
                  />

                  {/* Inner Royal Invitation Card (Revealed behind the gates) */}
                  <motion.div
                    className="embossed-invitation-card absolute inset-[3%] z-[4] flex h-[94%] flex-col items-center justify-center rounded-[4px] px-5 py-6"
                    animate={
                      opening && !reduce
                        ? { y: '-8%', scale: 1.045, opacity: 1 }
                        : { y: 0, scale: 0.99, opacity: 0.92 }
                    }
                    transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Double Gold Card Framing */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-[7px] border border-[#caa042]/55" />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-[11px] border border-[#caa042]/30" />

                    {/* Corner Ornaments */}
                    <div aria-hidden="true" className="pointer-events-none absolute top-2 start-2 text-[12px] text-[#caa042]/65">❖</div>
                    <div aria-hidden="true" className="pointer-events-none absolute top-2 end-2 text-[12px] text-[#caa042]/65">❖</div>
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-2 start-2 text-[12px] text-[#caa042]/65">❖</div>
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-2 end-2 text-[12px] text-[#caa042]/65">❖</div>

                    {/* Preview Content */}
                    <span className={`small-caps-label text-center text-[12px] tracking-[0.16em] text-[#6d5b4b] ${language === 'ur' ? 'urdu-copy' : ''}`}>
                      {copy.inviteEyebrow[language]}
                    </span>

                    <span className={`mt-3 font-display text-[30px] leading-tight text-[#2d3a24] ${language === 'ur' ? 'urdu-copy text-[26px]' : ''}`}>
                      {copy.coupleFooter[language]}
                    </span>

                    <div aria-hidden="true" className="my-2.5 flex items-center justify-center gap-2">
                      <span className="h-px w-6 bg-[#caa042]/60" />
                      <span className="text-[10px] text-[#caa042]">✦</span>
                      <span className="h-px w-6 bg-[#caa042]/60" />
                    </div>

                    <span className="font-editorial text-[14px] font-medium text-[#4a3f35]">
                      {copy.date[language]}
                    </span>

                    <span className={`mt-0.5 text-[13px] text-[#5c6e49] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>
                      {copy.time[language]} · {copy.venueShort[language]}
                    </span>
                  </motion.div>

                  {/* 3D Gatefold: LEFT DOOR */}
                  <motion.div
                    aria-hidden="true"
                    className="gatefold-panel pointer-events-none absolute inset-y-0 start-0 z-[10] w-1/2 rounded-s-[5px] border-e border-[#d4af37]/75"
                    initial={false}
                    animate={
                      opening && !reduce
                        ? { rotateY: language === 'ur' ? 115 : -115, opacity: 0.15 }
                        : { rotateY: 0, opacity: 1 }
                    }
                    transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      transformOrigin: language === 'ur' ? 'right center' : 'left center',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Inner gold border with corner brackets */}
                    <div className="absolute inset-[8px] end-0 border-y border-s border-[#e8c872]/45">
                      <div className="absolute top-1 start-1 text-[9px] text-[#ffd700]/70">⌜</div>
                      <div className="absolute bottom-1 start-1 text-[9px] text-[#ffd700]/70">⌞</div>
                    </div>
                    {/* Subtle shading overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
                  </motion.div>

                  {/* 3D Gatefold: RIGHT DOOR */}
                  <motion.div
                    aria-hidden="true"
                    className="gatefold-panel pointer-events-none absolute inset-y-0 end-0 z-[10] w-1/2 rounded-e-[5px] border-s border-[#d4af37]/75"
                    initial={false}
                    animate={
                      opening && !reduce
                        ? { rotateY: language === 'ur' ? -115 : 115, opacity: 0.15 }
                        : { rotateY: 0, opacity: 1 }
                    }
                    transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      transformOrigin: language === 'ur' ? 'left center' : 'right center',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Inner gold border with corner brackets */}
                    <div className="absolute inset-[8px] start-0 border-y border-e border-[#e8c872]/45">
                      <div className="absolute top-1 end-1 text-[9px] text-[#ffd700]/70">⌝</div>
                      <div className="absolute bottom-1 end-1 text-[9px] text-[#ffd700]/70">⌟</div>
                    </div>
                    {/* Subtle shading overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/30" />
                  </motion.div>

                  {/* Center Vertical Gold Seam Line (unopened) */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[2%] left-1/2 z-[11] w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#ffd700]/85 to-transparent"
                    animate={opening ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Central Baroque Cartouche Seal (Centered on the Gatefold Seam) */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 z-[25] pointer-events-none"
                    style={{ x: '-50%', y: '-50%' }}
                    animate={
                      opening && !reduce
                        ? { scale: [1, 1.1, 0.3], opacity: [1, 1, 0] }
                        : { scale: [1, 1.035, 1] }
                    }
                    transition={
                      opening && !reduce
                        ? { duration: 0.45, ease: 'easeOut' }
                        : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <CartouchePlaque
                      initials={copy.sealInitials[language]}
                      tapLabel={copy.tapToOpen[language]}
                      urdu={language === 'ur'}
                      showRays={opening}
                    />
                  </motion.div>

                  {/* Split Seal Halves Floating Apart with the Doors on Unseal */}
                  {opening && !reduce && (
                    <>
                      {/* Left Half Plaque */}
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 z-[24] [clip-path:inset(0_50%_0_0)]"
                        style={{ x: '-50%', y: '-50%' }}
                        initial={{ opacity: 1 }}
                        animate={{
                          x: language === 'ur' ? '15%' : '-115%',
                          y: '-40%',
                          rotate: language === 'ur' ? 18 : -18,
                          opacity: 0,
                        }}
                        transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <CartouchePlaque
                          initials={copy.sealInitials[language]}
                          tapLabel={copy.tapToOpen[language]}
                          urdu={language === 'ur'}
                        />
                      </motion.div>

                      {/* Right Half Plaque */}
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 z-[24] [clip-path:inset(0_0_0_50%)]"
                        style={{ x: '-50%', y: '-50%' }}
                        initial={{ opacity: 1 }}
                        animate={{
                          x: language === 'ur' ? '-115%' : '15%',
                          y: '-40%',
                          rotate: language === 'ur' ? -18 : 18,
                          opacity: 0,
                        }}
                        transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <CartouchePlaque
                          initials={copy.sealInitials[language]}
                          tapLabel={copy.tapToOpen[language]}
                          urdu={language === 'ur'}
                        />
                      </motion.div>
                    </>
                  )}

                  {/* Golden Sparkles Particle Burst */}
                  {opening && !reduce && (
                    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-[30]">
                      {sparkles.map((p) => (
                        <motion.span
                          key={p.id}
                          className="absolute rounded-full bg-gradient-to-tr from-[#caa042] via-[#ffd700] to-[#fffbe6] shadow-[0_0_8px_#ffd700]"
                          style={{
                            width: p.size,
                            height: p.size,
                            marginLeft: -p.size / 2,
                            marginTop: -p.size / 2,
                          }}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0.85, 0],
                            scale: [0, 1.5, 1, 0.2],
                            x: p.x,
                            y: p.y - 45,
                          }}
                          transition={{
                            duration: p.duration,
                            delay: p.delay,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {p.isStar && (
                            <span className="absolute -inset-1 text-[8px] text-[#fff6cc] drop-shadow-[0_0_4px_#ffd700]">
                              ✦
                            </span>
                          )}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Bottom Invitation Guidance & Skip */}
            <div className="relative z-10 flex flex-col items-center gap-2 pb-2">
              <motion.p
                className={`flex items-center gap-2 font-editorial text-[17px] italic tracking-wide text-[#fbf5eb] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
                  language === 'ur' ? 'urdu-copy text-[18px]' : ''
                }`}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[#ffd700] text-xs">✦</span>
                <span>{copy.tapToOpen[language]}</span>
                <span className="text-[#ffd700] text-xs">✦</span>
              </motion.p>

              {returnVisit && (
                <button
                  type="button"
                  onClick={skipOpening}
                  data-testid="button-skip-intro"
                  className="rounded-full border border-[#d4af37]/40 bg-[#25321f]/80 px-5 py-1.5 text-[13px] font-medium text-[#fbf5eb] shadow-md backdrop-blur-md transition-all hover:bg-[#25321f] hover:border-[#ffd700] hover:text-[#ffd700]"
                >
                  {copy.skip[language]}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
