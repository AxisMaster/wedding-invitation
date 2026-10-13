import { useState, type FormEvent } from 'react';
import { useSubmitRsvp } from '@workspace/api-client-react';
import type { RsvpInput, RsvpInputAttendance, RsvpReceipt } from '@workspace/api-client-react';
import { invitationConfig, type Language } from '../invitation.config';

export function RsvpForm({language}:{language:Language}){
 const c=invitationConfig.copy;const mutation=useSubmitRsvp();
 const numeralLocale=language==='ur'?invitationConfig.formatting.urduLocale:'en-US';
 const [fullName,setFullName]=useState('');const [attendance,setAttendance]=useState<RsvpInputAttendance|''>('');
  const [guests,setGuests]=useState('1');const [website,setWebsite]=useState('');
 const [errors,setErrors]=useState({name:false,attendance:false});const [receipt,setReceipt]=useState<RsvpReceipt|null>(null);const [error,setError]=useState('');
 const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setError('');setReceipt(null);
  const next={name:!fullName.trim()||fullName.trim().length>120,attendance:!attendance};setErrors(next);
  if(next.name||next.attendance){setError(c.validationError[language]);return;}
   const data:RsvpInput={fullName:fullName.trim(),attendance:attendance as RsvpInputAttendance,guests:Number(guests),website:website.slice(0,200)};
  mutation.mutate({data},{onSuccess:(value)=>setReceipt(value),onError:()=>setError(c.submitError[language])});
 };
 return <section id="rsvp" data-testid="section-rsvp" className="px-6 py-14">
  <div className="text-center"><div className="ornament-divider">❧</div><h2 className="mt-4 font-editorial text-[30px] text-[#3e4a32]">{c.rsvpTitle[language]}</h2><p className={`mx-auto mt-2 max-w-[330px] text-[16px] leading-relaxed text-[#62564e] ${language==='ur'?'urdu-copy':'italic'}`}>{c.rsvpIntro[language]}</p></div>
   {receipt?<div role="status" data-testid="status-rsvp-success" className="mt-7 rounded-[20px] border border-[#6f7f5b]/35 bg-[#e9e9d9] px-5 py-6 text-center"><span className="font-editorial text-[24px] text-[#3e4a32]">{c.thankYou[language]}</span><p className={`mt-2 text-[15px] text-[#554a43] ${language==='ur'?'urdu-copy':''}`}>{receipt.stored?c.storedNote[language]:c.demoNote[language]}</p></div>:<form onSubmit={submit} noValidate className="mt-7 space-y-4">
    <div><label htmlFor="rsvp-name" className="mb-1 block text-[15px] text-[#3e4a32]">{c.fullName[language]} <span aria-hidden="true">*</span></label><input id="rsvp-name" data-testid="input-rsvp-name" className="form-control" autoComplete="name" maxLength={120} required value={fullName} onChange={e=>setFullName(e.target.value)} aria-invalid={errors.name} aria-describedby={errors.name?'rsvp-name-error':undefined}/>{errors.name&&<p id="rsvp-name-error" className="mt-1 text-[13px] text-[#9a3e31]">{c.requiredName[language]}</p>}</div>
    <fieldset aria-describedby={errors.attendance?'rsvp-attendance-error':undefined}><legend className="mb-2 text-[15px] text-[#3e4a32]">{c.attendance[language]} <span aria-hidden="true">*</span></legend><div className="grid gap-2">
     {(['yes','no','maybe'] as const).map((value,index)=><label key={value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#6f7f5b]/25 bg-[#fffaf3]/65 px-3 py-2.5 text-[15px]"><input data-testid={`radio-rsvp-${value}`} type="radio" name="attendance" value={value} checked={attendance===value} required={index===0} onChange={()=>setAttendance(value)} className="accent-[#3e4a32]"/><span className={language==='ur'?'urdu-copy':''}>{c[value][language]}</span></label>)}
    </div>{errors.attendance&&<p id="rsvp-attendance-error" className="mt-1 text-[13px] text-[#9a3e31]">{c.requiredAttendance[language]}</p>}</fieldset>
    <div><label htmlFor="rsvp-guests" className="mb-1 block text-[15px] text-[#3e4a32]">{c.guests[language]}</label><select id="rsvp-guests" data-testid="select-rsvp-guests" className="form-control" value={guests} onChange={e=>setGuests(e.target.value)}>{[1,2,3,4,5,6].map(n=><option value={n} key={n}>{new Intl.NumberFormat(numeralLocale).format(n)}</option>)}</select></div>
    <div className="absolute top-auto h-px w-px overflow-hidden" style={{insetInlineStart:'-10000px'}} aria-hidden="true"><label htmlFor="website">{c.honeypotLabel[language]}</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></div>
   {error&&<p role="alert" data-testid="status-rsvp-error" className="rounded-lg bg-[#f5e1dc] px-3 py-2 text-[14px] text-[#87372d]">{error}</p>}
    <button type="submit" disabled={mutation.isPending} aria-busy={mutation.isPending} data-testid="button-submit-rsvp" className="w-full rounded-full bg-[#3e4a32] px-6 py-3 text-[16px] tracking-wide text-[#fff8ed] shadow-md transition-colors hover:bg-[#526447] disabled:cursor-wait disabled:opacity-65">{mutation.isPending?c.sending[language]:c.submit[language]}</button>
   </form>}
   <p className={`mt-4 text-center text-[13px] leading-relaxed text-[#6c6058] ${language==='ur'?'urdu-copy':''}`}>{c.privacyNote[language]}</p>
 </section>;
}
