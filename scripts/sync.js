// Export / Import / Sync helpers
const Sync = (function () {
  function exportData() {
    return QuantumDB.getAllData().then(([lessons, progress, qaLogs]) => {
      const data = { lessons, progress, qaLogs };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'quantum-data-export.json';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
  }

  function importFromFile(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const obj = JSON.parse(e.target.result);
      await QuantumDB.importData(obj);
      alert('Import complete.');
      await loadLessonsUI();
    };
    reader.readAsText(file);
  }

  return { exportData, importFromFile };
})();
