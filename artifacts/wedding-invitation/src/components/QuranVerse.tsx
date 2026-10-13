import { motion } from 'framer-motion';
import { invitationConfig, type Language } from '../invitation.config';

export function QuranVerse({ language }: { language: Language }) {
  const verse = invitationConfig.quran;

  return (
    <motion.section
      id="quran"
      data-testid="section-quran"
      className="px-6 py-14"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <article className="relative overflow-hidden rounded-[26px] border border-[#c9a227]/60 bg-[#142a4b] px-6 py-9 text-center text-[#fbf2dc] shadow-[0_18px_36px_rgba(23,36,58,.18)] sm:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-[9px] rounded-[19px] border border-[#d7b45c]/40" />
        <p
          lang="ar"
          dir="rtl"
          className="relative text-[24px] leading-[2.1] text-[#e3c77b]"
        >
          {verse.bismillah[language]}
        </p>
        <div aria-hidden="true" className="mx-auto my-5 h-px w-16 bg-[#c9a227]/75" />
        <h2 className={`relative font-editorial text-[22px] leading-relaxed text-[#fff8e9] ${language === 'ur' ? 'urdu-copy' : ''}`}>
          {verse.title[language]}
        </h2>
        <blockquote
          lang="ar"
          dir="rtl"
          className="relative mx-auto mt-5 max-w-[390px] text-[25px] leading-[2.25] text-[#fbf2dc] sm:text-[28px]"
        >
          {verse.arabic[language]}
        </blockquote>
        <p className={`relative mx-auto mt-5 max-w-[390px] text-[17px] leading-[1.9] text-[#f4e7ca] ${language === 'ur' ? 'urdu-copy' : 'font-editorial'}`}>
          {verse.translation[language]}
        </p>
        <cite className={`relative mt-5 block not-italic text-[15px] text-[#e3c77b] ${language === 'ur' ? 'urdu-copy' : 'small-caps-label'}`}>
          {verse.reference[language]}
        </cite>
      </article>
    </motion.section>
  );
}
