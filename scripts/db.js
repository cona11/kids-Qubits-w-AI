// Simple IndexedDB wrapper for the Quantum Learning app
const QuantumDB = (function () {
  const DB_NAME = 'QuantumDB';
  const DB_VERSION = 1;
  let db;

  function init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains('lessons')) d.createObjectStore('lessons', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('progress')) d.createObjectStore('progress', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('qaLogs')) d.createObjectStore('qaLogs', { autoIncrement: true });
      };
      req.onsuccess = (e) => { db = e.target.result; resolve(); };
      req.onerror = (e) => reject(e);
    });
  }

  function tx(storeName, mode = 'readonly') {
    return db.transaction(storeName, mode).objectStore(storeName);
  }

  async function seedLessons(lessons) {
    const store = tx('lessons', 'readwrite');
    for (const l of lessons) {
      store.put(l);
    }
  }

  function getAllLessons() {
    return new Promise((resolve, reject) => {
      const store = tx('lessons');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function saveProgress(id, progress) {
    return new Promise((resolve, reject) => {
      const store = tx('progress', 'readwrite');
      const req = store.put({ id, progress, updated: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  function getProgress(id) {
    return new Promise((resolve, reject) => {
      const store = tx('progress');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function saveQA(question, answer) {
    return new Promise((resolve, reject) => {
      const store = tx('qaLogs', 'readwrite');
      const req = store.add({ question, answer, time: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  function getAllData() {
    return Promise.all([getAllLessons(), (function(){
      return new Promise((resolve, reject) => {
        const store = tx('progress');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    })(), (function(){
      return new Promise((resolve, reject) => {
        const store = tx('qaLogs');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    })()]);
  }

  function importData(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        if (obj.lessons) await seedLessons(obj.lessons);
        if (obj.progress) {
          const store = tx('progress', 'readwrite');
          for (const p of obj.progress) store.put(p);
        }
        if (obj.qaLogs) {
          const store = tx('qaLogs', 'readwrite');
          for (const q of obj.qaLogs) store.add(q);
        }
        resolve();
      } catch (e) { reject(e); }
    });
  }

  return { init, seedLessons, getAllLessons, saveProgress, getProgress, saveQA, getAllData, importData };
})();
