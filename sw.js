<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker == null) return;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New update available for Zaka Hub.');
              }
            };
          };
        })
        .catch(err => console.error('ServiceWorker registration failed: ', err));
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }

  function updateOfflineIndicator() {
    const isOnline = navigator.onLine;
    const badge = document.getElementById('network-status');
    if (badge) {
      badge.textContent = isOnline ? 'Online' : 'Offline Mode';
      badge.className = isOnline ? 'badge badge-success' : 'badge badge-high';
    }
  }

  window.addEventListener('online', updateOfflineIndicator);
  window.addEventListener('offline', updateOfflineIndicator);
</script>
