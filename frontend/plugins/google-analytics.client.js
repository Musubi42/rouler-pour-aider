export default defineNuxtPlugin((nuxtApp) => {
  // Load the Google Analytics script dynamically
  const scriptUrl = 'https://www.googletagmanager.com/gtag/js?id=G-79LN69ERRS';
  const scriptElement = document.createElement('script');
  scriptElement.async = true;
  scriptElement.src = scriptUrl;
  document.head.appendChild(scriptElement);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  // Once the script is loaded, initialize gtag with configurations
  scriptElement.onload = () => {
    gtag('js', new Date());
    gtag('config', 'G-79LN69ERRS');
  };
});