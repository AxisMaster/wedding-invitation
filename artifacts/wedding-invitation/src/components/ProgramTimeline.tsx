import { motion } from 'framer-motion';
import { Heart, Utensils } from 'lucide-react';
import { invitationConfig, type Language } from '../invitation.config';
import { Botanical } from './Botanical';

const iconByName = { dinner: Utensils } as const;

export function ProgramTimeline({ language }: { language: Language }) {
  const copy = invitationConfig.copy;
  const locale = language === 'ur' ? invitationConfig.formatting.urduLocale : 'en-US';

  return (
    <section data-testid="section-program" className="relative overflow-hidden px-7 py-14">
      <Botanical className="absolute end-[-42px] top-20 w-32 opacity-25" mirrored={language !== 'ur'} />
      <div className="relative z-[1] text-center">
        <div className="ornament-divider text-[17px]">❧</div>
        <h2 className="mt-4 font-editorial text-[30px] text-[#3e4a32]">{copy.programTitle[language]}</h2>
        <p className={`mx-auto mt-2 max-w-[300px] text-[16px] text-[#62564e] ${language === 'ur' ? 'urdu-copy' : 'italic'}`}>
          {copy.programIntro[language]}
        </p>
      </div>
      <div className="relative mx-auto mt-8 max-w-[365px] before:absolute before:bottom-5 before:start-[13px] before:top-5 before:w-px before:bg-[#9ba486]/55">
        {invitationConfig.events.map((event, index) => {
          const Icon = iconByName[event.icon];
          const date = new Intl.DateTimeFormat(locale, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            timeZone: invitationConfig.formatting.timeZone,
          }).format(new Date(event.datetime));
          const time = new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: invitationConfig.formatting.timeZone,
          }).format(new Date(event.datetime));

          return (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              data-testid={`program-event-${event.id}`}
              className="relative grid grid-cols-[28px_1fr] items-start gap-3 py-3"
            >
              <span
                aria-hidden="true"
                className="z-10 mt-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#c9a227]/65 bg-[#fbf4e9] text-[#6f7f5b]"
              >
                <Heart size={13} fill="#6f7f5b" strokeWidth={1.4} />
              </span>
              <div className="rounded-2xl border border-[#6f7f5b]/20 bg-[#fffaf3]/85 px-4 py-3 shadow-[0_6px_18px_rgba(62,74,50,.07)]">
                <time dateTime={event.datetime} className="text-start text-[13px] tracking-wide text-[#3e4a32]">
                  {date}<span aria-hidden="true"> · </span>{time}
                </time>
                <div className="mt-1.5 flex items-start gap-2.5 text-start">
                  <Icon aria-hidden="true" className="mt-1 shrink-0 text-[#6f7f5b]" size={17} strokeWidth={1.6} />
                  <div>
                    <h3 className={`font-editorial text-[18px] text-[#3a2f2a] ${language === 'ur' ? 'urdu-copy' : ''}`}>
                      {event.title[language]}
                    </h3>
                    <p className={`mt-1 text-[14px] leading-relaxed text-[#62564e] ${language === 'ur' ? 'urdu-copy' : ''}`}>
                      {event.description[language]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
