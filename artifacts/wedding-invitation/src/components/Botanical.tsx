type BotanicalProps = { className?: string; mirrored?: boolean; label?: string };
export function Botanical({ className = '', mirrored = false, label = '' }: BotanicalProps) {
  return <svg aria-label={label || undefined} aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} className={className} viewBox="0 0 140 160" fill="none" style={mirrored ? { transform: 'scaleX(-1)' } : undefined}>
    <path className="leaf-line" d="M16 145C44 117 59 81 69 19M43 107C23 103 16 91 15 75c17 2 28 12 28 32Zm16-39C39 65 33 50 37 34c17 8 25 20 22 34Zm-3 60c21-7 34-20 39-38-21 2-35 13-39 38Zm10-41c20-8 31-22 34-40-20 4-32 17-34 40Zm6-35c16-8 24-21 24-37-17 5-26 17-24 37Z" />
    <path className="leaf-line" d="M20 142c32 0 61 4 94 13M86 134c5 11 14 16 26 16-3-12-11-18-26-16Z" opacity=".6"/>
  </svg>;
}
