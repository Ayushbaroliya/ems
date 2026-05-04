const fs = require('fs');
const indexFile = 'index1.html';

let content = fs.readFileSync(indexFile, 'utf8');

// 1. Add Nav Tab
if(!content.includes("showPage('clients',this)")) {
  content = content.replace(
    `<button class="nav-tab" onclick="showPage('dashboard',this)">Dashboard</button>`,
    `<button class="nav-tab" onclick="showPage('clients',this)">Clients</button>\n      <button class="nav-tab" onclick="showPage('dashboard',this)">Dashboard</button>`
  );
}

// 2. Add CSS
const cssToAdd = `
/* ── CLIENT CARDS GRID ── */
.clients-layout{display:grid;grid-template-columns:320px 1fr;gap:20px;align-items:start}
.client-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.client-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:18px;transition:border-color .2s,transform .15s;cursor:pointer}
.client-card:hover{border-color:var(--border2);transform:translateY(-2px)}
.client-card.selected{border-color:var(--accent);background:rgba(59,130,246,0.05)}
.cc-header{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.cc-avatar{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;flex-shrink:0}
.cc-name{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:var(--text1)}
.cc-sub{font-size:11px;color:var(--text3);margin-top:2px}
.cc-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.cc-stat{background:var(--surface2);border-radius:7px;padding:8px 10px;text-align:center}
.cc-stat-val{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;line-height:1}
.cc-stat-lbl{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.4px;margin-top:2px}
.progress-label{display:flex;justify-content:space-between;font-size:11px;color:var(--text3)}
.cc-actions{display:flex;gap:6px;margin-top:10px}

/* ── CALENDAR (Clients) ── */
.cal-container{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.cal-top-bar{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.cal-client-selector{display:flex;gap:6px;overflow-x:auto;flex:1}
.cal-client-pill{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid var(--border2);background:transparent;color:var(--text3);cursor:pointer;white-space:nowrap;transition:all .15s;font-family:'DM Sans',sans-serif}
.cal-client-pill.active{color:#fff;border-color:transparent}
.cal-day-chips{display:flex;flex-direction:column;gap:2px}
.cal-chip{padding:2px 5px;border-radius:4px;font-size:10px;font-weight:500;line-height:1.3;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}
.chip-pending{background:rgba(100,116,139,.2);color:#94a3b8}
.chip-editing{background:rgba(245,158,11,.15);color:#fcd34d}
.chip-review{background:rgba(99,102,241,.15);color:#a5b4fc}
.chip-uploaded{background:rgba(34,197,94,.12);color:#86efac}
.chip-scheduled{background:rgba(20,184,166,.12);color:#5eead4}
.cal-day-count{position:absolute;bottom:5px;right:6px;font-size:10px;color:var(--text3)}

/* ── VIDEO PANEL ── */
.video-panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.video-panel-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.video-list{padding:14px 16px;display:flex;flex-direction:column;gap:8px;max-height:600px;overflow-y:auto}
.video-list::-webkit-scrollbar{width:4px}
.video-list::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}
.video-item{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px 14px;transition:border-color .15s;animation:fadeIn .25s ease}
.video-item:hover{border-color:var(--border2)}
.vi-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px}
.vi-title{font-weight:500;font-size:13px;color:var(--text1);flex:1}
.vi-actions{display:flex;gap:4px;flex-shrink:0}
.vi-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:6px}
.vi-pill{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:500}
.sb-pending{background:rgba(100,116,139,.15);color:#94a3b8}.sb-pending::before{background:#94a3b8}
.sb-editing{background:rgba(245,158,11,.12);color:#fcd34d}.sb-editing::before{background:#fcd34d}
.sb-review{background:rgba(99,102,241,.12);color:#a5b4fc}.sb-review::before{background:#a5b4fc}
.sb-uploaded{background:rgba(34,197,94,.12);color:#86efac}.sb-uploaded::before{background:#86efac}
.sb-scheduled{background:rgba(20,184,166,.12);color:#5eead4}.sb-scheduled::before{background:#5eead4}
.legend{display:flex;gap:14px;flex-wrap:wrap;padding:12px 20px;border-top:1px solid var(--border);font-size:11px;color:var(--text3)}
.legend-item{display:flex;align-items:center;gap:5px}
.legend-dot{width:8px;height:8px;border-radius:2px}
.btn-amber{background:rgba(245,158,11,.12);color:#fcd34d;border:1px solid rgba(245,158,11,.25)}

@media(max-width:1100px){.clients-layout{grid-template-columns:1fr}}
`;

