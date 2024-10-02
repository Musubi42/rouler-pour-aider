// plugins/clarity-plugin.ts

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://www.clarity.ms/tag/lmdfvteip5';
      script.onload = () => {
        // Initialize Clarity
        window.clarity = window.clarity || function() {
          (window.clarity.q = window.clarity.q || []).push(arguments);
        };
      };
      document.head.appendChild(script);
    }
});
