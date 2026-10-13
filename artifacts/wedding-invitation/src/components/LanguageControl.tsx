import type { Language } from '../invitation.config';
import { invitationConfig } from '../invitation.config';

export function LanguageControl({ language, onToggle }: { language: Language; onToggle: () => void }) {
  return <button data-testid="button-language" type="button" onClick={onToggle} aria-label={invitationConfig.copy.language[language]} className="fixed z-50 bottom-[max(14px,env(safe-area-inset-bottom))] sm:bottom-[34px] start-[max(14px,calc((100vw-480px)/2+16px))] rounded-full border border-[#6f7f5b]/30 bg-[#fbf4e9]/95 px-4 py-2 text-[15px] tracking-[.04em] text-[#3e4a32] shadow-sm backdrop-blur">
    {invitationConfig.copy.language[language]}
  </button>;
}
