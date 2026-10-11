import { motion } from 'framer-motion';
import { Botanical } from './Botanical';
import { invitationConfig, type Language } from '../invitation.config';

export function Hero({ language }: { language: Language }) {
  const c = invitationConfig.copy;
  return <section data-testid="section-hero" className="relative flex min-h-[790px] flex-col items-center justify-center overflow-hidden px-8 pb-14 pt-24 text-center">
    <Botanical className="absolute start-[-28px] top-16 w-[126px] opacity-55" mirrored={language === 'ur'} />
    <Botanical className="absolute end-[-31px] top-28 w-[118px] opacity-45" mirrored={language !== 'ur'} />
    <span className={`small-caps-label mb-5 text-[12px] text-[#3e4a32] ${language === 'ur' ? 'urdu-copy' : ''}`}>{c.heroEyebrow[language]}</span>
    <p className={`max-w-[310px] text-[19px] leading-relaxed text-[#63554d] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>{c.inviteLine[language]}</p>
    <p className="mt-2 text-[17px] text-[#63554d]">{c.weddingOf[language]}</p>
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .2 }} className="relative z-10 my-7">
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
    <Botanical className="mt-8 h-[76px] w-[92px] rotate-180 opacity-75" />
    <a href="#scratch" data-testid="link-scroll-invitation" aria-label={c.scroll[language]} className="absolute bottom-8 flex flex-col items-center gap-1 text-[13px] tracking-wide text-[#3e4a32]">
      <span>{c.scroll[language]}</span><span aria-hidden="true" className="animate-bounce text-xl">⌄</span>
    </a>
  </section>;
}
