(function tryToUnregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      let unregistered = false;
      for (const registration of registrations) {
        registration.unregister();
        unregistered = true;
      }

      if (unregistered) {
        location.reload();
      }
    });
  }
})();
