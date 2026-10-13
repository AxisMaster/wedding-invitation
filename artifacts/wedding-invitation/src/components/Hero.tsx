import { motion } from 'framer-motion';
import { Botanical } from './Botanical';
import { invitationConfig, type Language } from '../invitation.config';

function GardenFountain({ opened }: { opened: boolean }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 300 106"
      className="mt-7 h-[92px] w-[250px] max-w-full"
      initial={false}
      animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 1.1, delay: opened ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <g fill="none" stroke="#6f7f5b" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 100c24-10 31-30 43-52m-36 34c-8-4-12-10-13-19 9 2 14 8 13 19m14-17c-8-6-10-13-7-22 8 4 11 11 7 22m-1 3c10-1 17-6 20-16-10 0-17 6-20 16M33 89c10 1 18-3 23-12-10-2-18 3-23 12"/>
        <path d="M283 100c-24-10-31-30-43-52m36 34c8-4 12-10 13-19-9 2-14 8-13 19m-14-17c8-6 10-13 7-22-8 4-11 11-7 22m1 3c-10-1-17-6-20-16 10 0 17 6 20 16m1 19c-10 1-18-3-23-12 10-2 18 3 23 12"/>
        <path d="M102 78c10 0 18-2 25-7m46 0c7 5 15 7 25 7M111 78c6 11 17 17 39 17s33-6 39-17m-70 3c13 7 49 7 62 0M150 34v21m0-31c-7 5-8 11 0 17 8-6 7-12 0-17Zm-29 28c15 1 30 1 58 0m-45 0c3 7 9 10 16 10s13-3 16-10m-34 33h36"/>
        <path className="paper-flourish" strokeWidth="1.3" d="M71 98c7-7 13-11 20-12m138 12c-7-7-13-11-20-12m-117 12c-3-7-2-12 4-17 5 5 5 10-4 17Zm96 0c3-7 2-12-4-17-5 5-5 10 4 17Z"/>
      </g>
      <g fill="#c9a227" opacity=".8">
        <circle cx="63" cy="36" r="2.4"/><circle cx="51" cy="26" r="1.8"/><circle cx="226" cy="36" r="2.4"/><circle cx="238" cy="26" r="1.8"/>
        <circle cx="81" cy="83" r="2"/><circle cx="218" cy="83" r="2"/><circle cx="150" cy="45" r="2.3"/>
      </g>
      <g fill="none" stroke="#b18a23" strokeWidth=".8" opacity=".85">
        <path d="M72 32c2-6 9-6 11 0-2 6-9 6-11 0Zm145 0c-2-6-9-6-11 0 2 6 9 6 11 0Z"/>
      </g>
    </motion.svg>
  );
}

export function Hero({ language, opened }: { language: Language; opened: boolean }) {
  const c = invitationConfig.copy;
  return <section data-testid="section-hero" className="relative flex min-h-[790px] flex-col items-center justify-center overflow-hidden px-8 pb-14 pt-24 text-center">
    <Botanical className="absolute start-[-28px] top-16 w-[126px] opacity-55" mirrored={language === 'ur'} />
    <Botanical className="absolute end-[-31px] top-28 w-[118px] opacity-45" mirrored={language !== 'ur'} />
    <span className={`small-caps-label mb-5 text-[12px] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : ''}`}>{c.heroEyebrow[language]}</span>
    <p className={`max-w-[310px] text-[19px] leading-relaxed text-[#63554d] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{c.inviteLine[language]}</p>
    <p className="mt-2 text-[17px] text-[#63554d]">{c.weddingOf[language]}</p>
    <motion.div initial={false} animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: .85, delay: opened ? .16 : 0, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 my-7">
      <h1 className="font-display text-[76px] leading-[.92] text-[#3e4a32] sm:text-[84px]">{c.nameAanya[language]}</h1>
      <span aria-hidden="true" className="my-2 block font-editorial text-[25px] italic text-[#80620f]">&</span>
      <h2 className="font-display text-[76px] leading-[.92] text-[#3e4a32] sm:text-[84px]">{c.nameZayd[language]}</h2>
    </motion.div>
    <p className={`text-[16px] leading-relaxed text-[#5f544c] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{c.parentsA[language]}</p>
    <p className={`text-[16px] leading-relaxed text-[#5f544c] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{c.parentsZ[language]}</p>
    <p className={`mt-3 text-[13px] tracking-[.06em] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : ''}`}>{c.professions[language]}</p>
    <div className="section-rule" />
    <p className="font-editorial text-[20px] text-[#3a2f2a]">{c.date[language]}</p>
    <p className={`mt-1 text-[16px] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{c.time[language]} · {c.venueShort[language]}</p>
    <GardenFountain opened={opened} />
    <a href="#scratch" data-testid="link-scroll-invitation" aria-label={c.scroll[language]} className="absolute bottom-8 flex flex-col items-center gap-1 text-[13px] tracking-wide text-[#3e4a32]">
      <span>{c.scroll[language]}</span><span aria-hidden="true" className="animate-bounce text-xl">⌄</span>
    </a>
  </section>;
}
