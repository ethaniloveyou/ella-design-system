import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { makeT } from '../content/dict';

// Spanish is the default — Ella is built for Spanish-speaking women first and
// the EN toggle is the alternative, not the other way round.
const DEFAULT_LANG = 'es';
const STORE_KEY = 'ella-lang';

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {}, t: makeT(DEFAULT_LANG) });

function initialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* private mode */
  }
  return navigator.language?.startsWith('en') ? 'en' : DEFAULT_LANG;
}

export function LangProvider({ children }) {
  // Always start at the default so the prerendered HTML and the first client
  // render agree; the stored/browser preference is applied right after.
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const preferred = initialLang();
    if (preferred !== DEFAULT_LANG) setLangState(preferred);
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORE_KEY, next);
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, isEs: lang === 'es', t: makeT(lang) }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
