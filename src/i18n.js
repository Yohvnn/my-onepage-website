import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

function detectLocale() {
  const saved = localStorage.getItem('locale')
  if (saved) return saved
  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('fr')) return 'fr'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { en, fr }
})

export default i18n
