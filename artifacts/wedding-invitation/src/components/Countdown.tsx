import { useEffect, useState } from 'react';
import { invitationConfig, type Language } from '../invitation.config';

type TimeLeft={days:number;hours:number;minutes:number;seconds:number;past:boolean};
type CalendarState = { time: TimeLeft | null; married: boolean };
function getTime():CalendarState {
  const target=new Date(invitationConfig.weddingDate);
  const now=new Date();
  const diff=target.getTime()-now.getTime();
  if(diff>0)return{married:false,time:{days:Math.floor(diff/86400000),hours:Math.floor(diff/3600000)%24,minutes:Math.floor(diff/60000)%60,seconds:Math.floor(diff/1000)%60,past:false}};
  const sameWeddingDay=new Intl.DateTimeFormat('en-CA',{timeZone:invitationConfig.formatting.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(target)===new Intl.DateTimeFormat('en-CA',{timeZone:invitationConfig.formatting.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  return{married:!sameWeddingDay,time:{days:0,hours:0,minutes:0,seconds:0,past:true}};
}
export function Countdown({language}:{language:Language}){
  const [calendar,setCalendar]=useState<CalendarState>({time:null,married:false});
  useEffect(()=>{setCalendar(getTime());const id=window.setInterval(()=>setCalendar(getTime()),1000);return()=>window.clearInterval(id)},[]);
  const c=invitationConfig.copy;
  const numberLocale=language==='ur'?invitationConfig.formatting.urduLocale:'en-US';
  const {time}=calendar;
  return <section data-testid="section-countdown" className="relative mx-5 my-8 overflow-hidden rounded-[24px] border border-[#c9a227]/30 bg-[#e9e9d8] px-5 py-8 text-center shadow-[0_12px_30px_rgba(62,74,50,.09)]">
    <span aria-hidden="true" className="absolute -start-5 -top-8 text-[90px] text-[#6f7f5b]/10">❧</span>
    <p className={`relative font-editorial text-[23px] text-[#3e4a32] ${language === 'en' ? 'italic' : 'urdu-copy'}`}>{c.countdownTitle[language]}</p>
    {!time?<div className="mx-auto mt-5 h-12 w-4/5 animate-pulse rounded-lg bg-[#6f7f5b]/10" aria-label={c.loadingCountdown[language]}/>:time.past?<p className={`mt-4 text-[17px] text-[#3e4a32] ${language==='ur'?'urdu-copy':''}`}>{calendar.married?c.married[language]:c.pastDate[language]}</p>:<div className="relative mt-5 grid grid-cols-4 gap-2">
      {([{n:time.days,k:'days'},{n:time.hours,k:'hours'},{n:time.minutes,k:'minutes'},{n:time.seconds,k:'seconds'}] as const).map(({n,k})=><div key={k} data-testid={`countdown-${k}`} className="rounded-xl bg-[#fbf4e9]/75 px-1 py-3"><strong className="block font-editorial text-[28px] leading-none tabular-nums text-[#3e4a32]">{new Intl.NumberFormat(numberLocale,{minimumIntegerDigits:2,useGrouping:false}).format(n)}</strong><span className={`mt-1 block whitespace-nowrap text-[14px] text-[#4a4038] ${language==='ur'?'urdu-copy':'small-caps-label'}`}>{c[k][language]}</span></div>)}
    </div>}
  </section>;
}
