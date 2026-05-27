// Register service worker, initialize DB, seed lessons if needed
async function initializeApp() {
  if ('serviceWorker' in navigator) {
    try { await navigator.serviceWorker.register('/service-worker.js'); console.log('SW registered'); } catch (e) { console.warn('SW failed', e); }
  }

  await QuantumDB.init();

  // Seed lessons if empty
  const lessons = await QuantumDB.getAllLessons();
  if (!lessons || lessons.length === 0) {
    // fetch bundled lessons.json
    try {
      const resp = await fetch('/data/lessons.json');
      const obj = await resp.json();
      await QuantumDB.seedLessons(obj.lessons);
    } catch (e) { console.warn('Could not seed lessons', e); }
  }

  await loadLessonsUI();

  // Attach sync/export buttons
  document.getElementById('export-btn').addEventListener('click', () => Sync.exportData());
  document.getElementById('import-input').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (f) Sync.importFromFile(f);
  });
}

window.addEventListener('load', initializeApp);
