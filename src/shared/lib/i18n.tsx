import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'am';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Shared
    profile: "My Dashboard",
    desc: "Manage account, affiliate stats & rewards.",
    streak: "Daily Login Streak",
    cashback: "Daily Cashback",
    invite: "Invite & Earn",
    inviteDesc: "Get 20% of friends' first deposit!",
    promos: "Active Bonuses",
    recent: "Recent Activity",
    deposit: "Deposit",
    withdraw: "Withdraw",
    logout: "Secure Log Out",
    // Wallet
    totalBalance: "Total Balance",
    trendingNow: "Trending Now",
    multiHotSlots: "Multi Hot Slots 🎰",
    allGames: "All Games",
    exploreLibrary: "Explore our entire library",
    loadMore: "Load More Games",
    search: "Search games...",
    availableIn: "Available in",
    redeem: "Redeem",
    promoCode: "PROMO",
    apply: "GO",
    seeAll: "See All",
    more: "More",
  },
  am: {
    // Shared
    profile: "የእኔ ዳሽቦርድ",
    desc: "አካውንት እና ሽልማቶችን ያስተዳድሩ",
    streak: "ዕለታዊ ሎጊን",
    cashback: "ዕለታዊ ተመላሽ",
    invite: "ጋብዘው ይሸለሙ",
    inviteDesc: "ከጓደኛዎ የመጀመሪያ ዴፖዚት 20% ያግኙ!",
    promos: "ንቁ ቦነስ",
    recent: "የቅርብ ጊዜ እንቅስቃሴ",
    deposit: "ገንዘብ አስገባ",
    withdraw: "ገንዘብ አውጣ",
    logout: "ውጣ (Log Out)",
    // Wallet
    totalBalance: "ጠቅላላ ቀሪ ሂሳብ",
    trendingNow: "አሁን ታዋቂ",
    multiHotSlots: "የተለያዩ ትኩስ ቦታዎች 🎰",
    allGames: "ሁሉም ጨዋታዎች",
    exploreLibrary: "አጠቃላይ ቤተ-መጽሐፍታችንን ያስሱ",
    loadMore: "ተጨማሪ ጨዋታዎችን ጫን",
    search: "ጨዋታዎችን ይፈልጉ...",
    availableIn: "በ ውስጥ ይገኛል",
    redeem: "መዋጀት",
    promoCode: "ፕሮሞ",
    apply: "አስገባ",
    seeAll: "ሁሉንም እይ",
    more: "ተጨማሪ",
  }
};

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'am' : 'en');
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
