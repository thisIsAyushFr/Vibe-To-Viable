import"./modulepreload-polyfill-B5Qt9EMX.js";const s=(e,t=document)=>t.querySelector(e),g=(e,t=document)=>[...t.querySelectorAll(e)];function At(){const e=s("#currentDate");if(!e)return;const t=new Date,i={weekday:"short",day:"numeric",month:"short",year:"numeric"};e.textContent=t.toLocaleDateString("en-IN",i)}At();const D=s("#sidebar"),w=s("#sidebarOverlay"),R=s("#menuToggle");R==null||R.addEventListener("click",()=>{D.classList.toggle("open"),w.classList.toggle("active")});w==null||w.addEventListener("click",()=>{D.classList.remove("open"),w.classList.remove("active")});const G={dashboard:"kpiGrid",doctors:"section-doctors",patients:"section-patients",appointments:"section-appointments",emergency:"section-emergency",departments:"section-departments","bed-management":"section-beds","staff-shifts":"section-staff",analytics:"section-analytics","ai-insights":"section-ai-insights",inventory:"section-inventory"};g(".nav-item:not(.logout)").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),g(".nav-item").forEach(a=>a.classList.remove("active")),e.classList.add("active");const i=e.dataset.section;if(i==="reports")v("#reportsModal");else if(i==="settings")v("#settingsModal");else if(i==="dashboard")window.scrollTo({top:0,behavior:"smooth"});else if(i&&G[i]){const a=G[i],n=document.getElementById(a);if(n){const o=s(".top-navbar"),c=(o?o.offsetHeight:70)+20,l=n.getBoundingClientRect().top+window.pageYOffset-c;window.scrollTo({top:l,behavior:"smooth"}),g(".section-highlight").forEach(d=>d.classList.remove("section-highlight")),n.classList.add("section-highlight"),setTimeout(()=>{n.classList.remove("section-highlight")},2500)}}window.innerWidth<=1024&&(D==null||D.classList.remove("open"),w==null||w.classList.remove("active"))})});var Z;(Z=s(".nav-item.logout"))==null||Z.addEventListener("click",e=>{e.preventDefault(),confirm(`🔒 Logout Confirmation

Are you sure you want to log out of Aarogya Hospital Intelligence Platform?`)&&(alert("Logged out successfully."),window.scrollTo({top:0,behavior:"smooth"}))});function v(e){const t=s(e);t&&t.classList.add("active")}function b(e){const t=s(e);t&&t.classList.remove("active")}var _;(_=s("#closeReportsModal"))==null||_.addEventListener("click",()=>b("#reportsModal"));var J;(J=s("#cancelReportsModal"))==null||J.addEventListener("click",()=>b("#reportsModal"));var Y;(Y=s("#closeSettingsModal"))==null||Y.addEventListener("click",()=>b("#settingsModal"));var X;(X=s("#cancelSettingsModal"))==null||X.addEventListener("click",()=>b("#settingsModal"));g(".modal-close").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".modal-overlay");t&&t.classList.remove("active")})});g(".modal-overlay").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&e.classList.remove("active")})});["#cancelAddDoctorModal","#confirmInspectorModal","#cancelQuickActionModal","#cancelNotifModal","#cancelMsgModal","#cancelEditPatientModal","#cancelEditDoctorModal","#cancelAllActivitiesModal","#cancelInventoryManageModal"].forEach(e=>{var t;(t=s(e))==null||t.addEventListener("click",()=>{const i=s(e).closest(".modal-overlay");i&&i.classList.remove("active")})});g(".export-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.report||"Report";u("📥 Downloading Report",`${t} has been generated and queued for download.`,"success")})});var tt;(tt=s("#exportAllReportsBtn"))==null||tt.addEventListener("click",()=>{u("📦 Executive Package","All hospital operational reports are downloading as a ZIP archive.","success"),b("#reportsModal")});var et;(et=s("#saveSettingsBtn"))==null||et.addEventListener("click",()=>{var a,n,o,c;const e=((a=s("#themeSelect"))==null?void 0:a.value)||"light",t=((n=s("#refreshRateSelect"))==null?void 0:n.value)||"15",i=((o=s("#emergencyAlertToggle"))==null?void 0:o.checked)??!0;u("⚙️ Preferences Saved",`Theme: ${e==="dark"?"Dark Aurora":"Light Aurora"} · Refresh: ${t}s · Alerts: ${i?"ON":"OFF"}`,"success"),b("#settingsModal"),(c=window.AarogyaAPI)==null||c.emit("settingsUpdated",{theme:e,refreshRate:t,alertsEnabled:i})});const F=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),F.unobserve(t.target))})},{threshold:.08,rootMargin:"0px 0px -40px 0px"});g(".animate-in").forEach(e=>F.observe(e));function xt(e,t,i=2e3){const a=e.dataset.prefix||"",n=e.dataset.suffix||"",o=0,c=performance.now();function l(d){const r=d-c,p=Math.min(r/i,1),f=1-Math.pow(1-p,3),x=Math.round(o+(t-o)*f);t>=1e6?e.textContent=a+(x/1e5).toFixed(1)+"L":e.textContent=a+x.toLocaleString("en-IN")+n,p<1&&requestAnimationFrame(l)}requestAnimationFrame(l)}const yt=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){const i=parseInt(t.target.dataset.count);isNaN(i)||xt(t.target,i),yt.unobserve(t.target)}})},{threshold:.3});g("[data-count]").forEach(e=>yt.observe(e));function A(e,t,i="#14B8A6"){const a=s(`#${e}`);a&&t.forEach((n,o)=>{const c=document.createElement("div");c.className="kpi-mini-bar",c.style.height=`${n}%`,c.style.background=i,c.style.animationDelay=`${o*.08}s`,a.appendChild(c)})}A("miniChart1",[40,65,50,80,60,90,75,85],"#14B8A6");A("miniChart2",[60,55,70,65,80,75,90,70],"#38BDF8");A("miniChart3",[50,70,45,85,60,75,80,65],"#F59E0B");A("miniChart4",[80,70,60,55,50,45,40,35],"#22C55E");A("miniChart5",[20,35,40,55,45,60,70,80],"#EF4444");A("miniChart6",[50,60,55,70,80,85,90,95],"#7C3AED");A("miniChart7",[30,40,35,50,60,55,45,40],"#F59E0B");function Lt(){const e=s("#healthRing"),t=s("#healthValue");if(!e||!t)return;const i=92,a=2*Math.PI*72,n=a-i/100*a;setTimeout(()=>{e.style.strokeDashoffset=n},500);let o=0;const c=setInterval(()=>{o++,t.textContent=o,o>=i&&clearInterval(c)},20)}const wt=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(Lt(),wt.unobserve(t.target))})},{threshold:.3}),z=s(".health-score-card");z&&wt.observe(z);const H=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){const i=t.target,a=i.dataset.width;setTimeout(()=>{i.style.width=a+"%"},300),H.unobserve(i)}})},{threshold:.2});g(".progress-bar-fill[data-width]").forEach(e=>H.observe(e));const T=[{name:"Cardiology",doctors:24,patients:78,wait:"12 min",status:"active",statusText:"Normal"},{name:"Orthopedics",doctors:18,patients:94,wait:"28 min",status:"warning",statusText:"High Load"},{name:"Pediatrics",doctors:15,patients:45,wait:"8 min",status:"active",statusText:"Normal"},{name:"Neurology",doctors:12,patients:56,wait:"22 min",status:"warning",statusText:"Moderate"},{name:"Emergency",doctors:20,patients:34,wait:"5 min",status:"critical",statusText:"Critical"},{name:"Oncology",doctors:14,patients:42,wait:"15 min",status:"active",statusText:"Normal"},{name:"Dermatology",doctors:8,patients:38,wait:"10 min",status:"active",statusText:"Normal"},{name:"ICU",doctors:16,patients:22,wait:"3 min",status:"critical",statusText:"Near Full"}],y=[{name:"Dr. Priya Sharma",initials:"PS",avatar:"a1",dept:"Cardiology",patients:18,hours:"9.5h",shift:"Morning",burnout:"high",status:"active"},{name:"Dr. Rahul Mehra",initials:"RM",avatar:"a2",dept:"Orthopedics",patients:4,hours:"6h",shift:"Morning",burnout:"low",status:"active"},{name:"Dr. Ananya Patel",initials:"AP",avatar:"a3",dept:"Neurology",patients:12,hours:"8h",shift:"Afternoon",burnout:"medium",status:"active"},{name:"Dr. Vikram Singh",initials:"VS",avatar:"a4",dept:"Emergency",patients:15,hours:"11h",shift:"Night",burnout:"high",status:"busy"},{name:"Dr. Sneha Reddy",initials:"SR",avatar:"a5",dept:"Pediatrics",patients:8,hours:"5h",shift:"Morning",burnout:"low",status:"active"},{name:"Dr. Arjun Nair",initials:"AN",avatar:"a6",dept:"Oncology",patients:10,hours:"7.5h",shift:"Afternoon",burnout:"medium",status:"active"}],C=[{id:"PT-10234",name:"Rajesh Kumar",doctor:"Dr. Priya Sharma",dept:"Cardiology",priority:"high",appt:"10:30 AM",room:"ICU-4",status:"Critical"},{id:"PT-10235",name:"Meera Joshi",doctor:"Dr. Rahul Mehra",dept:"Orthopedics",priority:"medium",appt:"11:00 AM",room:"204-A",status:"Stable"},{id:"PT-10236",name:"Amit Verma",doctor:"Dr. Ananya Patel",dept:"Neurology",priority:"high",appt:"11:30 AM",room:"302-B",status:"Under Observation"},{id:"PT-10237",name:"Sunita Devi",doctor:"Dr. Sneha Reddy",dept:"Pediatrics",priority:"low",appt:"12:00 PM",room:"PED-8",status:"Recovering"},{id:"PT-10238",name:"Farhan Ali",doctor:"Dr. Vikram Singh",dept:"Emergency",priority:"high",appt:"09:15 AM",room:"ER-2",status:"Critical"},{id:"PT-10239",name:"Kavya Nair",doctor:"Dr. Arjun Nair",dept:"Oncology",priority:"medium",appt:"02:00 PM",room:"108-C",status:"Stable"}],$=[{time:"09:00",patient:"Farhan Ali",doctor:"Dr. Vikram Singh",type:"Emergency Consult",status:"completed"},{time:"09:30",patient:"Riya Menon",doctor:"Dr. Priya Sharma",type:"Follow-up ECG",status:"completed"},{time:"10:00",patient:"Karan Kapoor",doctor:"Dr. Rahul Mehra",type:"Knee MRI Review",status:"completed"},{time:"10:30",patient:"Rajesh Kumar",doctor:"Dr. Priya Sharma",type:"Cardiac Checkup",status:"in-progress"},{time:"11:00",patient:"Meera Joshi",doctor:"Dr. Rahul Mehra",type:"Post-surgery Review",status:"upcoming"},{time:"11:30",patient:"Amit Verma",doctor:"Dr. Ananya Patel",type:"Neuro Assessment",status:"upcoming"},{time:"12:00",patient:"Sunita Devi",doctor:"Dr. Sneha Reddy",type:"Pediatric Checkup",status:"upcoming"},{time:"02:00",patient:"Kavya Nair",doctor:"Dr. Arjun Nair",type:"Chemo Consultation",status:"upcoming"}],I=[{ward:"ICU",icon:"🏥",capacity:30,occupied:27,color:"#EF4444"},{ward:"Emergency",icon:"🚨",capacity:40,occupied:25,color:"#F59E0B"},{ward:"General Ward",icon:"🛏️",capacity:200,occupied:148,color:"#0F766E"},{ward:"Private Rooms",icon:"🏠",capacity:60,occupied:42,color:"#7C3AED"},{ward:"Pediatrics",icon:"👶",capacity:50,occupied:31,color:"#38BDF8"}],Ct=[{name:"Morning",badge:"morning",doctors:64,nurses:120,hours:"6:00 AM – 2:00 PM",overtime:"12h"},{name:"Afternoon",badge:"afternoon",doctors:58,nurses:105,hours:"2:00 PM – 10:00 PM",overtime:"8h"},{name:"Night",badge:"night",doctors:42,nurses:80,hours:"10:00 PM – 6:00 AM",overtime:"15h"}],P=[{name:"Medicine Stock",count:"12,450 units",status:"active",statusText:"Healthy",icon:"💊"},{name:"Surgical Equipment",count:"840 items",status:"active",statusText:"Healthy",icon:"🔬"},{name:"Ventilators",count:"24 / 30",status:"warning",statusText:"Low",icon:"🫁"},{name:"Wheelchairs",count:"45 available",status:"active",statusText:"Healthy",icon:"♿"},{name:"Ambulances",count:"6 active / 8",status:"warning",statusText:"Low",icon:"🚑"},{name:"Oxygen Cylinders",count:"18 / 50",status:"critical",statusText:"Critical",icon:"🧪"},{name:"PPE Kits",count:"2,100 units",status:"active",statusText:"Healthy",icon:"🥼"},{name:"Blood Units",count:"340 units",status:"warning",statusText:"Low",icon:"🩸"}],k=[{text:"Patient Admitted",desc:"Rajesh Kumar admitted to ICU-4 with cardiac emergency.",time:"2 min ago",dot:"red"},{text:"Appointment Booked",desc:"Kavya Nair scheduled for oncology consultation at 2:00 PM.",time:"15 min ago",dot:"blue"},{text:"Shift Updated",desc:"Night shift staff roster updated by HR admin.",time:"32 min ago",dot:"orange"},{text:"Inventory Alert",desc:"Oxygen cylinder stock dropped below threshold (36%).",time:"1 hr ago",dot:"red"},{text:"Doctor Added",desc:"Dr. Nisha Gupta joined the Dermatology department.",time:"2 hrs ago",dot:"green"},{text:"Bed Transferred",desc:"Patient moved from General Ward to Private Room 112.",time:"3 hrs ago",dot:"teal"},{text:"Report Generated",desc:"Monthly analytics report exported by admin.",time:"4 hrs ago",dot:"blue"}],O=[{label:"Add Doctor",icon:"👨‍⚕️",gradient:"linear-gradient(135deg, #0F766E, #14B8A6)"},{label:"Assign Shift",icon:"🕐",gradient:"linear-gradient(135deg, #7C3AED, #A78BFA)"},{label:"Generate Report",icon:"📊",gradient:"linear-gradient(135deg, #0F766E, #38BDF8)"},{label:"Export PDF",icon:"📄",gradient:"linear-gradient(135deg, #DC2626, #F87171)"},{label:"Export Excel",icon:"📗",gradient:"linear-gradient(135deg, #16A34A, #4ADE80)"},{label:"Announcement",icon:"📢",gradient:"linear-gradient(135deg, #F59E0B, #FBBF24)"}];function $t(e=""){const t=s("#deptTable tbody");if(!t)return;const i=e?T.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())):T;t.innerHTML=i.map(a=>`
    <tr>
      <td><strong>${a.name}</strong></td>
      <td>${a.doctors}</td>
      <td>${a.patients}</td>
      <td>${a.wait}</td>
      <td><span class="status-chip ${a.status}"><span class="status-dot ${a.status==="active"?"green":a.status==="warning"?"yellow":"red"}"></span>${a.statusText}</span></td>
      <td class="table-actions">
        <button class="btn btn-sm btn-secondary">View</button>
        <button class="btn btn-sm btn-outline">Assign Staff</button>
        <button class="btn btn-sm btn-outline">Analytics</button>
      </td>
    </tr>
  `).join("")}$t();function B(e=""){const t=s("#doctorCardsGrid");if(!t)return;const i=e?y.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.dept.toLowerCase().includes(e.toLowerCase())):y;if(i.length===0){t.innerHTML=`<div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No doctors found matching "${e}".</div>`;return}t.innerHTML=i.map(a=>{const n=a.burnout.charAt(0).toUpperCase()+a.burnout.slice(1),o=a.status==="active"?"active":"busy",c=a.status==="active"?"green":"yellow",l=a.status==="active"?"Available":"On Call";return`
      <div class="doctor-card glass-strong">
        <div class="doctor-card-header">
          <div class="doctor-profile-info">
            <div class="avatar ${a.avatar}">${a.initials}</div>
            <div>
              <h4>${a.name}</h4>
              <p>${a.dept}</p>
            </div>
          </div>
          <span class="status-chip ${o}">
            <span class="status-dot ${c}"></span>
            ${l}
          </span>
        </div>

        <div class="doctor-workload-stats">
          <div class="doctor-stat-box">
            <span class="doctor-stat-lbl">Active Patients</span>
            <span class="doctor-stat-val">${a.patients}</span>
          </div>
          <div class="doctor-stat-box">
            <span class="doctor-stat-lbl">Hours Worked</span>
            <span class="doctor-stat-val">${a.hours}</span>
          </div>
        </div>

        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:6px;">
            <span style="color:var(--text-secondary);">Workload Stress</span>
            <span class="burnout-indicator ${a.burnout}">${n}</span>
          </div>
          <div class="burnout-bar" style="width:100%;height:6px;">
            <div class="burnout-bar-fill ${a.burnout}" style="height:100%;"></div>
          </div>
        </div>

        <div class="doctor-card-footer">
          <span class="status-chip info" style="font-size:11px;">Shift: ${a.shift}</span>
          <button class="btn btn-sm btn-outline manage-doc-btn" data-name="${a.name}">Manage Profile</button>
        </div>
      </div>
    `}).join("")}B();function L(e=""){const t=s("#doctorTable tbody");if(!t)return;const i=e?y.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.dept.toLowerCase().includes(e.toLowerCase())):y;t.innerHTML=i.map(a=>`
    <tr>
      <td>
        <div class="doctor-cell">
          <div class="avatar ${a.avatar}">${a.initials}</div>
          <div>
            <div style="font-weight:600;">${a.name}</div>
          </div>
        </div>
      </td>
      <td>${a.dept}</td>
      <td><strong>${a.patients}</strong></td>
      <td>${a.hours}</td>
      <td><span class="status-chip info">${a.shift}</span></td>
      <td>
        <div class="burnout-indicator ${a.burnout}">
          <div class="burnout-bar"><div class="burnout-bar-fill ${a.burnout}"></div></div>
          ${a.burnout.charAt(0).toUpperCase()+a.burnout.slice(1)}
        </div>
      </td>
      <td><span class="status-chip ${a.status==="active"?"active":"busy"}"><span class="status-dot ${a.status==="active"?"green":"yellow"}"></span>${a.status==="active"?"Available":"Busy"}</span></td>
      <td><button class="btn btn-sm btn-secondary">Manage</button></td>
    </tr>
  `).join("")}L();var at;(at=s("#doctorSearch"))==null||at.addEventListener("input",e=>{const t=e.target.value.trim();B(t),L(t)});var it;(it=s("#addDoctorSectionBtn"))==null||it.addEventListener("click",()=>{v("#addDoctorModal")});function S(e=""){const t=s("#patientTable tbody");if(!t)return;const i=e?C.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.id.toLowerCase().includes(e.toLowerCase())):C;t.innerHTML=i.map(a=>{const n=a.status==="Critical"?"critical":a.status==="Stable"?"active":a.status==="Recovering"?"available":"info",o=a.status==="Critical"?"red":a.status==="Stable"||a.status==="Recovering"?"green":"blue";return`
      <tr>
        <td><code style="font-size:12px;background:rgba(15,118,110,0.06);padding:3px 8px;border-radius:6px;">${a.id}</code></td>
        <td><strong>${a.name}</strong></td>
        <td>${a.doctor}</td>
        <td>${a.dept}</td>
        <td><span class="priority-badge ${a.priority}">${a.priority.toUpperCase()}</span></td>
        <td>${a.appt}</td>
        <td>${a.room}</td>
        <td><span class="status-chip ${n}"><span class="status-dot ${o}"></span>${a.status}</span></td>
        <td class="table-actions">
          <button class="btn btn-sm btn-secondary">View</button>
          <button class="btn btn-sm btn-outline">Edit</button>
          <button class="btn btn-sm btn-outline">Record</button>
        </td>
      </tr>
    `}).join("")}S();var st;(st=s("#patientSearch"))==null||st.addEventListener("input",e=>{S(e.target.value)});let V="today";function W(e=V){const t=s("#appointmentList");if(!t)return;V=e;let i=$;if(e==="upcoming"?i=$.filter(a=>a.status==="upcoming"):e==="completed"?i=$.filter(a=>a.status==="completed"):e==="cancelled"?i=$.filter(a=>a.status==="cancelled"):e==="today"&&(i=$.filter(a=>a.status!=="cancelled")),i.length===0){t.innerHTML=`<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No ${e} appointments found.</div>`;return}t.innerHTML=i.map(a=>{const n=a.status==="completed"?"active":a.status==="in-progress"?"warning":a.status==="cancelled"?"danger":"info",o=a.status==="completed"?"Completed":a.status==="in-progress"?"In Progress":a.status==="cancelled"?"Cancelled":"Upcoming";return`
      <div class="appointment-item">
        <span class="appointment-time">${a.time}</span>
        <span class="appointment-line"></span>
        <div class="appointment-details" style="flex:1;">
          <h4>${a.patient}</h4>
          <p>${a.type} · ${a.doctor}</p>
        </div>
        <span class="status-chip ${n}">${o}</span>
      </div>
    `}).join("")}W();g(".appointment-tab").forEach(e=>{e.addEventListener("click",()=>{g(".appointment-tab").forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.textContent.trim().toLowerCase(),i=t.includes("today")?"today":t.includes("upcoming")?"upcoming":t.includes("completed")?"completed":"cancelled";W(i)})});function q(){const e=s("#bedGrid");e&&(e.innerHTML=I.map(t=>{const i=t.capacity-t.occupied,a=(t.occupied/t.capacity*100).toFixed(0),n=a>85?"danger":a>65?"warning":"success";return`
      <div class="bed-card glass">
        <div class="bed-card-header">
          <h4>${t.icon} ${t.ward}</h4>
          <span class="status-chip ${a>85?"critical":a>65?"warning":"active"}">
            <span class="status-dot ${a>85?"red":a>65?"yellow":"green"}"></span>
            ${a}%
          </span>
        </div>
        <div class="bed-stats">
          <div class="bed-stat">
            <div class="bed-stat-value">${t.capacity}</div>
            <div class="bed-stat-label">Capacity</div>
          </div>
          <div class="bed-stat">
            <div class="bed-stat-value">${t.occupied}</div>
            <div class="bed-stat-label">Occupied</div>
          </div>
          <div class="bed-stat">
            <div class="bed-stat-value" style="color:var(--success)">${i}</div>
            <div class="bed-stat-label">Available</div>
          </div>
        </div>
        <div class="progress-bar"><div class="progress-bar-fill ${n}" data-width="${a}"></div></div>
        <div class="bed-card-actions">
          <button class="btn btn-sm btn-primary" style="flex:1;">Allocate</button>
          <button class="btn btn-sm btn-outline">Transfer</button>
          <button class="btn btn-sm btn-outline">Discharge</button>
        </div>
      </div>
    `}).join(""),g(".progress-bar-fill[data-width]").forEach(t=>H.observe(t)))}q();function Et(){const e=s("#shiftCards");e&&(e.innerHTML=Ct.map(t=>`
    <div class="shift-card glass-strong">
      <div>
        <div class="shift-badge ${t.badge}">${t.name} Shift</div>
        <div style="font-size:11px;color:var(--text-secondary);margin-bottom:12px;font-weight:500;">${t.hours}</div>
      </div>
      <div class="shift-stats">
        <div class="shift-stat-item">
          <div class="value">${t.doctors}</div>
          <div class="label">Doctors</div>
        </div>
        <div class="shift-stat-item">
          <div class="value">${t.nurses}</div>
          <div class="label">Nurses</div>
        </div>
        <div class="shift-stat-item">
          <div class="value">${t.doctors+t.nurses}</div>
          <div class="label">Total Staff</div>
        </div>
        <div class="shift-stat-item">
          <div class="value" style="color:var(--warning);">${t.overtime}</div>
          <div class="label">Overtime</div>
        </div>
      </div>
    </div>
  `).join(""))}Et();function j(e=""){const t=s("#inventoryList");if(!t)return;const i=e?P.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())):P;t.innerHTML=i.map(a=>`
    <div class="inventory-item">
      <div class="inventory-info">
        <div class="inventory-icon">${a.icon}</div>
        <div>
          <div class="inventory-name">${a.name}</div>
          <div class="inventory-count">${a.count}</div>
        </div>
      </div>
      <span class="status-chip ${a.status}">
        <span class="status-dot ${a.status==="active"?"green":a.status==="warning"?"yellow":"red"}"></span>
        ${a.statusText}
      </span>
    </div>
  `).join("")}j();function Dt(){const e=s("#activityFeed");e&&(e.innerHTML=k.map((t,i)=>`
    <div class="activity-item">
      <div class="activity-dot-wrap">
        <div class="activity-dot ${t.dot}"></div>
        ${i<k.length-1?'<div class="activity-line-v"></div>':""}
      </div>
      <div class="activity-content">
        <h4>${t.text}</h4>
        <p>${t.desc}</p>
        <div class="activity-time">${t.time}</div>
      </div>
    </div>
  `).join(""))}Dt();function Mt(){const e=s("#quickActionsGrid");e&&(e.innerHTML=O.map(t=>`
    <div class="quick-action-btn" role="button" tabindex="0">
      <div class="quick-action-icon" style="background:${t.gradient};font-size:20px;">${t.icon}</div>
      <span>${t.label}</span>
    </div>
  `).join(""))}Mt();function K(){if(typeof Chart>"u")return;Chart.defaults.font.family="'Inter', 'Poppins', sans-serif",Chart.defaults.font.size=12,Chart.defaults.color="#64748B",Chart.defaults.plugins.legend.labels.usePointStyle=!0,Chart.defaults.plugins.legend.labels.pointStyleWidth=10,Chart.defaults.plugins.legend.labels.padding=16;const t={color:"rgba(15, 118, 110, 0.05)",drawBorder:!1},i=s("#chartLine");i&&(window.lineChartInstance=new Chart(i,{type:"line",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{label:"Patients",data:[145,178,162,210,195,230,198],borderColor:"#0F766E",backgroundColor:"rgba(15, 118, 110, 0.08)",fill:!0,tension:.4,borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#0F766E",pointBorderColor:"#fff",pointBorderWidth:2,pointHoverRadius:7}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:t},y:{grid:t,beginAtZero:!0}},plugins:{legend:{display:!1}},animation:{duration:1500,easing:"easeOutQuart"}}}));const a=s("#chartBar");a&&new Chart(a,{type:"bar",data:{labels:["Cardio","Ortho","Neuro","Pedia","ER","Onco"],datasets:[{label:"Patients",data:[78,94,56,45,34,42],backgroundColor:["rgba(15, 118, 110, 0.75)","rgba(20, 184, 166, 0.75)","rgba(56, 189, 248, 0.75)","rgba(124, 58, 237, 0.75)","rgba(239, 68, 68, 0.75)","rgba(245, 158, 11, 0.75)"],borderRadius:8,borderSkipped:!1,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{display:!1}},y:{grid:t,beginAtZero:!0}},plugins:{legend:{display:!1}},animation:{duration:1500,easing:"easeOutQuart"}}});const n=s("#chartDoughnut");n&&new Chart(n,{type:"doughnut",data:{labels:["In-Patient","Out-Patient","Emergency","ICU","Day Care"],datasets:[{data:[35,30,15,12,8],backgroundColor:["#0F766E","#14B8A6","#38BDF8","#7C3AED","#F59E0B"],borderWidth:0,spacing:3}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:11}}}},animation:{animateRotate:!0,duration:1500}}});const o=s("#chartArea");if(o){const l=o.getContext("2d").createLinearGradient(0,0,0,280);l.addColorStop(0,"rgba(56, 189, 248, 0.2)"),l.addColorStop(1,"rgba(56, 189, 248, 0.01)");const d=o.getContext("2d").createLinearGradient(0,0,0,280);d.addColorStop(0,"rgba(15, 118, 110, 0.15)"),d.addColorStop(1,"rgba(15, 118, 110, 0.01)"),window.areaChartInstance=new Chart(o,{type:"line",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{label:"Booked",data:[42,55,48,62,58,72,65],borderColor:"#38BDF8",backgroundColor:l,fill:!0,tension:.4,borderWidth:2,pointRadius:3,pointBackgroundColor:"#38BDF8"},{label:"Completed",data:[38,50,44,55,52,64,58],borderColor:"#0F766E",backgroundColor:d,fill:!0,tension:.4,borderWidth:2,pointRadius:3,pointBackgroundColor:"#0F766E"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:t},y:{grid:t,beginAtZero:!0}},plugins:{legend:{position:"top"}},animation:{duration:1800,easing:"easeOutQuart"}}})}const c=s("#chartDonut2");c&&new Chart(c,{type:"doughnut",data:{labels:["ICU","Emergency","General","Private","Pediatrics"],datasets:[{data:[90,62.5,74,70,62],backgroundColor:["#EF4444","#F59E0B","#0F766E","#7C3AED","#38BDF8"],borderWidth:0,spacing:3}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:11}}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.raw}% occupied`}}},animation:{animateRotate:!0,duration:1500}}})}typeof Chart<"u"?K():window.addEventListener("load",()=>{setTimeout(K,200)});function u(e,t,i="info",a=4500){const n=s("#toastContainer");if(!n)return;const o={success:"✅",warning:"⚠️",danger:"🚨",info:"ℹ️"},c=document.createElement("div");c.className=`toast-card ${i}`,c.innerHTML=`
    <div class="toast-icon">${o[i]||"ℹ️"}</div>
    <div class="toast-content">
      <div class="toast-title">${e}</div>
      <div class="toast-msg">${t}</div>
    </div>
    <button class="toast-close">&times;</button>
  `,c.querySelector(".toast-close").addEventListener("click",()=>Q(c)),n.appendChild(c),a>0&&setTimeout(()=>Q(c),a)}function Q(e){!e||!e.parentNode||(e.style.animation="toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",setTimeout(()=>e.remove(),300))}function M(e,t){const i=s("#detailInspectorModal"),a=s("#inspectorTitle"),n=s("#inspectorContent");!i||!a||!n||(a.textContent=e,n.innerHTML=`
    <div class="detail-inspector-card">
      ${Object.entries(t).map(([o,c])=>`
        <div class="detail-row">
          <span class="detail-label">${o}</span>
          <span class="detail-value">${c}</span>
        </div>
      `).join("")}
    </div>
  `,v("#detailInspectorModal"))}var nt;(nt=s("#notifBtn"))==null||nt.addEventListener("click",()=>{v("#notificationsModal")});var ot;(ot=s("#clearNotifBtn"))==null||ot.addEventListener("click",()=>{u("Notifications Cleared","All pending alerts have been marked as read.","info"),b("#notificationsModal")});var rt;(rt=s("#msgBtn"))==null||rt.addEventListener("click",()=>{v("#messagesModal")});var ct;(ct=s("#pageHeaderExportBtn"))==null||ct.addEventListener("click",()=>{v("#reportsModal"),u("Export Center","Select a report to download or export full executive package.","info")});var dt;(dt=s("#pageHeaderQuickActionBtn"))==null||dt.addEventListener("click",()=>{v("#quickActionModal"),Pt()});var lt;(lt=s("#manageInventoryBtn"))==null||lt.addEventListener("click",()=>{v("#inventoryManageModal")});var ut;(ut=s("#inventoryManageForm"))==null||ut.addEventListener("submit",e=>{var o;e.preventDefault();const t=s("#invItemSelect").value,i=s("#invCountInput").value.trim(),a=s("#invStatusSelect").value,n=P.find(c=>c.name===t);n&&(n.count=i,n.status=a,n.statusText=a==="active"?"Healthy":a==="warning"?"Low":"Critical",j(),u("Inventory Stock Updated",`${t} stock level updated to "${i}".`,"success"),(o=window.AarogyaAPI)==null||o.emit("inventoryUpdated",n)),b("#inventoryManageModal"),e.target.reset()});var pt;(pt=s("#analyticsMonthBtn"))==null||pt.addEventListener("click",()=>{var n,o,c,l;const e=s("#analyticsWeekBtn"),t=s("#analyticsMonthBtn");e&&t&&(e.classList.remove("btn-secondary"),e.classList.add("btn-outline"),t.classList.remove("btn-outline"),t.classList.add("btn-secondary")),window.lineChartInstance&&(window.lineChartInstance.data.labels=["Week 1","Week 2","Week 3","Week 4"],window.lineChartInstance.data.datasets[0].data=[680,840,790,950],window.lineChartInstance.update()),window.areaChartInstance&&(window.areaChartInstance.data.labels=["Week 1","Week 2","Week 3","Week 4"],window.areaChartInstance.data.datasets[0].data=[240,310,280,340],window.areaChartInstance.data.datasets[1].data=[210,280,260,315],window.areaChartInstance.update());const i=(o=(n=document.querySelector("#chartLine"))==null?void 0:n.closest(".dashboard-card"))==null?void 0:o.querySelector(".chart-title"),a=(l=(c=document.querySelector("#chartLine"))==null?void 0:c.closest(".dashboard-card"))==null?void 0:l.querySelector(".chart-subtitle");i&&(i.textContent="Patients This Month"),a&&(a.textContent="Monthly patient admissions overview"),u("Analytics Timeframe","Displaying operational analytics for This Month.","info")});var vt;(vt=s("#analyticsWeekBtn"))==null||vt.addEventListener("click",()=>{var n,o,c,l;const e=s("#analyticsWeekBtn"),t=s("#analyticsMonthBtn");e&&t&&(t.classList.remove("btn-secondary"),t.classList.add("btn-outline"),e.classList.remove("btn-outline"),e.classList.add("btn-secondary")),window.lineChartInstance&&(window.lineChartInstance.data.labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],window.lineChartInstance.data.datasets[0].data=[145,178,162,210,195,230,198],window.lineChartInstance.update()),window.areaChartInstance&&(window.areaChartInstance.data.labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],window.areaChartInstance.data.datasets[0].data=[42,55,48,62,58,72,65],window.areaChartInstance.data.datasets[1].data=[38,50,44,55,52,64,58],window.areaChartInstance.update());const i=(o=(n=document.querySelector("#chartLine"))==null?void 0:n.closest(".dashboard-card"))==null?void 0:o.querySelector(".chart-title"),a=(l=(c=document.querySelector("#chartLine"))==null?void 0:c.closest(".dashboard-card"))==null?void 0:l.querySelector(".chart-subtitle");i&&(i.textContent="Patients This Week"),a&&(a.textContent="Daily patient admissions"),u("Analytics Timeframe","Displaying operational analytics for This Week.","info")});var mt;(mt=s("#adminProfile"))==null||mt.addEventListener("click",()=>{M("Dr. Arjun (Administrator)",{"Full Name":"Dr. Arjun Kapoor",Role:"Chief Hospital Administrator",Email:"arjun@aarogyahospital.com",Department:"Hospital Operations",Privileges:"Full Executive Access",Status:"Active (Logged in)"})});const m=s("#globalSearch"),h=s("#globalSearchResults");function N(e){const t=e.trim().toLowerCase();if(S(t),L(t),$t(t),j(t),!h)return;if(!t){h.classList.remove("active"),h.innerHTML="";return}const i=C.filter(r=>r.name.toLowerCase().includes(t)||r.id.toLowerCase().includes(t)||r.dept.toLowerCase().includes(t)),a=y.filter(r=>r.name.toLowerCase().includes(t)||r.dept.toLowerCase().includes(t)),n=T.filter(r=>r.name.toLowerCase().includes(t)),o=P.filter(r=>r.name.toLowerCase().includes(t)),c=O.filter(r=>r.label.toLowerCase().includes(t));if(i.length+a.length+n.length+o.length+c.length===0){h.innerHTML=`
      <div style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">
        No hospital records matching "<strong>${e}</strong>"
      </div>
    `,h.classList.add("active");return}let d="";c.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">⚡ Quick Actions</div>
        ${c.map(r=>`
          <div class="search-result-row" data-type="action" data-label="${r.label}">
            <div class="search-result-info">
              <span class="search-result-title">${r.icon} ${r.label}</span>
              <span class="search-result-sub">Hospital Action Shortcut</span>
            </div>
            <span class="search-result-badge">Execute</span>
          </div>
        `).join("")}
      </div>
    `),i.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">🩺 Patients (${i.length})</div>
        ${i.slice(0,4).map(r=>`
          <div class="search-result-row" data-type="patient" data-id="${r.id}" data-name="${r.name}">
            <div class="search-result-info">
              <span class="search-result-title">${r.name} <code style="font-size:11px;opacity:0.8;">(${r.id})</code></span>
              <span class="search-result-sub">${r.dept} · Doctor: ${r.doctor}</span>
            </div>
            <span class="search-result-badge">${r.status}</span>
          </div>
        `).join("")}
      </div>
    `),a.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">👨‍⚕️ Doctors (${a.length})</div>
        ${a.slice(0,4).map(r=>`
          <div class="search-result-row" data-type="doctor" data-name="${r.name}">
            <div class="search-result-info">
              <span class="search-result-title">${r.name}</span>
              <span class="search-result-sub">${r.dept} · Shift: ${r.shift}</span>
            </div>
            <span class="search-result-badge">${r.status==="active"?"Available":"Busy"}</span>
          </div>
        `).join("")}
      </div>
    `),n.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">🏢 Departments (${n.length})</div>
        ${n.map(r=>`
          <div class="search-result-row" data-type="dept" data-name="${r.name}">
            <div class="search-result-info">
              <span class="search-result-title">${r.name}</span>
              <span class="search-result-sub">${r.doctors} Doctors · ${r.patients} Patients</span>
            </div>
            <span class="search-result-badge">${r.statusText}</span>
          </div>
        `).join("")}
      </div>
    `),o.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">📦 Inventory Supplies (${o.length})</div>
        ${o.map(r=>`
          <div class="search-result-row" data-type="inventory" data-name="${r.name}">
            <div class="search-result-info">
              <span class="search-result-title">${r.icon} ${r.name}</span>
              <span class="search-result-sub">Stock Level: ${r.count}</span>
            </div>
            <span class="search-result-badge">${r.statusText}</span>
          </div>
        `).join("")}
      </div>
    `),h.innerHTML=d,h.classList.add("active")}m==null||m.addEventListener("input",e=>{N(e.target.value)});m==null||m.addEventListener("focus",e=>{e.target.value.trim()&&N(e.target.value)});m==null||m.addEventListener("keydown",e=>{if(e.key==="Enter"){const t=e.target.value.trim();t&&(u("Global Search",`Filtered all hospital records for "${t}".`,"info"),N(t))}else e.key==="Escape"&&(h==null||h.classList.remove("active"),m.blur())});h==null||h.addEventListener("click",e=>{const t=e.target.closest(".search-result-row");if(!t)return;const i=t.dataset.type,a=t.dataset.name||t.dataset.id||t.dataset.label;if(h.classList.remove("active"),i==="action")U(a);else if(i==="patient"){const n=t.dataset.id,o=C.find(c=>c.id===n);o&&(s("#editPatientId").value=o.id,s("#editPatientName").value=o.name,s("#editPatientDept").value=o.dept,s("#editPatientDoctor").value=o.doctor,s("#editPatientPriority").value=o.priority,s("#editPatientRoom").value=o.room,s("#editPatientStatus").value=o.status,v("#editPatientModal"))}else if(i==="doctor"){const n=t.dataset.name,o=y.find(c=>c.name===n);o&&(s("#editDoctorOriginalName").value=o.name,s("#editDoctorName").value=o.name,s("#editDoctorDept").value=o.dept,s("#editDoctorShift").value=o.shift,s("#editDoctorStatus").value=o.status,v("#editDoctorModal"))}else if(i==="dept"){const n=document.getElementById("section-departments");n&&n.scrollIntoView({behavior:"smooth"}),u("Department Found",`Navigated to ${a} Department.`,"info")}else if(i==="inventory"){const n=t.dataset.name;v("#inventoryManageModal"),s("#invItemSelect")&&(s("#invItemSelect").value=n)}});document.addEventListener("keydown",e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),m==null||m.focus(),m!=null&&m.value.trim()&&N(m.value))});document.addEventListener("click",e=>{e.target.closest(".search-bar")||h==null||h.classList.remove("active")});function Pt(){const e=s("#modalQuickActionGrid");e&&(e.innerHTML=O.map(t=>`
    <div class="quick-action-btn modal-qa-item" data-action="${t.label}" role="button" tabindex="0">
      <div class="quick-action-icon" style="background:${t.gradient};font-size:20px;">${t.icon}</div>
      <span>${t.label}</span>
    </div>
  `).join(""),g(".modal-qa-item").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.action;b("#quickActionModal"),U(i)})}))}function U(e){if(e==="Add Doctor")v("#addDoctorModal");else if(e==="Assign Shift")v("#bedAllocationModal");else if(e==="Generate Report")v("#reportsModal");else if(e==="Export PDF")u("Exporting PDF","Generating high-resolution hospital operational PDF...","success");else if(e==="Export Excel")u("Exporting Excel","Exporting patient & revenue datasets to CSV format...","success");else if(e==="Announcement"){const t=prompt("Enter Broadcast Announcement Message for Hospital Staff:");t&&u("📢 Hospital Broadcast Sent",t,"info")}else u("Quick Action",`Action "${e}" executed.`,"info")}var ht;(ht=s("#addDoctorForm"))==null||ht.addEventListener("submit",e=>{var c;e.preventDefault();const t=s("#docName").value.trim(),i=s("#docDept").value,a=s("#docShift").value,n=s("#docStatus").value,o={name:t,initials:t.split(" ").map(l=>l[0]).join("").slice(0,2).toUpperCase(),avatar:"a"+(Math.floor(Math.random()*6)+1),dept:i,patients:0,hours:"0h",shift:a,burnout:"low",status:n};y.unshift(o),L(),B(),b("#addDoctorModal"),e.target.reset(),u("Doctor Added",`${t} assigned to ${i} (${a} shift).`,"success"),(c=window.AarogyaAPI)==null||c.emit("doctorAdded",o)});var ft;(ft=s("#editPatientForm"))==null||ft.addEventListener("submit",e=>{var a;e.preventDefault();const t=s("#editPatientId").value,i=C.find(n=>n.id===t);i&&(i.name=s("#editPatientName").value.trim(),i.dept=s("#editPatientDept").value,i.doctor=s("#editPatientDoctor").value,i.priority=s("#editPatientPriority").value,i.room=s("#editPatientRoom").value.trim(),i.status=s("#editPatientStatus").value,S(),u("Patient Updated",`Record for ${i.name} (${i.id}) updated successfully.`,"success"),(a=window.AarogyaAPI)==null||a.emit("patientUpdated",i)),b("#editPatientModal")});var gt;(gt=s("#editDoctorForm"))==null||gt.addEventListener("submit",e=>{var a;e.preventDefault();const t=s("#editDoctorOriginalName").value,i=y.find(n=>n.name===t);i&&(i.name=s("#editDoctorName").value.trim(),i.dept=s("#editDoctorDept").value,i.shift=s("#editDoctorShift").value,i.status=s("#editDoctorStatus").value,L(),B(),u("Doctor Profile Updated",`Profile for ${i.name} updated successfully.`,"success"),(a=window.AarogyaAPI)==null||a.emit("doctorUpdated",i)),b("#editDoctorModal")});var bt;(bt=s("#viewAllActivityBtn"))==null||bt.addEventListener("click",()=>{kt(),v("#allActivitiesModal")});function kt(){const e=s("#allActivitiesList");e&&(e.innerHTML=k.map((t,i)=>`
    <div class="activity-item">
      <div class="activity-dot-wrap">
        <div class="activity-dot ${t.dot}"></div>
        ${i<k.length-1?'<div class="activity-line-v"></div>':""}
      </div>
      <div class="activity-content">
        <h4>${t.text}</h4>
        <p>${t.desc}</p>
        <div class="activity-time">${t.time}</div>
      </div>
    </div>
  `).join(""))}document.addEventListener("click",e=>{var o,c,l;const t=e.target.closest("button, .btn, .quick-action-btn");if(!t)return;const i=t.closest("#quickActionsGrid .quick-action-btn");if(i){const d=((o=i.querySelector("span"))==null?void 0:o.textContent)||"Action";U(d);return}const a=t.textContent.trim(),n=t.closest(".manage-doc-btn");if(n){const d=n.dataset.name,r=y.find(p=>p.name===d);r&&(s("#editDoctorOriginalName").value=r.name,s("#editDoctorName").value=r.name,s("#editDoctorDept").value=r.dept,s("#editDoctorShift").value=r.shift,s("#editDoctorStatus").value=r.status,v("#editDoctorModal"));return}if(t.closest("#deptTable")){const d=t.closest("tr"),r=d?d.children[0].textContent.trim():"Department";if(a==="View")M(`${r} Department`,{"Active Doctors":d.children[1].textContent,"Current Patients":d.children[2].textContent,"Avg Wait Time":d.children[3].textContent,"Operational Status":d.children[4].textContent.trim()});else if(a==="Assign Staff")v("#addDoctorModal"),s("#docDept").value=r.split(" ")[0];else if(a==="Analytics"){const p=document.getElementById("section-analytics");p&&(p.scrollIntoView({behavior:"smooth"}),u("Analytics Navigated",`Viewing workload analytics for ${r}.`,"info"))}return}if(t.closest("#doctorTable")){const d=t.closest("tr");if(d&&a==="Manage"){const r=((c=d.querySelector(".doctor-cell div div"))==null?void 0:c.textContent.trim())||"Doctor",p=y.find(f=>f.name===r);p?(s("#editDoctorOriginalName").value=p.name,s("#editDoctorName").value=p.name,s("#editDoctorDept").value=p.dept,s("#editDoctorShift").value=p.shift,s("#editDoctorStatus").value=p.status,v("#editDoctorModal")):M(`Doctor Profile — ${r}`,{Department:d.children[1].textContent,"Active Patients":d.children[2].textContent,"Hours Worked":d.children[3].textContent,Shift:d.children[4].textContent.trim(),"Burnout Status":d.children[5].textContent.trim(),Availability:d.children[6].textContent.trim()})}return}if(t.closest("#patientTable")){const d=t.closest("tr");if(d){const r=d.children[0].textContent.trim(),p=d.children[1].textContent.trim(),f=C.find(x=>x.id===r);a==="Edit"&&f?(s("#editPatientId").value=f.id,s("#editPatientName").value=f.name,s("#editPatientDept").value=f.dept,s("#editPatientDoctor").value=f.doctor,s("#editPatientPriority").value=f.priority,s("#editPatientRoom").value=f.room,s("#editPatientStatus").value=f.status,v("#editPatientModal")):a==="View"||a==="Edit"?M(`Patient Record — ${p} (${r})`,{"Patient ID":r,"Full Name":p,"Attending Doctor":d.children[2].textContent,Department:d.children[3].textContent,Priority:d.children[4].textContent.trim(),"Appointment Time":d.children[5].textContent,"Room / Bed":d.children[6].textContent,"Health Status":d.children[7].textContent.trim()}):a==="Record"&&u("Medical Records",`Opening EMR EHR chart records for ${p} (${r}).`,"info")}return}if(t.closest(".bed-card")){const p=(((l=t.closest(".bed-card").querySelector("h4"))==null?void 0:l.textContent.trim())||"Ward").replace(/[^a-zA-Z\s]/g,"").trim();if(a==="Allocate")v("#bedAllocationModal"),s("#bedWardSelect").value=p,s("#bedActionType").value="allocate";else if(a==="Transfer")v("#bedAllocationModal"),s("#bedWardSelect").value=p,s("#bedActionType").value="transfer";else if(a==="Discharge"&&confirm(`Confirm patient discharge from ${p}?`)){const f=I.find(x=>x.ward.toLowerCase().includes(p.toLowerCase()));f&&f.occupied>0&&(f.occupied--,q(),u("Patient Discharged",`Patient discharged from ${p}. Freed 1 bed.`,"success"))}return}});const E={};window.AarogyaAPI={showToast:u,inspectItem:M,openModal:v,closeModal:b,registerPatient:e=>{C.unshift(e),S(),u("Patient Registered",`${e.name} registered via API.`,"success"),window.AarogyaAPI.emit("patientRegistered",e)},addDoctor:e=>{y.unshift(e),L(),u("Doctor Added",`${e.name} added via API.`,"success"),window.AarogyaAPI.emit("doctorAdded",e)},bookAppointment:e=>{$.unshift(e),W(),u("Appointment Booked",`Appointment for ${e.patient} booked via API.`,"success"),window.AarogyaAPI.emit("appointmentBooked",e)},allocateBed:(e,t="allocate")=>{const i=I.find(a=>a.ward.toLowerCase()===e.toLowerCase());i&&(t==="allocate"&&i.occupied<i.capacity?i.occupied++:t==="discharge"&&i.occupied>0&&i.occupied--,q(),u("Bed Status Updated",`${i.ward} occupied: ${i.occupied}/${i.capacity}`,"info"),window.AarogyaAPI.emit("bedUpdated",i))},exportReport:e=>{u("Report Exported",`${e} generated via API integration.`,"success"),window.AarogyaAPI.emit("reportExported",{reportName:e,timestamp:new Date})},getState:()=>({departments:T,doctors:y,patients:C,appointments:$,beds:I,shifts:Ct,inventory:P,activities:k}),on:(e,t)=>{E[e]||(E[e]=[]),E[e].push(t)},emit:(e,t)=>{E[e]&&E[e].forEach(i=>i(t))}};setTimeout(()=>{g(".animate-in:not(.visible)").forEach(e=>F.observe(e))},100);console.log("%c Aarogya Dashboard v1.0 ","background: linear-gradient(135deg, #0F766E, #38BDF8); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;");console.log("%c AI Powered Hospital Intelligence Platform Ready ","color: #14B8A6; font-size: 12px; font-weight: 600;");