if(!content.includes(".clients-layout")) {
  content = content.replace('</style>', cssToAdd + '\n</style>');
}

// 3. Add HTML
const htmlToAdd = `
  <!-- ════════════════ CLIENTS PAGE ════════════════ -->
  <div class="page" id="page-clients">
    <div class="stats-row">
      <div class="stat"><div class="stat-label">Total Clients</div><div class="stat-value blue" id="s-clients">0</div></div>
      <div class="stat"><div class="stat-label">Videos This Month</div><div class="stat-value purple" id="s-total">0</div></div>
      <div class="stat"><div class="stat-label">Uploaded</div><div class="stat-value green" id="s-uploaded">0</div></div>
      <div class="stat"><div class="stat-label">In Progress</div><div class="stat-value amber" id="s-progress">0</div></div>
    </div>
    <div class="clients-layout" style="margin-bottom:24px">
      <div class="card">
        <div class="card-header"><span class="card-title">Add Client</span></div>
        <div class="card-body">
          <div class="form-group"><label class="form-label">Client Name</label><input id="cl-name" placeholder="e.g. K Mishra"></div>
          <div class="form-group"><label class="form-label">Monthly Video Target</label><input type="number" id="cl-target" placeholder="e.g. 12" min="1" max="500"></div>
          <div class="form-group"><label class="form-label">Category / Niche</label><input id="cl-niche" placeholder="e.g. Education, Fitness, Vlog…"></div>
          <div class="form-group"><label class="form-label">Color Theme</label>
            <div class="select-wrap"><select id="cl-color">
              <option value="#3b82f6">Blue</option><option value="#a855f7">Purple</option><option value="#22c55e">Green</option>
              <option value="#f59e0b">Amber</option><option value="#ef4444">Red</option><option value="#14b8a6">Teal</option>
              <option value="#ec4899">Pink</option><option value="#f97316">Orange</option>
            </select></div>
          </div>
          <div class="form-group"><label class="form-label">Notes</label><textarea id="cl-notes" placeholder="Any client-specific notes…"></textarea></div>
          <button class="btn btn-primary" onclick="addClient()">Add Client</button>
        </div>
      </div>
      <div>
        <div class="client-cards-grid" id="client-cards-grid">
          <div class="empty"><div class="empty-icon">⬡</div>No clients yet. Add your first client.</div>
        </div>
      </div>
    </div>
    <div class="cal-container" style="margin-bottom:20px">
      <div class="cal-top-bar">
        <div class="cal-client-selector" id="cal-client-selector"><span style="font-size:12px;color:var(--text3)">Select a client above to view their calendar</span></div>
        <div class="cal-nav">
          <button class="cal-nav-btn" onclick="calPrevVideo()">‹</button>
          <span class="cal-nav-title" id="cal-video-title">May 2026</span>
          <button class="cal-nav-btn" onclick="calNextVideo()">›</button>
        </div>
      </div>
      <div class="cal-grid">
        <div class="cal-weekdays">
          <div class="cal-wd">Sun</div><div class="cal-wd">Mon</div><div class="cal-wd">Tue</div>
          <div class="cal-wd">Wed</div><div class="cal-wd">Thu</div><div class="cal-wd">Fri</div><div class="cal-wd">Sat</div>
        </div>
        <div class="cal-days" id="cal-video-days"></div>
      </div>
      <div class="legend">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(100,116,139,.5)"></div>Pending</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,.6)"></div>Editing</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(99,102,241,.6)"></div>Review</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(20,184,166,.6)"></div>Scheduled</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,197,94,.6)"></div>Uploaded</div>
      </div>
    </div>
    <div class="video-panel">
      <div class="video-panel-header">
        <span class="card-title" id="video-panel-title">All Videos</span>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="month" id="vid-month-filter" style="width:auto;padding:5px 10px;font-size:12px">
          <button class="btn-sm btn-green" onclick="openAddVideoModal()">+ Add Video</button>
        </div>
      </div>
      <div class="filter-bar">
        <button class="filter-btn active" onclick="setVidFilter('all',this)">All</button>
        <button class="filter-btn" onclick="setVidFilter('Pending',this)">Pending</button>
        <button class="filter-btn" onclick="setVidFilter('Editing',this)">Editing</button>
        <button class="filter-btn" onclick="setVidFilter('Review',this)">Review</button>
        <button class="filter-btn" onclick="setVidFilter('Scheduled',this)">Scheduled</button>
        <button class="filter-btn" onclick="setVidFilter('Uploaded',this)">Uploaded</button>
      </div>
      <div class="video-list" id="video-list"><div class="empty"><div class="empty-icon">⬡</div>No videos yet</div></div>
    </div>
  </div>
`;

