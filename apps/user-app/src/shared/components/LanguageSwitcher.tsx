import { Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

export function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button 
      onClick={toggleLang}
      className="flex items-center gap-2 bg-surface border border-white/10 rounded-full px-3 py-1.5 shadow-md hover:bg-surface-raised transition-colors shrink-0"
    >
      <Globe className="w-4 h-4 text-gold" />
      <span className="text-xs font-bold text-white uppercase tracking-widest">{lang}</span>
    </button>
  );
}
