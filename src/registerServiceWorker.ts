// tslint:disable:no-console
async function tryToRegisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const { Workbox } = await import('workbox-window');

    const wb = new Workbox(`${process.env.BASE_URL}service-worker.js`);

    function installHandler(event: any) {
      console.debug('Service Worker Installed');

      if (event.isUpdate || event.type === 'externalinstalled') {
        document.dispatchEvent(
          new CustomEvent('swUpdated'),
        );
      }
    }

    wb.addEventListener('installed', installHandler);
    wb.addEventListener('externalinstalled', installHandler);

    let refreshing = false;

    function refreshHandler() {
      if (refreshing) {
        return;
      }
      refreshing = true;
      console.debug('Service Worker Refreshing');
      window.location.reload();
    }

    wb.addEventListener('controlling', refreshHandler);
    wb.addEventListener('externalactivated', refreshHandler);

    wb.register().then(registration => {
      console.debug('Service Worker Installed');

      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60);

      document.addEventListener('refreshApp', () => {
        if (!registration.waiting) {
          return;
        }

        registration.waiting.postMessage({type: 'SKIP_WAITING'});
      });
    });
  }
}

tryToRegisterServiceWorker();