if(!content.includes('id="page-clients"')) {
  content = content.replace('</div>\n\n<!-- ── NOTE MODAL ── -->', htmlToAdd + '\n</div>\n\n<!-- ── NOTE MODAL ── -->');
}

const modalToAdd = `
<!-- ════ ADD VIDEO MODAL ════ -->
<div class="modal-overlay" id="videoModal" onclick="closeModalOutside(event)">
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-title" id="modal-title-text">Add Video</span>
      <button class="modal-close" onclick="closeVideoModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">Video Title / Topic</label><input id="vid-title" placeholder="e.g. Morning Routine Reel"></div>
      <div class="form-group"><label class="form-label">Client</label><div class="select-wrap"><select id="vid-client-sel"><option value="">— Select client —</option></select></div></div>
      <div class="form-group"><label class="form-label">Scheduled Upload Date</label><input type="date" id="vid-date"></div>
      <div class="form-group"><label class="form-label">Assigned Editor</label>
        <div class="select-wrap"><select id="vid-editor">
          <option value="">— Select editor —</option>
          <option>Atul</option><option>Ayush</option><option>Sneha</option><option>Sameer</option><option>Ujjwal</option><option>Vaishnavi</option>
        </select></div>
      </div>
      <div class="form-group"><label class="form-label">Status</label>
        <div class="select-wrap"><select id="vid-status"><option>Pending</option><option>Editing</option><option>Review</option><option>Scheduled</option><option>Uploaded</option></select></div>
      </div>
      <div class="form-group"><label class="form-label">Platform</label>
        <div class="select-wrap"><select id="vid-platform">
          <option value="">— Platform —</option><option>Instagram</option><option>YouTube</option><option>YouTube Shorts</option><option>Facebook</option><option>TikTok</option><option>LinkedIn</option><option>Multiple</option>
        </select></div>
      </div>
      <div class="form-group"><label class="form-label">Notes</label><textarea id="vid-notes" placeholder="Script notes..."></textarea></div>
      <button class="btn btn-primary" id="vid-submit-btn" onclick="submitVideo()">Save Video</button>
    </div>
  </div>
</div>
`;

if(!content.includes('id="videoModal"')) {
  content = content.replace('<!-- ── NOTE MODAL ── -->', modalToAdd + '\n<!-- ── NOTE MODAL ── -->');
}

