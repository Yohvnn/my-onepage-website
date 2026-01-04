# [YohannStudio](https://yohanncch.studio/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Studio Features

- Home/Resume page at `/` and `/resume`
- Toolbox hub at `/toolbox` (Module Federation remotes)
- Photo Gallery at `/gallery`

### Gallery Setup

- Populate `public/gallery/index.json` with an array of images:

```
[
	{ "url": "https://cdn.example.com/photos/IMG_0001.jpg", "title": "Sunset", "location": "Paris" }
]
```

- For Azure: host originals in Azure Blob Storage, front them with Azure CDN, and point `url` to the CDN endpoint for best performance.

## Localization (i18n)

- Implemented via `vue-i18n` with messages in `src/locales/en.json` and `src/locales/fr.json`.
- Initialization: see `src/i18n.js`; locale auto-detected from browser or `localStorage.locale`.
- Usage in templates: `{{ $t('home.aboutTitle') }}`; interpolate values like `{{ $t('home.copyright', { year: new Date().getFullYear() }) }}`.
- To switch language programmatically:

```js
// in a component script
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
locale.value = 'fr' // or 'en'
localStorage.setItem('locale', 'fr')
```
