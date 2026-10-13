import { MapPin, Navigation } from 'lucide-react';
import { invitationConfig, type Language } from '../invitation.config';

export function VenueDetails({ language }: { language: Language }) {
  const copy = invitationConfig.copy;
  return (
    <section data-testid="section-venue" className="px-6 py-14">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a227]/55 text-[#6f7f5b]">
          <MapPin size={20} strokeWidth={1.5} />
        </div>
        <h2 className="mt-4 font-editorial text-[30px] text-[#3e4a32]">{copy.venueTitle[language]}</h2>
      </div>
      <article className="mt-6 rounded-[22px] border border-[#c9a227]/35 bg-[#fffaf3] p-6 text-center shadow-[0_10px_28px_rgba(79,57,39,.09)]">
        <p className="font-editorial text-[25px] text-[#3e4a32]">{copy.venueName[language]}</p>
        <p className={`mt-2 text-[18px] leading-relaxed text-[#4a4038] ${language === 'ur' ? 'urdu-copy' : ''}`} data-testid="text-venue-address">
          {copy.venueAddress[language]}
        </p>
        <a
          href={invitationConfig.venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          data-testid="link-map"
          aria-label={`${copy.mapLink[language]}: ${copy.venueName[language]}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#6f7f5b]/45 px-5 py-2 text-[16px] text-[#3e4a32] focus-visible:outline-offset-4"
        >
          <Navigation size={16} aria-hidden="true" />
          {copy.mapLink[language]}
        </a>
      </article>
    </section>
  );
}