// 4. Add JS logic
// We need to inject at the end of the first script block.
const jsToAdd = `
// ── CLIENTS / VIDEOS INIT ──
setTimeout(() => {
  const vidNow=new Date();
  document.getElementById('vid-date').value=vidNow.toISOString().split('T')[0];
  const cMo=vidNow.getFullYear()+'-'+String(vidNow.getMonth()+1).padStart(2,'0');
  document.getElementById('vid-month-filter').value=cMo;
  document.getElementById('vid-month-filter').addEventListener('change',renderAllClientsData);
  renderAllClientsData();
}, 500);

function loadClients(){try{return JSON.parse(localStorage.getItem('ems_clients')||'[]');}catch{return[];}}
function saveClients(d){localStorage.setItem('ems_clients',JSON.stringify(d));}
function loadVideos(){try{return JSON.parse(localStorage.getItem('ems_videos')||'[]');}catch{return[];}}
function saveVideos(d){localStorage.setItem('ems_videos',JSON.stringify(d));}

let clients=loadClients();
let videos=loadVideos();
let selectedClientId='all';
let calVidYear=new Date().getFullYear();
let calVidMonth=new Date().getMonth();
let vidFilter='all';
let editingVideoId=null;

function hexToRgba(hex,a){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return \`rgba(\${r},\${g},\${b},\${a})\`;}

window.addClient=function(){
  const name=document.getElementById('cl-name').value.trim();
  const target=parseInt(document.getElementById('cl-target').value)||0;
  const niche=document.getElementById('cl-niche').value.trim();
  const color=document.getElementById('cl-color').value;
  const notes=document.getElementById('cl-notes').value.trim();
  if(!name){showToast('Client name is required.','error');return;}
  clients.push({id:Date.now().toString(),name,target,niche,color,notes,createdAt:new Date().toISOString()});
  saveClients(clients);
  document.getElementById('cl-name').value='';
  document.getElementById('cl-target').value='';
  document.getElementById('cl-niche').value='';
  document.getElementById('cl-notes').value='';
  showToast('Client added!','success');
  renderAllClientsData();
};
window.deleteClient=function(id){
  if(!confirm('Delete this client?'))return;
  clients=clients.filter(c=>c.id!==id);
  videos=videos.filter(v=>v.clientId!==id);
  saveClients(clients);saveVideos(videos);
  if(selectedClientId===id)selectedClientId='all';
  showToast('Client deleted','');
  renderAllClientsData();
};
window.selectClient=function(id){selectedClientId=id;renderAllClientsData();};

window.openAddVideoModal=function(date){
  editingVideoId=null;
  document.getElementById('modal-title-text').textContent='Add Video';
  document.getElementById('vid-submit-btn').textContent='Save Video';
  document.getElementById('vid-title').value='';
  document.getElementById('vid-notes').value='';
  document.getElementById('vid-status').value='Pending';
  document.getElementById('vid-editor').value='';
  document.getElementById('vid-platform').value='';
  document.getElementById('vid-date').value=date||new Date().toISOString().split('T')[0];
  const sel=document.getElementById('vid-client-sel');
  sel.innerHTML='<option value="">— Select client —</option>';
  clients.forEach(c=>{
    const opt=document.createElement('option');
    opt.value=c.id;opt.textContent=c.name;
    if(c.id===selectedClientId&&selectedClientId!=='all')opt.selected=true;
    sel.appendChild(opt);
  });
  document.getElementById('videoModal').classList.add('open');
};

window.openEditVideo=function(id){
  const v=videos.find(x=>x.id===id);if(!v)return;
  editingVideoId=id;
  document.getElementById('modal-title-text').textContent='Edit Video';
  document.getElementById('vid-submit-btn').textContent='Update Video';
  document.getElementById('vid-title').value=v.title||'';
  document.getElementById('vid-date').value=v.date||'';
  document.getElementById('vid-status').value=v.status||'Pending';
  document.getElementById('vid-editor').value=v.editor||'';
  document.getElementById('vid-platform').value=v.platform||'';
  document.getElementById('vid-notes').value=v.notes||'';
  const sel=document.getElementById('vid-client-sel');
  sel.innerHTML='<option value="">— Select client —</option>';
  clients.forEach(c=>{
    const opt=document.createElement('option');
    opt.value=c.id;opt.textContent=c.name;
    if(c.id===v.clientId)opt.selected=true;
    sel.appendChild(opt);
  });
  document.getElementById('videoModal').classList.add('open');
};

window.submitVideo=function(){
  const title=document.getElementById('vid-title').value.trim();
  const clientId=document.getElementById('vid-client-sel').value;
  const date=document.getElementById('vid-date').value;
  const editor=document.getElementById('vid-editor').value;
  const status=document.getElementById('vid-status').value;
  const platform=document.getElementById('vid-platform').value;
  const notes=document.getElementById('vid-notes').value.trim();
  if(!title||!clientId||!date){showToast('Title, Client and Date are required.','error');return;}
  if(editingVideoId){
    const idx=videos.findIndex(v=>v.id===editingVideoId);
    if(idx>-1)videos[idx]={...videos[idx],title,clientId,date,editor,status,platform,notes,updatedAt:new Date().toISOString()};
    showToast('Video updated','success');
  }else{
    videos.push({id:Date.now().toString(),title,clientId,date,editor,status,platform,notes,createdAt:new Date().toISOString()});
    showToast('Video added!','success');
  }
  saveVideos(videos);
  closeVideoModal();
  renderAllClientsData();
};
window.deleteVideo=function(id){
  if(!confirm('Delete this video?'))return;
  videos=videos.filter(v=>v.id!==id);
  saveVideos(videos);showToast('Video deleted','');renderAllClientsData();
};
window.cycleVideoStatus=function(id){
  const v=videos.find(x=>x.id===id);if(!v)return;
  const cycle=['Pending','Editing','Review','Scheduled','Uploaded'];
  v.status=cycle[(cycle.indexOf(v.status)+1)%cycle.length];
  saveVideos(videos);renderAllClientsData();
};
window.closeVideoModal=function(){document.getElementById('videoModal').classList.remove('open');};
window.closeModalOutside=function(e){if(e.target===document.getElementById('videoModal'))closeVideoModal();};
window.setVidFilter=function(f,el){
  vidFilter=f;
  document.querySelectorAll('#video-panel-title ~ .filter-bar .filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderVideoList();
};
window.calPrevVideo=function(){calVidMonth--;if(calVidMonth<0){calVidMonth=11;calVidYear--;}renderVideoCal();}
window.calNextVideo=function(){calVidMonth++;if(calVidMonth>11){calVidMonth=0;calVidYear++;}renderVideoCal();}

function renderAllClientsData(){
  renderClientStats();
  renderClientCards();
  renderCalClientPills();
  renderVideoCal();
  renderVideoList();
}

function renderClientStats(){
  const mo=new Date().getMonth(),yr=new Date().getFullYear();
  const prefix=yr+'-'+String(mo+1).padStart(2,'0');
  const monthly=videos.filter(v=>v.date&&v.date.startsWith(prefix));
  const elClients=document.getElementById('s-clients'); if(elClients)elClients.textContent=clients.length;
  const elTotal=document.getElementById('s-total'); if(elTotal)elTotal.textContent=monthly.length;
  const elUploaded=document.getElementById('s-uploaded'); if(elUploaded)elUploaded.textContent=monthly.filter(v=>v.status==='Uploaded').length;
  const elProg=document.getElementById('s-progress'); if(elProg)elProg.textContent=monthly.filter(v=>v.status==='Editing'||v.status==='Review').length;
  const elPend=document.getElementById('s-pending'); if(elPend)elPend.textContent=monthly.filter(v=>v.status==='Pending'||v.status==='Scheduled').length;
}

function renderClientCards(){
  const grid=document.getElementById('client-cards-grid'); if(!grid)return;
  grid.innerHTML='';
  if(!clients.length){grid.innerHTML='<div class="empty" style="grid-column:1/-1"><div class="empty-icon">⬡</div>No clients yet. Add your first client.</div>';return;}
  const mo=new Date().getMonth(),yr=new Date().getFullYear();
  const prefix=yr+'-'+String(mo+1).padStart(2,'0');
  clients.forEach(c=>{
    const cVids=videos.filter(v=>v.clientId===c.id);
    const monthly=cVids.filter(v=>v.date&&v.date.startsWith(prefix));
    const done=monthly.filter(v=>v.status==='Uploaded').length;
    const inprog=monthly.filter(v=>v.status==='Editing'||v.status==='Review').length;
    const pend=monthly.filter(v=>v.status==='Pending'||v.status==='Scheduled').length;
    const target=c.target||1;
    const pct=Math.min(100,Math.round((done/target)*100));
    const isSelected=selectedClientId===c.id;
    const div=document.createElement('div');
    div.className='client-card'+(isSelected?' selected':'');
    div.onclick=()=>selectClient(isSelected?'all':c.id);
    div.innerHTML=\`
      <div class="cc-header">
        <div class="cc-avatar" style="background:\${hexToRgba(c.color,.15)};color:\${c.color}">\${c.name.slice(0,2).toUpperCase()}</div>
        <div>
          <div class="cc-name">\${esc(c.name)}</div>
          <div class="cc-sub">\${esc(c.niche||'Client')} · \${target} videos/mo</div>
        </div>
      </div>
      <div class="cc-stats">
        <div class="cc-stat"><div class="cc-stat-val" style="color:var(--green)">\${done}</div><div class="cc-stat-lbl">Done</div></div>
        <div class="cc-stat"><div class="cc-stat-val" style="color:var(--amber)">\${inprog}</div><div class="cc-stat-lbl">In Prog</div></div>
        <div class="cc-stat"><div class="cc-stat-val" style="color:var(--text2)">\${pend}</div><div class="cc-stat-lbl">Pending</div></div>
      </div>
      <div class="progress-label"><span>Monthly Progress</span><span style="color:\${c.color}">\${done}/\${target} · \${pct}%</span></div>
      <div class="progress-track" style="margin-top:5px;margin-bottom:4px">
        <div class="progress-fill" style="width:\${pct}%;background:linear-gradient(90deg,\${c.color},\${c.color}aa)"></div>
      </div>
      <div class="cc-actions">
        <button class="btn-sm btn-green" onclick="event.stopPropagation();selectedClientId='\${c.id}';openAddVideoModal()">+ Video</button>
        <button class="btn-sm btn-danger" onclick="event.stopPropagation();deleteClient('\${c.id}')">Delete</button>
      </div>\`;
    grid.appendChild(div);
  });
}

function renderCalClientPills(){
  const container=document.getElementById('cal-client-selector'); if(!container)return;
  container.innerHTML='';
  if(!clients.length){container.innerHTML='<span style="font-size:12px;color:var(--text3)">Add clients to view calendar</span>';return;}
  const all=document.createElement('button');
  all.className='cal-client-pill'+(selectedClientId==='all'?' active':'');
  all.textContent='All Clients';
  if(selectedClientId==='all')all.style.cssText='background:rgba(99,102,241,.2);border-color:#6366f1;color:#a5b4fc';
  all.onclick=()=>{selectedClientId='all';renderAllClientsData();};
  container.appendChild(all);
  clients.forEach(c=>{
    const btn=document.createElement('button');
    btn.className='cal-client-pill'+(selectedClientId===c.id?' active':'');
    btn.textContent=c.name;
    if(selectedClientId===c.id)btn.style.cssText=\`background:\${hexToRgba(c.color,.2)};border-color:\${c.color};color:\${c.color}\`;
    btn.onclick=()=>{selectedClientId=c.id;renderAllClientsData();};
    container.appendChild(btn);
  });
}

function renderVideoCal(){
  const title=document.getElementById('cal-video-title'); if(!title)return;
  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  title.textContent=monthNames[calVidMonth]+' '+calVidYear;
  const today=new Date().toISOString().split('T')[0];
  const firstDay=new Date(calVidYear,calVidMonth,1).getDay();
  const daysInMonth=new Date(calVidYear,calVidMonth+1,0).getDate();
  const prefix=calVidYear+'-'+String(calVidMonth+1).padStart(2,'0');
  let monthVids=videos.filter(v=>v.date&&v.date.startsWith(prefix));
  if(selectedClientId!=='all')monthVids=monthVids.filter(v=>v.clientId===selectedClientId);
  const grid=document.getElementById('cal-video-days');
  grid.innerHTML='';
  for(let i=0;i<firstDay;i++){const c=document.createElement('div');c.className='cal-day other-month';grid.appendChild(c);}
  const STATUS_CHIP={'Pending':'chip-pending','Editing':'chip-editing','Review':'chip-review','Scheduled':'chip-scheduled','Uploaded':'chip-uploaded'};
  for(let d=1;d<=daysInMonth;d++){
    const dateStr=calVidYear+'-'+String(calVidMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    const dayVids=monthVids.filter(v=>v.date===dateStr);
    const cell=document.createElement('div');
    let cls='cal-day';if(dateStr===today)cls+=' today';
    cell.className=cls;cell.onclick=()=>openAddVideoModal(dateStr);
    let chipsHtml='';
    const showMax=3;
    dayVids.slice(0,showMax).forEach(v=>{
      const client=clients.find(c=>c.id===v.clientId);
      const chipClass=STATUS_CHIP[v.status]||'chip-pending';
      chipsHtml+=\`<div class="cal-chip \${chipClass}" title="\${esc(v.title)}">\${client?client.name.slice(0,4)+'·':''} \${esc(v.title.slice(0,14))}\${v.title.length>14?'…':''}</div>\`;
    });
    cell.innerHTML=\`<div class="cal-day-num">\${d}</div><div class="cal-day-chips">\${chipsHtml}</div>\${dayVids.length>showMax?\`<div class="cal-day-count">+\${dayVids.length-showMax}</div>\`:\`\`}\`;
    grid.appendChild(cell);
  }
}

function renderVideoList(){
  const mFilter=document.getElementById('vid-month-filter')?.value;
  let list=[...videos];
  if(selectedClientId!=='all')list=list.filter(v=>v.clientId===selectedClientId);
  if(mFilter)list=list.filter(v=>v.date&&v.date.startsWith(mFilter));
  if(vidFilter!=='all')list=list.filter(v=>v.status===vidFilter);
  list.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const client=selectedClientId!=='all'?clients.find(c=>c.id===selectedClientId):null;
  const pTitle=document.getElementById('video-panel-title');
  if(pTitle)pTitle.textContent=client?client.name+' Videos':'All Videos';
  const container=document.getElementById('video-list'); if(!container)return;
  container.innerHTML='';
  if(!list.length){container.innerHTML='<div class="empty"><div class="empty-icon">⬡</div>No videos match this filter</div>';return;}
  const STATUS_NEXT={'Pending':'Editing','Editing':'Review','Review':'Scheduled','Scheduled':'Uploaded','Uploaded':'Pending'};
  const STATUS_CLS={'Pending':'sb-pending','Editing':'sb-editing','Review':'sb-review','Scheduled':'sb-scheduled','Uploaded':'sb-uploaded'};
  list.forEach(v=>{
    const cl=clients.find(c=>c.id===v.clientId);
    const clColor=cl?cl.color:'#94a3b8';
    const div=document.createElement('div');
    div.className='video-item';
    div.innerHTML=\`
      <div class="vi-top">
        <div class="vi-title">\${esc(v.title)}</div>
        <div class="vi-actions">
          <button class="btn-sm btn-cycle" onclick="cycleVideoStatus('\${v.id}')">→ \${esc(STATUS_NEXT[v.status]||'Cycle')}</button>
          <button class="btn-sm btn-amber" onclick="openEditVideo('\${v.id}')">Edit</button>
          <button class="btn-sm btn-danger" onclick="deleteVideo('\${v.id}')">✕</button>
        </div>
      </div>
      <div class="vi-meta">
        \${cl?\`<span class="vi-pill" style="background:\${hexToRgba(clColor,.12)};color:\${clColor};border:1px solid \${hexToRgba(clColor,.25)}">\${esc(cl.name)}</span>\`:\`\`}
        \${v.date?\`<span class="vi-pill" style="background:var(--surface3);color:var(--text3);border:1px solid var(--border)">\${new Date(v.date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>\`:\`\`}
        \${v.editor?\`<span class="vi-pill" style="background:rgba(99,102,241,.1);color:#a5b4fc;border:1px solid rgba(99,102,241,.2)">\${esc(v.editor)}</span>\`:\`\`}
        \${v.platform?\`<span class="vi-pill" style="background:rgba(20,184,166,.08);color:#5eead4;border:1px solid rgba(20,184,166,.2)">\${esc(v.platform)}</span>\`:\`\`}
        <button class="status-badge \${STATUS_CLS[v.status]||'sb-pending'}" onclick="cycleVideoStatus('\${v.id}')">\${esc(v.status)}</button>
      </div>
      \${v.notes?\`<div style="font-size:11px;color:var(--text3);margin-top:6px;line-height:1.5">\${esc(v.notes)}</div>\`:\`\`}\`;
    container.appendChild(div);
  });
}
`;

if(!content.includes('let clients=loadClients()')) {
  // Inject at the very end of the first script tag
  content = content.replace('window.closeNoteModalDirect=function(){document.getElementById(\'noteModal\').classList.remove(\'open\');}\n</script>', 'window.closeNoteModalDirect=function(){document.getElementById(\'noteModal\').classList.remove(\'open\');}\n' + jsToAdd + '\n</script>');
}

// Modify showPage if needed (index1.html)
if(!content.includes("if(id==='clients')")) {
  content = content.replace(
    `if(id==='dashboard'&&window._renderDashboard)window._renderDashboard();`,
    `if(id==='dashboard'&&window._renderDashboard)window._renderDashboard();\n  if(id==='clients'&&window.renderAllClientsData)window.renderAllClientsData();`
  );
}

fs.writeFileSync(indexFile, content);
console.log('Patch complete.');
