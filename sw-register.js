try {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js')
  }
} catch (error) {
  console.error('error on SW registration')
}
