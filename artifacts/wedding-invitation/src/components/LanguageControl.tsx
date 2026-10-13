import type { Language } from '../invitation.config';
import { invitationConfig } from '../invitation.config';

export function LanguageControl({ language, onToggle }: { language: Language; onToggle: () => void }) {
  return (
    <button
      data-testid="button-language"
      type="button"
      onClick={onToggle}
      aria-label={invitationConfig.copy.language[language]}
      className="fixed z-50 bottom-[max(16px,env(safe-area-inset-bottom))] sm:bottom-[34px] start-[max(16px,calc((100vw-480px)/2+16px))] flex items-center gap-1.5 rounded-full border border-[#d4af37]/45 bg-[#25321f]/75 hover:bg-[#25321f]/90 px-4 py-2 text-[14px] font-medium tracking-[.04em] text-[#fbf5eb] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all hover:scale-105"
    >
      <span className="text-[#e6c66e]">🌐</span>
      <span>{invitationConfig.copy.language[language]}</span>
    </button>
  );
}
