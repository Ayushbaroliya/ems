# ems

Notes & Tracker frontend using Firebase

Quick setup
1. Open `notes.html` in this folder or serve the folder with a local static server.
2. Edit `notes.js` and replace `firebaseConfig` with your Firebase project configuration.
3. Ensure Firestore is enabled in your Firebase console and rules allow reads/writes for your testing environment.

Optional (serve with node):
```
npm install
npm run dev
```

Files added:
- `notes.html` — UI for notes, tasks, analytics
- `notes.js` — client app using Firestore (fill firebaseConfig)
- `styles.css` — basic styles

If you want a server-side integration (Firebase Admin), I can add a small Express server, but client-side Firestore keeps things simple.