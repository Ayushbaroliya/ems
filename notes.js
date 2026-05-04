// notes.js — client-side app using Firebase Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'
import {
  getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot,
  query, orderBy, serverTimestamp, getDocs, updateDoc
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ...
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// UI refs
const notesSection = document.getElementById('notes-section')
const trackerSection = document.getElementById('tracker-section')
const analyticsSection = document.getElementById('analytics-section')
const notesList = document.getElementById('notes-list')
const tasksList = document.getElementById('tasks-list')
const analyticsOutput = document.getElementById('analytics-output')

// Navigation
document.getElementById('show-notes').onclick = () => { notesSection.classList.remove('hidden'); trackerSection.classList.add('hidden'); analyticsSection.classList.add('hidden') }
document.getElementById('show-tracker').onclick = () => { trackerSection.classList.remove('hidden'); notesSection.classList.add('hidden'); analyticsSection.classList.add('hidden') }
document.getElementById('show-analytics').onclick = () => { analyticsSection.classList.remove('hidden'); notesSection.classList.add('hidden'); trackerSection.classList.add('hidden'); renderAnalytics() }

// Notes: save
document.getElementById('note-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = document.getElementById('note-title').value.trim()
  const body = document.getElementById('note-body').value.trim()
  const author = document.getElementById('note-author').value.trim() || 'Unknown'
  if (!title || !body) return
  await addDoc(collection(db, 'notes'), { title, body, author, createdAt: serverTimestamp() })
  e.target.reset()
})

// Tasks: save
document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = document.getElementById('task-title').value.trim()
  const assignee = document.getElementById('task-assignee').value.trim()
  const due = document.getElementById('task-due').value || null
  const status = document.getElementById('task-status').value
  if (!title || !assignee) return
  await addDoc(collection(db, 'tasks'), { title, assignee, due, status, createdAt: serverTimestamp() })
  e.target.reset()
})

// Real-time listeners
const notesQuery = query(collection(db, 'notes'), orderBy('createdAt', 'desc'))
onSnapshot(notesQuery, snapshot => {
  notesList.innerHTML = ''
  snapshot.forEach(docSnap => {
    const data = docSnap.data()
    const li = document.createElement('li')
    li.className = 'card'
    li.innerHTML = `<div><strong>${escapeHtml(data.title)}</strong><div class="meta">by ${escapeHtml(data.author)} — ${data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : ''}</div><div>${escapeHtml(data.body)}</div></div>`
    const btns = document.createElement('div')
    const del = document.createElement('button')
    del.textContent = 'Delete'
    del.className = 'small-btn'
    del.onclick = () => deleteDoc(doc(db, 'notes', docSnap.id))
    btns.appendChild(del)
    li.appendChild(btns)
    notesList.appendChild(li)
  })
})

const tasksQuery = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
onSnapshot(tasksQuery, snapshot => {
  tasksList.innerHTML = ''
  snapshot.forEach(docSnap => {
    const d = docSnap.data()
    const li = document.createElement('li')
    li.className = 'card'
    const dueText = d.due ? `Due: ${d.due}` : ''
    li.innerHTML = `<div><strong>${escapeHtml(d.title)}</strong><div class="meta">Assignee: ${escapeHtml(d.assignee)} ${dueText} — Status: ${escapeHtml(d.status)}</div></div>`
    const btns = document.createElement('div')
    const toggle = document.createElement('button')
    toggle.textContent = d.status === 'done' ? 'Mark Todo' : 'Mark Done'
    toggle.className = 'small-btn'
    toggle.onclick = async () => { await updateDoc(doc(db, 'tasks', docSnap.id), { status: d.status === 'done' ? 'todo' : 'done' }) }
    const del = document.createElement('button')
    del.textContent = 'Delete'
    del.className = 'small-btn'
    del.onclick = () => deleteDoc(doc(db, 'tasks', docSnap.id))
    btns.appendChild(toggle); btns.appendChild(del)
    li.appendChild(btns)
    tasksList.appendChild(li)
  })
})

// Notifications: show toast / browser notification on new note
onSnapshot(notesQuery, snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const d = change.doc.data()
      showNotification(`New note: ${d.title}`, `${d.author}: ${truncate(d.body, 120)}`)
    }
  })
})

// Analytics renderer
async function renderAnalytics(){
  const tasksSnap = await getDocs(collection(db, 'tasks'))
  const byUser = {}
  const now = new Date()
  tasksSnap.forEach(s => {
    const t = s.data()
    const name = t.assignee || 'Unknown'
    if (!byUser[name]) byUser[name] = { done:0, total:0, overdue:0, items:[] }
    byUser[name].total++
    if (t.status === 'done') byUser[name].done++
    if (t.due && new Date(t.due) < now && t.status !== 'done') byUser[name].overdue++
    byUser[name].items.push(t.title)
  })
  analyticsOutput.innerHTML = ''
  for (const [user, stats] of Object.entries(byUser)){
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<strong>${escapeHtml(user)}</strong><div class="meta">Done: ${stats.done} / ${stats.total} — Overdue: ${stats.overdue}</div><div>Items: ${stats.items.map(i=>escapeHtml(i)).join(', ')}</div>`
    analyticsOutput.appendChild(div)
  }
}

// Utilities
function escapeHtml(s){ if(!s) return ''; return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') }
function truncate(s,n){ return s && s.length>n? s.slice(0,n)+'…': s }

// Simple notification helper
function showNotification(title, body){
  // in-page toast (console fallback)
  console.info('Notify:', title, body)
  if (Notification && Notification.permission === 'granted'){
    new Notification(title, { body })
  } else if (Notification && Notification.permission !== 'denied'){
    Notification.requestPermission().then(p=>{ if (p==='granted') new Notification(title,{body}) })
  }
}

// Ask for notification permission on load
if (Notification && Notification.permission !== 'granted' && Notification.permission !== 'denied'){
  Notification.requestPermission().catch(()=>{})
}
