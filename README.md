# Quantum Learning Qubits App

This repository contains an offline-first Progressive Web App (PWA) that teaches kids basic quantum concepts (qubits, superposition, entanglement) with lessons, quizzes, and a simple AI tutor. All learning data and user progress are stored locally using IndexedDB so the app works offline on a single device (your phone).

How to use this app on a single phone (offline-ready):

1. Enable GitHub Pages for this repository (Settings → Pages → Source: main branch) so the app is hosted at `https://<your-username>.github.io/kids-Qubits-w-AI`.
2. Open the published site in your phone browser while online.
3. Add to Home Screen (Install) so the PWA is available offline. The service worker will precache lessons and assets.

If you prefer to run locally on the phone (developer mode or using a local server app):

- Start a static server in the project folder (e.g., `python3 -m http.server 3000` or `http-server -p 3000`).
- Visit `http://localhost:3000` or `https://localhost:3000` if you configure SSL.

Offline behavior:
- Lessons are seeded from `data/lessons.json` on first load and stored in IndexedDB.
- User progress and Q&A logs are stored locally in IndexedDB.
- You can export progress to a JSON file and import it back on the same device.

Files added/updated:
- index.html — main UI
- styles.css — styles
- app.js — app bootstrap + SW registration + DB seeding
- service-worker.js — precache and offline fallback
- data/lessons.json — bundled lessons and quizzes
- scripts/db.js — IndexedDB wrapper
- scripts/lessonsUI.js — lesson/quiz UI
- scripts/aiTutor.js — enhanced AI tutor using local lessons
- scripts/sync.js — export/import helpers
- assets/* — icons

Notes and limitations:
- For full PWA install and service worker support, use a secure context (HTTPS) or GitHub Pages.
- iOS Safari has limitations: service worker support requires HTTPS and some behaviors vary. Installing via 'Add to Home Screen' after visiting over HTTPS is recommended.

If you want automatic remote sync, provide a server API URL and I can add optional background sync. For now, the app is fully functional offline and all files have been added to this repository.
