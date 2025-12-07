
import React, { useState, useRef, useEffect } from 'react';
import { Globe, Search, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian (Shqip)' },
  { code: 'am', name: 'Amharic (አማርኛ)' },
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'hy', name: 'Armenian (Հայերեն)' },
  { code: 'az', name: 'Azerbaijani (Azərbaycan)' },
  { code: 'eu', name: 'Basque (Euskara)' },
  { code: 'be', name: 'Belarusian (Беларуская)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'bs', name: 'Bosnian (Bosanski)' },
  { code: 'bg', name: 'Bulgarian (Български)' },
  { code: 'my', name: 'Burmese (မြန်မာဘာသာ)' },
  { code: 'ca', name: 'Catalan (Català)' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'zh', name: 'Chinese (Simplified) (简体中文)' },
  { code: 'hr', name: 'Croatian (Hrvatski)' },
  { code: 'cs', name: 'Czech (Čeština)' },
  { code: 'da', name: 'Danish (Dansk)' },
  { code: 'nl', name: 'Dutch (Nederlands)' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian (Eesti)' },
  { code: 'fil', name: 'Filipino (Tagalog)' },
  { code: 'fi', name: 'Finnish (Suomi)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'gl', name: 'Galician (Galego)' },
  { code: 'ka', name: 'Georgian (ქართული)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'el', name: 'Greek (Ελληνικά)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'ha', name: 'Hausa' },
  { code: 'he', name: 'Hebrew (עברית)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'hu', name: 'Hungarian (Magyar)' },
  { code: 'is', name: 'Icelandic (Íslenska)' },
  { code: 'ig', name: 'Igbo (Asụsụ Igbo)' },
  { code: 'id', name: 'Indonesian (Bahasa Indonesia)' },
  { code: 'ga', name: 'Irish (Gaeilge)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'jv', name: 'Javanese (Basa Jawa)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'kk', name: 'Kazakh (Қазақша)' },
  { code: 'km', name: 'Khmer (ភាសាខ្មែរ)' },
  { code: 'ko', name: 'Korean (한국어)' },
  { code: 'ky', name: 'Kyrgyz (Кыргызча)' },
  { code: 'lo', name: 'Lao (ພາສາລາວ)' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian (Latviešu)' },
  { code: 'lt', name: 'Lithuanian (Lietuvių)' },
  { code: 'lb', name: 'Luxembourgish (Lëtzebuergesch)' },
  { code: 'mk', name: 'Macedonian (Македонски)' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay (Bahasa Melayu)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'mt', name: 'Maltese (Malti)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'mn', name: 'Mongolian (Монгол)' },
  { code: 'ne', name: 'Nepali (नेपाली)' },
  { code: 'no', name: 'Norwegian (Norsk)' },
  { code: 'ps', name: 'Pashto (پښتو)' },
  { code: 'fa', name: 'Persian (فارسی)' },
  { code: 'pl', name: 'Polish (Polski)' },
  { code: 'pt', name: 'Portuguese (Português)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'ro', name: 'Romanian (Română)' },
  { code: 'ru', name: 'Russian (Русский)' },
  { code: 'sa', name: 'Sanskrit (संस्कृतम्)' },
  { code: 'gd', name: 'Scottish Gaelic (Gàidhlig)' },
  { code: 'sr', name: 'Serbian (Српски)' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi (سنڌي)' },
  { code: 'si', name: 'Sinhala (සිංහල)' },
  { code: 'sk', name: 'Slovak (Slovenčina)' },
  { code: 'sl', name: 'Slovenian (Slovenščina)' },
  { code: 'so', name: 'Somali (Soomaaliga)' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'su', name: 'Sundanese (Basa Sunda)' },
  { code: 'sw', name: 'Swahili (Kiswahili)' },
  { code: 'sv', name: 'Swedish (Svenska)' },
  { code: 'tg', name: 'Tajik (Тоҷикӣ)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'tt', name: 'Tatar (Татарча)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'th', name: 'Thai (ไทย)' },
  { code: 'ti', name: 'Tigrinya (ትግርኛ)' },
  { code: 'tr', name: 'Turkish (Türkçe)' },
  { code: 'uk', name: 'Ukrainian (Українська)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'ug', name: 'Uyghur (ئۇيغۇرچە)' },
  { code: 'uz', name: 'Uzbek (Oʻzbek)' },
  { code: 'vi', name: 'Vietnamese (Tiếng Việt)' },
  { code: 'cy', name: 'Welsh (Cymraeg)' },
  { code: 'xh', name: 'Xhosa (isiXhosa)' },
  { code: 'yi', name: 'Yiddish (ייִדיש)' },
  { code: 'yo', name: 'Yoruba (Èdè Yorùbá)' },
  { code: 'zu', name: 'Zulu (isiZulu)' }
].sort((a, b) => a.name.localeCompare(b.name));

interface Props {
  selectedLanguage: string;
  onSelect: (lang: string) => void;
}

export const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLangs = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase().trim()) || 
    l.code.toLowerCase().includes(search.toLowerCase().trim())
  );

  const currentLangName = LANGUAGES.find(l => l.name === selectedLanguage)?.name || selectedLanguage;

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white px-4 py-3 rounded-sm transition-all min-w-[200px] justify-between group"
      >
        <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400 group-hover:text-signal-orange transition-colors" />
            <span className="font-mono text-sm truncate max-w-[140px]">{currentLangName}</span>
        </div>
        <div className="w-2 h-2 border-r border-b border-gray-500 transform rotate-45 group-hover:border-signal-orange transition-colors mb-1"></div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] max-h-[400px] bg-[#0a0a0a] border border-gray-700 shadow-2xl z-50 flex flex-col rounded-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 border-b border-gray-800 sticky top-0 bg-[#0a0a0a]">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search languages..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-anthro-gray/50 border border-gray-800 text-white text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-signal-orange font-mono rounded-sm"
                    autoFocus
                />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-grow scrollbar-thin">
            {filteredLangs.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => {
                        onSelect(lang.name);
                        setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between border-b border-gray-800/50 last:border-0 transition-colors"
                >
                    <span>{lang.name}</span>
                    {selectedLanguage === lang.name && <Check className="w-3 h-3 text-signal-green" />}
                </button>
            ))}
            {filteredLangs.length === 0 && (
                <div className="p-4 text-center text-xs text-gray-500 font-mono">
                    NO LANGUAGE FOUND
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
