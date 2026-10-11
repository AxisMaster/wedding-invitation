import { useState } from 'react';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { invitationConfig, type Language } from '../invitation.config';

export function VenueDetails({language}:{language:Language}){
 const c=invitationConfig.copy;const [copied,setCopied]=useState(false);
 const copyCode=async()=>{try{await navigator.clipboard.writeText(invitationConfig.accommodation.bookingCode.en);setCopied(true);window.setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}};
 return <section data-testid="section-venue" className="px-6 py-14">
  <div className="text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a227]/50 text-[#6f7f5b]"><MapPin size={19} strokeWidth={1.4}/></div>
   <h2 className="mt-3 font-editorial text-[28px] text-[#3e4a32]">{c.venueTitle[language]}</h2>
  </div>
  <article className="mt-6 rounded-[20px] border border-[#c9a227]/25 bg-[#f8eddf] p-5 shadow-[0_9px_26px_rgba(79,57,39,.07)]">
   <p className="font-editorial text-[23px] text-[#3e4a32]">{c.venueName[language]}</p>
   <p className={`mt-2 text-[16px] leading-relaxed text-[#554a43] ${language==='ur'?'urdu-copy':''}`} data-testid="text-venue-address">{c.venueAddress[language]}</p>
    <a href={invitationConfig.venue.mapsUrl} target="_blank" rel="noreferrer" data-testid="link-map" aria-label={`${c.mapLink[language]}: ${c.venueName[language]}`} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#6f7f5b]/40 px-4 py-2 text-[14px] text-[#3e4a32]"><Navigation size={14}/>{c.mapLink[language]}</a>
   <p className={`mt-2 text-[12px] leading-relaxed text-[#73665e] ${language==='ur'?'urdu-copy':''}`}>{c.mapNote[language]}</p>
  </article>
  <div className="mt-4 grid gap-3">
   <article className="rounded-[18px] bg-[#e9e9d9] px-5 py-4"><h3 className="font-editorial text-[19px] text-[#3e4a32]">{c.shuttleTitle[language]}</h3><p className={`mt-1 text-[15px] leading-relaxed text-[#554a43] ${language==='ur'?'urdu-copy':''}`}>{c.shuttleText[language]}</p></article>
   <article className="rounded-[18px] bg-[#f3dfd2] px-5 py-4"><h3 className="font-editorial text-[19px] text-[#3e4a32]">{c.stayTitle[language]}</h3><p className={`mt-1 text-[15px] leading-relaxed text-[#554a43] ${language==='ur'?'urdu-copy':''}`}>{c.stayText[language]}</p>
    <button type="button" onClick={copyCode} data-testid="button-copy-booking-code" className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#6f7f5b]/40 bg-[#fbf4e9]/70 px-3 py-2 text-[13px] text-[#3e4a32]">{copied?<Check size={14}/>:<Copy size={14}/>}<span>{copied?c.copied[language]:c.copyCode[language]}</span><strong className="tracking-wider">{c.bookingCode[language]}</strong></button>
   </article>
  </div>
 </section>;
}
