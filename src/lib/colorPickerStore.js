import { defineStore } from 'pinia'

export const useColorPickerStore = defineStore('colorPicker', {
  state: () => ({
    isVisible: false,
    hexColor: '#000000',
    isValidHex: true,
    colorPresets: [
      '#000000', '#ffffff', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'
    ],
    defaultColor: '#3b82f6',
    showToast: false,
    toastMessage: '',
  }),
  getters: {
    filteredColorPresets: (state) => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      if (isDarkMode) {
        return state.colorPresets.filter(color => color !== '#000000');
      } else {
        return state.colorPresets.filter(color => color !== '#ffffff');
      }
    }
  },
  actions: {
    open() {
      this.isVisible = true
      this.loadCurrentColor()
    },
    close() {
      this.isVisible = false
    },
    setHexColor(val) {
      this.hexColor = val
      this.validateHex()
    },
    validateHex() {
      if (this.hexColor && !this.hexColor.startsWith('#')) {
        this.hexColor = '#' + this.hexColor;
      }
      this.isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.hexColor);
    },
    selectColor(color) {
      const isDarkMode = document.documentElement.classList.contains('dark');
      if (isDarkMode && color === '#000000') {
        this.showToastMessage("You can't do that! Black color is not allowed in dark mode.");
        return;
      }
      if (!isDarkMode && color === '#ffffff') {
        this.showToastMessage("You can't do that! White color is not allowed in light mode.");
        return;
      }
      this.hexColor = color;
      this.validateHex();
    },
    resetToDefault() {
      localStorage.removeItem('primaryColor');
      this.removePrimaryColorOverride();
      const isDarkMode = document.documentElement.classList.contains('dark');
      this.hexColor = isDarkMode ? '#ffffff' : '#000000';
      this.close();
    },
    applyColor() {
      if (this.isValidHex) {
        const isDarkMode = document.documentElement.classList.contains('dark');
        if (isDarkMode && this.hexColor.toLowerCase() === '#000000') {
          this.showToastMessage("You can't do that! Black color is not allowed in dark mode.");
          return;
        }
        if (!isDarkMode && this.hexColor.toLowerCase() === '#ffffff') {
          this.showToastMessage("You can't do that! White color is not allowed in light mode.");
          return;
        }
        
        this.setPrimaryColor(this.hexColor);
        localStorage.setItem('primaryColor', this.hexColor);
        this.close();
      }
    },
    loadCurrentColor() {
      const savedColor = localStorage.getItem('primaryColor');
      if (savedColor) {
        this.hexColor = savedColor;
      } else {
        const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        const isDarkMode = document.documentElement.classList.contains('dark');
        this.hexColor = currentColor || (isDarkMode ? '#ffffff' : '#000000');
      }
      this.validateHex();
    },
    setPrimaryColor(color) {
      let styleElement = document.getElementById('custom-primary-color');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'custom-primary-color';
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = `
        :root { --color-primary: ${color} !important; }
        .dark { --color-primary: ${color} !important; }
        html.dark { --color-primary: ${color} !important; }
        body.dark { --color-primary: ${color} !important; }
      `;
    },
    removePrimaryColorOverride() {
      const styleElement = document.getElementById('custom-primary-color');
      if (styleElement) {
        styleElement.remove();
      }
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    init() {
      // Load saved color on startup
      const savedColor = localStorage.getItem('primaryColor');
      if (savedColor) {
        this.setPrimaryColor(savedColor);
      }
    }
  }
})
