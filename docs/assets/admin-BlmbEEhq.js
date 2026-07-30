import"./modulepreload-polyfill-B5Qt9EMX.js";const i=(e,t=document)=>t.querySelector(e),b=(e,t=document)=>[...t.querySelectorAll(e)];function Mt(){const e=i("#currentDate");if(!e)return;const t=new Date,n={weekday:"short",day:"numeric",month:"short",year:"numeric"};e.textContent=t.toLocaleDateString("en-IN",n)}Mt();const M=i("#sidebar"),A=i("#sidebarOverlay"),H=i("#menuToggle");H==null||H.addEventListener("click",()=>{M.classList.toggle("open"),A.classList.toggle("active")});A==null||A.addEventListener("click",()=>{M.classList.remove("open"),A.classList.remove("active")});const G={dashboard:"kpiGrid",doctors:"section-doctors",patients:"section-patients",appointments:"section-appointments",emergency:"section-emergency",departments:"section-departments","bed-management":"section-beds","staff-shifts":"section-staff",analytics:"section-analytics","ai-insights":"section-ai-insights",inventory:"section-inventory"};b(".nav-item:not(.logout)").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),b(".nav-item").forEach(a=>a.classList.remove("active")),e.classList.add("active");const n=e.dataset.section;if(n==="reports")p("#reportsModal");else if(n==="settings")p("#settingsModal");else if(n==="dashboard")window.scrollTo({top:0,behavior:"smooth"});else if(n&&G[n]){const a=G[n],s=document.getElementById(a);if(s){const o=i(".top-navbar"),c=(o?o.offsetHeight:70)+20,u=s.getBoundingClientRect().top+window.pageYOffset-c;window.scrollTo({top:u,behavior:"smooth"}),b(".section-highlight").forEach(d=>d.classList.remove("section-highlight")),s.classList.add("section-highlight"),setTimeout(()=>{s.classList.remove("section-highlight")},2500)}}window.innerWidth<=1024&&(M==null||M.classList.remove("open"),A==null||A.classList.remove("active"))})});var Z;(Z=i(".nav-item.logout"))==null||Z.addEventListener("click",e=>{e.preventDefault(),confirm(`🔒 Logout Confirmation

Are you sure you want to log out of Aarogya Hospital Intelligence Platform?`)&&(alert("Logged out successfully."),window.scrollTo({top:0,behavior:"smooth"}))});function p(e){const t=i(e);t&&t.classList.add("active")}function f(e){const t=i(e);t&&t.classList.remove("active")}var J;(J=i("#closeReportsModal"))==null||J.addEventListener("click",()=>f("#reportsModal"));var _;(_=i("#cancelReportsModal"))==null||_.addEventListener("click",()=>f("#reportsModal"));var Y;(Y=i("#closeSettingsModal"))==null||Y.addEventListener("click",()=>f("#settingsModal"));var X;(X=i("#cancelSettingsModal"))==null||X.addEventListener("click",()=>f("#settingsModal"));b(".modal-close").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".modal-overlay");t&&t.classList.remove("active")})});b(".modal-overlay").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&e.classList.remove("active")})});["#cancelRegisterPatientModal","#cancelAddDoctorModal","#cancelBookApptModal","#cancelBedModal","#confirmInspectorModal","#cancelQuickActionModal","#cancelNotifModal","#cancelMsgModal","#cancelEditPatientModal","#cancelEditDoctorModal","#cancelAllActivitiesModal","#cancelInventoryManageModal"].forEach(e=>{var t;(t=i(e))==null||t.addEventListener("click",()=>{const n=i(e).closest(".modal-overlay");n&&n.classList.remove("active")})});b(".export-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.report||"Report";l("📥 Downloading Report",`${t} has been generated and queued for download.`,"success")})});var tt;(tt=i("#exportAllReportsBtn"))==null||tt.addEventListener("click",()=>{l("📦 Executive Package","All hospital operational reports are downloading as a ZIP archive.","success"),f("#reportsModal")});var et;(et=i("#saveSettingsBtn"))==null||et.addEventListener("click",()=>{var a,s,o,c;const e=((a=i("#themeSelect"))==null?void 0:a.value)||"light",t=((s=i("#refreshRateSelect"))==null?void 0:s.value)||"15",n=((o=i("#emergencyAlertToggle"))==null?void 0:o.checked)??!0;l("⚙️ Preferences Saved",`Theme: ${e==="dark"?"Dark Aurora":"Light Aurora"} · Refresh: ${t}s · Alerts: ${n?"ON":"OFF"}`,"success"),f("#settingsModal"),(c=window.AarogyaAPI)==null||c.emit("settingsUpdated",{theme:e,refreshRate:t,alertsEnabled:n})});const O=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),O.unobserve(t.target))})},{threshold:.08,rootMargin:"0px 0px -40px 0px"});b(".animate-in").forEach(e=>O.observe(e));function kt(e,t,n=2e3){const a=e.dataset.prefix||"",s=e.dataset.suffix||"",o=0,c=performance.now();function u(d){const r=d-c,v=Math.min(r/n,1),g=1-Math.pow(1-v,3),x=Math.round(o+(t-o)*g);t>=1e6?e.textContent=a+(x/1e5).toFixed(1)+"L":e.textContent=a+x.toLocaleString("en-IN")+s,v<1&&requestAnimationFrame(u)}requestAnimationFrame(u)}const xt=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){const n=parseInt(t.target.dataset.count);isNaN(n)||kt(t.target,n),xt.unobserve(t.target)}})},{threshold:.3});b("[data-count]").forEach(e=>xt.observe(e));function $(e,t,n="#14B8A6"){const a=i(`#${e}`);a&&t.forEach((s,o)=>{const c=document.createElement("div");c.className="kpi-mini-bar",c.style.height=`${s}%`,c.style.background=n,c.style.animationDelay=`${o*.08}s`,a.appendChild(c)})}$("miniChart1",[40,65,50,80,60,90,75,85],"#14B8A6");$("miniChart2",[60,55,70,65,80,75,90,70],"#38BDF8");$("miniChart3",[50,70,45,85,60,75,80,65],"#F59E0B");$("miniChart4",[80,70,60,55,50,45,40,35],"#22C55E");$("miniChart5",[20,35,40,55,45,60,70,80],"#EF4444");$("miniChart6",[50,60,55,70,80,85,90,95],"#7C3AED");$("miniChart7",[30,40,35,50,60,55,45,40],"#F59E0B");function Tt(){const e=i("#healthRing"),t=i("#healthValue");if(!e||!t)return;const n=92,a=2*Math.PI*72,s=a-n/100*a;setTimeout(()=>{e.style.strokeDashoffset=s},500);let o=0;const c=setInterval(()=>{o++,t.textContent=o,o>=n&&clearInterval(c)},20)}const Lt=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(Tt(),Lt.unobserve(t.target))})},{threshold:.3}),z=i(".health-score-card");z&&Lt.observe(z);const W=new IntersectionObserver(e=>{e.forEach(t=>{if(t.isIntersecting){const n=t.target,a=n.dataset.width;setTimeout(()=>{n.style.width=a+"%"},300),W.unobserve(n)}})},{threshold:.2});b(".progress-bar-fill[data-width]").forEach(e=>W.observe(e));const B=[{name:"Cardiology",doctors:24,patients:78,wait:"12 min",status:"active",statusText:"Normal"},{name:"Orthopedics",doctors:18,patients:94,wait:"28 min",status:"warning",statusText:"High Load"},{name:"Pediatrics",doctors:15,patients:45,wait:"8 min",status:"active",statusText:"Normal"},{name:"Neurology",doctors:12,patients:56,wait:"22 min",status:"warning",statusText:"Moderate"},{name:"Emergency",doctors:20,patients:34,wait:"5 min",status:"critical",statusText:"Critical"},{name:"Oncology",doctors:14,patients:42,wait:"15 min",status:"active",statusText:"Normal"},{name:"Dermatology",doctors:8,patients:38,wait:"10 min",status:"active",statusText:"Normal"},{name:"ICU",doctors:16,patients:22,wait:"3 min",status:"critical",statusText:"Near Full"}],y=[{name:"Dr. Priya Sharma",initials:"PS",avatar:"a1",dept:"Cardiology",patients:18,hours:"9.5h",shift:"Morning",burnout:"high",status:"active"},{name:"Dr. Rahul Mehra",initials:"RM",avatar:"a2",dept:"Orthopedics",patients:4,hours:"6h",shift:"Morning",burnout:"low",status:"active"},{name:"Dr. Ananya Patel",initials:"AP",avatar:"a3",dept:"Neurology",patients:12,hours:"8h",shift:"Afternoon",burnout:"medium",status:"active"},{name:"Dr. Vikram Singh",initials:"VS",avatar:"a4",dept:"Emergency",patients:15,hours:"11h",shift:"Night",burnout:"high",status:"busy"},{name:"Dr. Sneha Reddy",initials:"SR",avatar:"a5",dept:"Pediatrics",patients:8,hours:"5h",shift:"Morning",burnout:"low",status:"active"},{name:"Dr. Arjun Nair",initials:"AN",avatar:"a6",dept:"Oncology",patients:10,hours:"7.5h",shift:"Afternoon",burnout:"medium",status:"active"}],w=[{id:"PT-10234",name:"Rajesh Kumar",doctor:"Dr. Priya Sharma",dept:"Cardiology",priority:"high",appt:"10:30 AM",room:"ICU-4",status:"Critical"},{id:"PT-10235",name:"Meera Joshi",doctor:"Dr. Rahul Mehra",dept:"Orthopedics",priority:"medium",appt:"11:00 AM",room:"204-A",status:"Stable"},{id:"PT-10236",name:"Amit Verma",doctor:"Dr. Ananya Patel",dept:"Neurology",priority:"high",appt:"11:30 AM",room:"302-B",status:"Under Observation"},{id:"PT-10237",name:"Sunita Devi",doctor:"Dr. Sneha Reddy",dept:"Pediatrics",priority:"low",appt:"12:00 PM",room:"PED-8",status:"Recovering"},{id:"PT-10238",name:"Farhan Ali",doctor:"Dr. Vikram Singh",dept:"Emergency",priority:"high",appt:"09:15 AM",room:"ER-2",status:"Critical"},{id:"PT-10239",name:"Kavya Nair",doctor:"Dr. Arjun Nair",dept:"Oncology",priority:"medium",appt:"02:00 PM",room:"108-C",status:"Stable"}],C=[{time:"09:00",patient:"Farhan Ali",doctor:"Dr. Vikram Singh",type:"Emergency Consult",status:"completed"},{time:"09:30",patient:"Riya Menon",doctor:"Dr. Priya Sharma",type:"Follow-up ECG",status:"completed"},{time:"10:00",patient:"Karan Kapoor",doctor:"Dr. Rahul Mehra",type:"Knee MRI Review",status:"completed"},{time:"10:30",patient:"Rajesh Kumar",doctor:"Dr. Priya Sharma",type:"Cardiac Checkup",status:"in-progress"},{time:"11:00",patient:"Meera Joshi",doctor:"Dr. Rahul Mehra",type:"Post-surgery Review",status:"upcoming"},{time:"11:30",patient:"Amit Verma",doctor:"Dr. Ananya Patel",type:"Neuro Assessment",status:"upcoming"},{time:"12:00",patient:"Sunita Devi",doctor:"Dr. Sneha Reddy",type:"Pediatric Checkup",status:"upcoming"},{time:"02:00",patient:"Kavya Nair",doctor:"Dr. Arjun Nair",type:"Chemo Consultation",status:"upcoming"}],T=[{ward:"ICU",icon:"🏥",capacity:30,occupied:27,color:"#EF4444"},{ward:"Emergency",icon:"🚨",capacity:40,occupied:25,color:"#F59E0B"},{ward:"General Ward",icon:"🛏️",capacity:200,occupied:148,color:"#0F766E"},{ward:"Private Rooms",icon:"🏠",capacity:60,occupied:42,color:"#7C3AED"},{ward:"Pediatrics",icon:"👶",capacity:50,occupied:31,color:"#38BDF8"}],Pt=[{name:"Morning",badge:"morning",doctors:64,nurses:120,hours:"6:00 AM – 2:00 PM",overtime:"12h"},{name:"Afternoon",badge:"afternoon",doctors:58,nurses:105,hours:"2:00 PM – 10:00 PM",overtime:"8h"},{name:"Night",badge:"night",doctors:42,nurses:80,hours:"10:00 PM – 6:00 AM",overtime:"15h"}],S=[{name:"Medicine Stock",count:"12,450 units",status:"active",statusText:"Healthy",icon:"💊"},{name:"Surgical Equipment",count:"840 items",status:"active",statusText:"Healthy",icon:"🔬"},{name:"Ventilators",count:"24 / 30",status:"warning",statusText:"Low",icon:"🫁"},{name:"Wheelchairs",count:"45 available",status:"active",statusText:"Healthy",icon:"♿"},{name:"Ambulances",count:"6 active / 8",status:"warning",statusText:"Low",icon:"🚑"},{name:"Oxygen Cylinders",count:"18 / 50",status:"critical",statusText:"Critical",icon:"🧪"},{name:"PPE Kits",count:"2,100 units",status:"active",statusText:"Healthy",icon:"🥼"},{name:"Blood Units",count:"340 units",status:"warning",statusText:"Low",icon:"🩸"}],L=[{text:"Patient Admitted",desc:"Rajesh Kumar admitted to ICU-4 with cardiac emergency.",time:"2 min ago",dot:"red"},{text:"Appointment Booked",desc:"Kavya Nair scheduled for oncology consultation at 2:00 PM.",time:"15 min ago",dot:"blue"},{text:"Shift Updated",desc:"Night shift staff roster updated by HR admin.",time:"32 min ago",dot:"orange"},{text:"Inventory Alert",desc:"Oxygen cylinder stock dropped below threshold (36%).",time:"1 hr ago",dot:"red"},{text:"Doctor Added",desc:"Dr. Nisha Gupta joined the Dermatology department.",time:"2 hrs ago",dot:"green"},{text:"Bed Transferred",desc:"Patient moved from General Ward to Private Room 112.",time:"3 hrs ago",dot:"teal"},{text:"Report Generated",desc:"Monthly analytics report exported by admin.",time:"4 hrs ago",dot:"blue"}],q=[{label:"Add Doctor",icon:"👨‍⚕️",gradient:"linear-gradient(135deg, #0F766E, #14B8A6)"},{label:"Register Patient",icon:"📋",gradient:"linear-gradient(135deg, #3B82F6, #38BDF8)"},{label:"Book Appointment",icon:"📅",gradient:"linear-gradient(135deg, #EA580C, #F59E0B)"},{label:"Assign Shift",icon:"🕐",gradient:"linear-gradient(135deg, #7C3AED, #A78BFA)"},{label:"Allocate Bed",icon:"🛏️",gradient:"linear-gradient(135deg, #059669, #34D399)"},{label:"Generate Report",icon:"📊",gradient:"linear-gradient(135deg, #0F766E, #38BDF8)"},{label:"Export PDF",icon:"📄",gradient:"linear-gradient(135deg, #DC2626, #F87171)"},{label:"Export Excel",icon:"📗",gradient:"linear-gradient(135deg, #16A34A, #4ADE80)"},{label:"Announcement",icon:"📢",gradient:"linear-gradient(135deg, #F59E0B, #FBBF24)"}];function Et(e=""){const t=i("#deptTable tbody");if(!t)return;const n=e?B.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())):B;t.innerHTML=n.map(a=>`
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
  `).join("")}Et();function I(e=""){const t=i("#doctorCardsGrid");if(!t)return;const n=e?y.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.dept.toLowerCase().includes(e.toLowerCase())):y;if(n.length===0){t.innerHTML=`<div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No doctors found matching "${e}".</div>`;return}t.innerHTML=n.map(a=>{const s=a.burnout.charAt(0).toUpperCase()+a.burnout.slice(1),o=a.status==="active"?"active":"busy",c=a.status==="active"?"green":"yellow",u=a.status==="active"?"Available":"On Call";return`
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
            ${u}
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
            <span class="burnout-indicator ${a.burnout}">${s}</span>
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
    `}).join("")}I();function P(e=""){const t=i("#doctorTable tbody");if(!t)return;const n=e?y.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.dept.toLowerCase().includes(e.toLowerCase())):y;t.innerHTML=n.map(a=>`
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
  `).join("")}P();var at;(at=i("#doctorSearch"))==null||at.addEventListener("input",e=>{const t=e.target.value.trim();I(t),P(t)});var it;(it=i("#addDoctorSectionBtn"))==null||it.addEventListener("click",()=>{p("#addDoctorModal")});function E(e=""){const t=i("#patientTable tbody");if(!t)return;const n=e?w.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.id.toLowerCase().includes(e.toLowerCase())):w;t.innerHTML=n.map(a=>{const s=a.status==="Critical"?"critical":a.status==="Stable"?"active":a.status==="Recovering"?"available":"info",o=a.status==="Critical"?"red":a.status==="Stable"||a.status==="Recovering"?"green":"blue";return`
      <tr>
        <td><code style="font-size:12px;background:rgba(15,118,110,0.06);padding:3px 8px;border-radius:6px;">${a.id}</code></td>
        <td><strong>${a.name}</strong></td>
        <td>${a.doctor}</td>
        <td>${a.dept}</td>
        <td><span class="priority-badge ${a.priority}">${a.priority.toUpperCase()}</span></td>
        <td>${a.appt}</td>
        <td>${a.room}</td>
        <td><span class="status-chip ${s}"><span class="status-dot ${o}"></span>${a.status}</span></td>
        <td class="table-actions">
          <button class="btn btn-sm btn-secondary">View</button>
          <button class="btn btn-sm btn-outline">Edit</button>
          <button class="btn btn-sm btn-outline">Record</button>
        </td>
      </tr>
    `}).join("")}E();var nt;(nt=i("#patientSearch"))==null||nt.addEventListener("input",e=>{E(e.target.value)});let V="today";function R(e=V){const t=i("#appointmentList");if(!t)return;V=e;let n=C;if(e==="upcoming"?n=C.filter(a=>a.status==="upcoming"):e==="completed"?n=C.filter(a=>a.status==="completed"):e==="cancelled"?n=C.filter(a=>a.status==="cancelled"):e==="today"&&(n=C.filter(a=>a.status!=="cancelled")),n.length===0){t.innerHTML=`<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No ${e} appointments found.</div>`;return}t.innerHTML=n.map(a=>{const s=a.status==="completed"?"active":a.status==="in-progress"?"warning":a.status==="cancelled"?"danger":"info",o=a.status==="completed"?"Completed":a.status==="in-progress"?"In Progress":a.status==="cancelled"?"Cancelled":"Upcoming";return`
      <div class="appointment-item">
        <span class="appointment-time">${a.time}</span>
        <span class="appointment-line"></span>
        <div class="appointment-details" style="flex:1;">
          <h4>${a.patient}</h4>
          <p>${a.type} · ${a.doctor}</p>
        </div>
        <span class="status-chip ${s}">${o}</span>
      </div>
    `}).join("")}R();b(".appointment-tab").forEach(e=>{e.addEventListener("click",()=>{b(".appointment-tab").forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=e.textContent.trim().toLowerCase(),n=t.includes("today")?"today":t.includes("upcoming")?"upcoming":t.includes("completed")?"completed":"cancelled";R(n)})});function N(){const e=i("#bedGrid");e&&(e.innerHTML=T.map(t=>{const n=t.capacity-t.occupied,a=(t.occupied/t.capacity*100).toFixed(0),s=a>85?"danger":a>65?"warning":"success";return`
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
            <div class="bed-stat-value" style="color:var(--success)">${n}</div>
            <div class="bed-stat-label">Available</div>
          </div>
        </div>
        <div class="progress-bar"><div class="progress-bar-fill ${s}" data-width="${a}"></div></div>
        <div class="bed-card-actions">
          <button class="btn btn-sm btn-primary" style="flex:1;">Allocate</button>
          <button class="btn btn-sm btn-outline">Transfer</button>
          <button class="btn btn-sm btn-outline">Discharge</button>
        </div>
      </div>
    `}).join(""),b(".progress-bar-fill[data-width]").forEach(t=>W.observe(t)))}N();function St(){const e=i("#shiftCards");e&&(e.innerHTML=Pt.map(t=>`
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
  `).join(""))}St();function j(e=""){const t=i("#inventoryList");if(!t)return;const n=e?S.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())):S;t.innerHTML=n.map(a=>`
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
  `).join("")}j();function Dt(){const e=i("#activityFeed");e&&(e.innerHTML=L.map((t,n)=>`
    <div class="activity-item">
      <div class="activity-dot-wrap">
        <div class="activity-dot ${t.dot}"></div>
        ${n<L.length-1?'<div class="activity-line-v"></div>':""}
      </div>
      <div class="activity-content">
        <h4>${t.text}</h4>
        <p>${t.desc}</p>
        <div class="activity-time">${t.time}</div>
      </div>
    </div>
  `).join(""))}Dt();function Bt(){const e=i("#quickActionsGrid");e&&(e.innerHTML=q.map(t=>`
    <div class="quick-action-btn" role="button" tabindex="0">
      <div class="quick-action-icon" style="background:${t.gradient};font-size:20px;">${t.icon}</div>
      <span>${t.label}</span>
    </div>
  `).join(""))}Bt();function K(){if(typeof Chart>"u")return;Chart.defaults.font.family="'Inter', 'Poppins', sans-serif",Chart.defaults.font.size=12,Chart.defaults.color="#64748B",Chart.defaults.plugins.legend.labels.usePointStyle=!0,Chart.defaults.plugins.legend.labels.pointStyleWidth=10,Chart.defaults.plugins.legend.labels.padding=16;const t={color:"rgba(15, 118, 110, 0.05)",drawBorder:!1},n=i("#chartLine");n&&(window.lineChartInstance=new Chart(n,{type:"line",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{label:"Patients",data:[145,178,162,210,195,230,198],borderColor:"#0F766E",backgroundColor:"rgba(15, 118, 110, 0.08)",fill:!0,tension:.4,borderWidth:2.5,pointRadius:4,pointBackgroundColor:"#0F766E",pointBorderColor:"#fff",pointBorderWidth:2,pointHoverRadius:7}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:t},y:{grid:t,beginAtZero:!0}},plugins:{legend:{display:!1}},animation:{duration:1500,easing:"easeOutQuart"}}}));const a=i("#chartBar");a&&new Chart(a,{type:"bar",data:{labels:["Cardio","Ortho","Neuro","Pedia","ER","Onco"],datasets:[{label:"Patients",data:[78,94,56,45,34,42],backgroundColor:["rgba(15, 118, 110, 0.75)","rgba(20, 184, 166, 0.75)","rgba(56, 189, 248, 0.75)","rgba(124, 58, 237, 0.75)","rgba(239, 68, 68, 0.75)","rgba(245, 158, 11, 0.75)"],borderRadius:8,borderSkipped:!1,barPercentage:.6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{display:!1}},y:{grid:t,beginAtZero:!0}},plugins:{legend:{display:!1}},animation:{duration:1500,easing:"easeOutQuart"}}});const s=i("#chartDoughnut");s&&new Chart(s,{type:"doughnut",data:{labels:["In-Patient","Out-Patient","Emergency","ICU","Day Care"],datasets:[{data:[35,30,15,12,8],backgroundColor:["#0F766E","#14B8A6","#38BDF8","#7C3AED","#F59E0B"],borderWidth:0,spacing:3}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:11}}}},animation:{animateRotate:!0,duration:1500}}});const o=i("#chartArea");if(o){const u=o.getContext("2d").createLinearGradient(0,0,0,280);u.addColorStop(0,"rgba(56, 189, 248, 0.2)"),u.addColorStop(1,"rgba(56, 189, 248, 0.01)");const d=o.getContext("2d").createLinearGradient(0,0,0,280);d.addColorStop(0,"rgba(15, 118, 110, 0.15)"),d.addColorStop(1,"rgba(15, 118, 110, 0.01)"),window.areaChartInstance=new Chart(o,{type:"line",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{label:"Booked",data:[42,55,48,62,58,72,65],borderColor:"#38BDF8",backgroundColor:u,fill:!0,tension:.4,borderWidth:2,pointRadius:3,pointBackgroundColor:"#38BDF8"},{label:"Completed",data:[38,50,44,55,52,64,58],borderColor:"#0F766E",backgroundColor:d,fill:!0,tension:.4,borderWidth:2,pointRadius:3,pointBackgroundColor:"#0F766E"}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:t},y:{grid:t,beginAtZero:!0}},plugins:{legend:{position:"top"}},animation:{duration:1800,easing:"easeOutQuart"}}})}const c=i("#chartDonut2");c&&new Chart(c,{type:"doughnut",data:{labels:["ICU","Emergency","General","Private","Pediatrics"],datasets:[{data:[90,62.5,74,70,62],backgroundColor:["#EF4444","#F59E0B","#0F766E","#7C3AED","#38BDF8"],borderWidth:0,spacing:3}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"60%",plugins:{legend:{position:"bottom",labels:{padding:12,font:{size:11}}},tooltip:{callbacks:{label:u=>` ${u.label}: ${u.raw}% occupied`}}},animation:{animateRotate:!0,duration:1500}}})}typeof Chart<"u"?K():window.addEventListener("load",()=>{setTimeout(K,200)});function l(e,t,n="info",a=4500){const s=i("#toastContainer");if(!s)return;const o={success:"✅",warning:"⚠️",danger:"🚨",info:"ℹ️"},c=document.createElement("div");c.className=`toast-card ${n}`,c.innerHTML=`
    <div class="toast-icon">${o[n]||"ℹ️"}</div>
    <div class="toast-content">
      <div class="toast-title">${e}</div>
      <div class="toast-msg">${t}</div>
    </div>
    <button class="toast-close">&times;</button>
  `,c.querySelector(".toast-close").addEventListener("click",()=>Q(c)),s.appendChild(c),a>0&&setTimeout(()=>Q(c),a)}function Q(e){!e||!e.parentNode||(e.style.animation="toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",setTimeout(()=>e.remove(),300))}function k(e,t){const n=i("#detailInspectorModal"),a=i("#inspectorTitle"),s=i("#inspectorContent");!n||!a||!s||(a.textContent=e,s.innerHTML=`
    <div class="detail-inspector-card">
      ${Object.entries(t).map(([o,c])=>`
        <div class="detail-row">
          <span class="detail-label">${o}</span>
          <span class="detail-value">${c}</span>
        </div>
      `).join("")}
    </div>
  `,p("#detailInspectorModal"))}var st;(st=i("#notifBtn"))==null||st.addEventListener("click",()=>{p("#notificationsModal")});var ot;(ot=i("#clearNotifBtn"))==null||ot.addEventListener("click",()=>{l("Notifications Cleared","All pending alerts have been marked as read.","info"),f("#notificationsModal")});var rt;(rt=i("#msgBtn"))==null||rt.addEventListener("click",()=>{p("#messagesModal")});var ct;(ct=i("#pageHeaderExportBtn"))==null||ct.addEventListener("click",()=>{p("#reportsModal"),l("Export Center","Select a report to download or export full executive package.","info")});var dt;(dt=i("#pageHeaderQuickActionBtn"))==null||dt.addEventListener("click",()=>{p("#quickActionModal"),It()});var lt;(lt=i("#registerPatientBtn"))==null||lt.addEventListener("click",()=>{p("#registerPatientModal")});var ut;(ut=i("#headerAllocateBedBtn"))==null||ut.addEventListener("click",()=>{p("#bedAllocationModal"),i("#bedActionType")&&(i("#bedActionType").value="allocate")});var pt;(pt=i("#manageInventoryBtn"))==null||pt.addEventListener("click",()=>{p("#inventoryManageModal")});var vt;(vt=i("#inventoryManageForm"))==null||vt.addEventListener("submit",e=>{var o;e.preventDefault();const t=i("#invItemSelect").value,n=i("#invCountInput").value.trim(),a=i("#invStatusSelect").value,s=S.find(c=>c.name===t);s&&(s.count=n,s.status=a,s.statusText=a==="active"?"Healthy":a==="warning"?"Low":"Critical",j(),l("Inventory Stock Updated",`${t} stock level updated to "${n}".`,"success"),(o=window.AarogyaAPI)==null||o.emit("inventoryUpdated",s)),f("#inventoryManageModal"),e.target.reset()});var mt;(mt=i("#analyticsMonthBtn"))==null||mt.addEventListener("click",()=>{var s,o,c,u;const e=i("#analyticsWeekBtn"),t=i("#analyticsMonthBtn");e&&t&&(e.classList.remove("btn-secondary"),e.classList.add("btn-outline"),t.classList.remove("btn-outline"),t.classList.add("btn-secondary")),window.lineChartInstance&&(window.lineChartInstance.data.labels=["Week 1","Week 2","Week 3","Week 4"],window.lineChartInstance.data.datasets[0].data=[680,840,790,950],window.lineChartInstance.update()),window.areaChartInstance&&(window.areaChartInstance.data.labels=["Week 1","Week 2","Week 3","Week 4"],window.areaChartInstance.data.datasets[0].data=[240,310,280,340],window.areaChartInstance.data.datasets[1].data=[210,280,260,315],window.areaChartInstance.update());const n=(o=(s=document.querySelector("#chartLine"))==null?void 0:s.closest(".dashboard-card"))==null?void 0:o.querySelector(".chart-title"),a=(u=(c=document.querySelector("#chartLine"))==null?void 0:c.closest(".dashboard-card"))==null?void 0:u.querySelector(".chart-subtitle");n&&(n.textContent="Patients This Month"),a&&(a.textContent="Monthly patient admissions overview"),l("Analytics Timeframe","Displaying operational analytics for This Month.","info")});var ht;(ht=i("#analyticsWeekBtn"))==null||ht.addEventListener("click",()=>{var s,o,c,u;const e=i("#analyticsWeekBtn"),t=i("#analyticsMonthBtn");e&&t&&(t.classList.remove("btn-secondary"),t.classList.add("btn-outline"),e.classList.remove("btn-outline"),e.classList.add("btn-secondary")),window.lineChartInstance&&(window.lineChartInstance.data.labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],window.lineChartInstance.data.datasets[0].data=[145,178,162,210,195,230,198],window.lineChartInstance.update()),window.areaChartInstance&&(window.areaChartInstance.data.labels=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],window.areaChartInstance.data.datasets[0].data=[42,55,48,62,58,72,65],window.areaChartInstance.data.datasets[1].data=[38,50,44,55,52,64,58],window.areaChartInstance.update());const n=(o=(s=document.querySelector("#chartLine"))==null?void 0:s.closest(".dashboard-card"))==null?void 0:o.querySelector(".chart-title"),a=(u=(c=document.querySelector("#chartLine"))==null?void 0:c.closest(".dashboard-card"))==null?void 0:u.querySelector(".chart-subtitle");n&&(n.textContent="Patients This Week"),a&&(a.textContent="Daily patient admissions"),l("Analytics Timeframe","Displaying operational analytics for This Week.","info")});var gt;(gt=i("#adminProfile"))==null||gt.addEventListener("click",()=>{k("Dr. Arjun (Administrator)",{"Full Name":"Dr. Arjun Kapoor",Role:"Chief Hospital Administrator",Email:"arjun@aarogyahospital.com",Department:"Hospital Operations",Privileges:"Full Executive Access",Status:"Active (Logged in)"})});const m=i("#globalSearch"),h=i("#globalSearchResults");function F(e){const t=e.trim().toLowerCase();if(E(t),P(t),Et(t),j(t),!h)return;if(!t){h.classList.remove("active"),h.innerHTML="";return}const n=w.filter(r=>r.name.toLowerCase().includes(t)||r.id.toLowerCase().includes(t)||r.dept.toLowerCase().includes(t)),a=y.filter(r=>r.name.toLowerCase().includes(t)||r.dept.toLowerCase().includes(t)),s=B.filter(r=>r.name.toLowerCase().includes(t)),o=S.filter(r=>r.name.toLowerCase().includes(t)),c=q.filter(r=>r.label.toLowerCase().includes(t));if(n.length+a.length+s.length+o.length+c.length===0){h.innerHTML=`
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
    `),n.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">🩺 Patients (${n.length})</div>
        ${n.slice(0,4).map(r=>`
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
    `),s.length>0&&(d+=`
      <div class="search-results-group">
        <div class="search-group-header">🏢 Departments (${s.length})</div>
        ${s.map(r=>`
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
    `),h.innerHTML=d,h.classList.add("active")}m==null||m.addEventListener("input",e=>{F(e.target.value)});m==null||m.addEventListener("focus",e=>{e.target.value.trim()&&F(e.target.value)});m==null||m.addEventListener("keydown",e=>{if(e.key==="Enter"){const t=e.target.value.trim();t&&(l("Global Search",`Filtered all hospital records for "${t}".`,"info"),F(t))}else e.key==="Escape"&&(h==null||h.classList.remove("active"),m.blur())});h==null||h.addEventListener("click",e=>{const t=e.target.closest(".search-result-row");if(!t)return;const n=t.dataset.type,a=t.dataset.name||t.dataset.id||t.dataset.label;if(h.classList.remove("active"),n==="action")U(a);else if(n==="patient"){const s=t.dataset.id,o=w.find(c=>c.id===s);o&&(i("#editPatientId").value=o.id,i("#editPatientName").value=o.name,i("#editPatientDept").value=o.dept,i("#editPatientDoctor").value=o.doctor,i("#editPatientPriority").value=o.priority,i("#editPatientRoom").value=o.room,i("#editPatientStatus").value=o.status,p("#editPatientModal"))}else if(n==="doctor"){const s=t.dataset.name,o=y.find(c=>c.name===s);o&&(i("#editDoctorOriginalName").value=o.name,i("#editDoctorName").value=o.name,i("#editDoctorDept").value=o.dept,i("#editDoctorShift").value=o.shift,i("#editDoctorStatus").value=o.status,p("#editDoctorModal"))}else if(n==="dept"){const s=document.getElementById("section-departments");s&&s.scrollIntoView({behavior:"smooth"}),l("Department Found",`Navigated to ${a} Department.`,"info")}else if(n==="inventory"){const s=t.dataset.name;p("#inventoryManageModal"),i("#invItemSelect")&&(i("#invItemSelect").value=s)}});document.addEventListener("keydown",e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),m==null||m.focus(),m!=null&&m.value.trim()&&F(m.value))});document.addEventListener("click",e=>{e.target.closest(".search-bar")||h==null||h.classList.remove("active")});function It(){const e=i("#modalQuickActionGrid");e&&(e.innerHTML=q.map(t=>`
    <div class="quick-action-btn modal-qa-item" data-action="${t.label}" role="button" tabindex="0">
      <div class="quick-action-icon" style="background:${t.gradient};font-size:20px;">${t.icon}</div>
      <span>${t.label}</span>
    </div>
  `).join(""),b(".modal-qa-item").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.action;f("#quickActionModal"),U(n)})}))}function U(e){if(e==="Add Doctor")p("#addDoctorModal");else if(e==="Register Patient")p("#registerPatientModal");else if(e==="Book Appointment")p("#bookAppointmentModal");else if(e==="Allocate Bed"||e==="Assign Shift")p("#bedAllocationModal");else if(e==="Generate Report")p("#reportsModal");else if(e==="Export PDF")l("Exporting PDF","Generating high-resolution hospital operational PDF...","success");else if(e==="Export Excel")l("Exporting Excel","Exporting patient & revenue datasets to CSV format...","success");else if(e==="Announcement"){const t=prompt("Enter Broadcast Announcement Message for Hospital Staff:");t&&l("📢 Hospital Broadcast Sent",t,"info")}else l("Quick Action",`Action "${e}" executed.`,"info")}var ft;(ft=i("#registerPatientForm"))==null||ft.addEventListener("submit",e=>{var d;e.preventDefault();const t=i("#regPatientName").value.trim(),n=i("#regPatientDept").value,a=i("#regPatientDoctor").value,s=i("#regPatientPriority").value,o=i("#regPatientRoom").value.trim()||"General",c=i("#regPatientStatus").value,u={id:`PT-${Math.floor(1e4+Math.random()*9e4)}`,name:t,doctor:a,dept:n,priority:s,appt:"Just Now",room:o,status:c};w.unshift(u),E(),f("#registerPatientModal"),e.target.reset(),l("Patient Registered",`${t} (${u.id}) registered in ${n}.`,"success"),L.unshift({text:"Patient Registered",desc:`${t} registered for ${n} with ${a}.`,time:"Just now",dot:"teal"}),Dt(),(d=window.AarogyaAPI)==null||d.emit("patientRegistered",u)});var bt;(bt=i("#addDoctorForm"))==null||bt.addEventListener("submit",e=>{var c;e.preventDefault();const t=i("#docName").value.trim(),n=i("#docDept").value,a=i("#docShift").value,s=i("#docStatus").value,o={name:t,initials:t.split(" ").map(u=>u[0]).join("").slice(0,2).toUpperCase(),avatar:"a"+(Math.floor(Math.random()*6)+1),dept:n,patients:0,hours:"0h",shift:a,burnout:"low",status:s};y.unshift(o),P(),I(),f("#addDoctorModal"),e.target.reset(),l("Doctor Added",`${t} assigned to ${n} (${a} shift).`,"success"),(c=window.AarogyaAPI)==null||c.emit("doctorAdded",o)});var yt;(yt=i("#bookAppointmentForm"))==null||yt.addEventListener("submit",e=>{var c;e.preventDefault();const t=i("#apptPatientName").value.trim(),n=i("#apptDoctorName").value,a=i("#apptType").value.trim(),s=i("#apptTimeStr").value.trim()||"12:30 PM",o={time:s,patient:t,doctor:n,type:a,status:"upcoming"};C.unshift(o),R(),f("#bookAppointmentModal"),e.target.reset(),l("Appointment Scheduled",`Appointment for ${t} with ${n} booked at ${s}.`,"success"),(c=window.AarogyaAPI)==null||c.emit("appointmentBooked",o)});var wt;(wt=i("#bedAllocationForm"))==null||wt.addEventListener("submit",e=>{e.preventDefault();const t=i("#bedWardSelect").value,n=i("#bedActionType").value,a=i("#bedPatientInfo").value.trim(),s=T.find(o=>o.ward===t);s&&(n==="allocate"?s.occupied<s.capacity?(s.occupied++,l("Bed Allocated",`Allocated 1 bed in ${t} for ${a}.`,"success")):l("Ward Full",`${t} is currently at max capacity!`,"danger"):n==="transfer"?l("Bed Transferred",`Bed transfer requested for ${a} to ${t}.`,"info"):n==="discharge"&&s.occupied>0&&(s.occupied--,l("Patient Discharged",`Freed 1 bed in ${t}. Patient ${a} discharged.`,"success")),N()),f("#bedAllocationModal"),e.target.reset()});var Ct;(Ct=i("#editPatientForm"))==null||Ct.addEventListener("submit",e=>{var a;e.preventDefault();const t=i("#editPatientId").value,n=w.find(s=>s.id===t);n&&(n.name=i("#editPatientName").value.trim(),n.dept=i("#editPatientDept").value,n.doctor=i("#editPatientDoctor").value,n.priority=i("#editPatientPriority").value,n.room=i("#editPatientRoom").value.trim(),n.status=i("#editPatientStatus").value,E(),l("Patient Updated",`Record for ${n.name} (${n.id}) updated successfully.`,"success"),(a=window.AarogyaAPI)==null||a.emit("patientUpdated",n)),f("#editPatientModal")});var At;(At=i("#editDoctorForm"))==null||At.addEventListener("submit",e=>{var a;e.preventDefault();const t=i("#editDoctorOriginalName").value,n=y.find(s=>s.name===t);n&&(n.name=i("#editDoctorName").value.trim(),n.dept=i("#editDoctorDept").value,n.shift=i("#editDoctorShift").value,n.status=i("#editDoctorStatus").value,P(),I(),l("Doctor Profile Updated",`Profile for ${n.name} updated successfully.`,"success"),(a=window.AarogyaAPI)==null||a.emit("doctorUpdated",n)),f("#editDoctorModal")});var $t;($t=i("#viewAllActivityBtn"))==null||$t.addEventListener("click",()=>{Rt(),p("#allActivitiesModal")});function Rt(){const e=i("#allActivitiesList");e&&(e.innerHTML=L.map((t,n)=>`
    <div class="activity-item">
      <div class="activity-dot-wrap">
        <div class="activity-dot ${t.dot}"></div>
        ${n<L.length-1?'<div class="activity-line-v"></div>':""}
      </div>
      <div class="activity-content">
        <h4>${t.text}</h4>
        <p>${t.desc}</p>
        <div class="activity-time">${t.time}</div>
      </div>
    </div>
  `).join(""))}document.addEventListener("click",e=>{var o,c,u;const t=e.target.closest("button, .btn, .quick-action-btn");if(!t)return;const n=t.closest("#quickActionsGrid .quick-action-btn");if(n){const d=((o=n.querySelector("span"))==null?void 0:o.textContent)||"Action";U(d);return}const a=t.textContent.trim(),s=t.closest(".manage-doc-btn");if(s){const d=s.dataset.name,r=y.find(v=>v.name===d);r&&(i("#editDoctorOriginalName").value=r.name,i("#editDoctorName").value=r.name,i("#editDoctorDept").value=r.dept,i("#editDoctorShift").value=r.shift,i("#editDoctorStatus").value=r.status,p("#editDoctorModal"));return}if(t.closest("#deptTable")){const d=t.closest("tr"),r=d?d.children[0].textContent.trim():"Department";if(a==="View")k(`${r} Department`,{"Active Doctors":d.children[1].textContent,"Current Patients":d.children[2].textContent,"Avg Wait Time":d.children[3].textContent,"Operational Status":d.children[4].textContent.trim()});else if(a==="Assign Staff")p("#addDoctorModal"),i("#docDept").value=r.split(" ")[0];else if(a==="Analytics"){const v=document.getElementById("section-analytics");v&&(v.scrollIntoView({behavior:"smooth"}),l("Analytics Navigated",`Viewing workload analytics for ${r}.`,"info"))}return}if(t.closest("#doctorTable")){const d=t.closest("tr");if(d&&a==="Manage"){const r=((c=d.querySelector(".doctor-cell div div"))==null?void 0:c.textContent.trim())||"Doctor",v=y.find(g=>g.name===r);v?(i("#editDoctorOriginalName").value=v.name,i("#editDoctorName").value=v.name,i("#editDoctorDept").value=v.dept,i("#editDoctorShift").value=v.shift,i("#editDoctorStatus").value=v.status,p("#editDoctorModal")):k(`Doctor Profile — ${r}`,{Department:d.children[1].textContent,"Active Patients":d.children[2].textContent,"Hours Worked":d.children[3].textContent,Shift:d.children[4].textContent.trim(),"Burnout Status":d.children[5].textContent.trim(),Availability:d.children[6].textContent.trim()})}return}if(t.closest("#patientTable")){const d=t.closest("tr");if(d){const r=d.children[0].textContent.trim(),v=d.children[1].textContent.trim(),g=w.find(x=>x.id===r);a==="Edit"&&g?(i("#editPatientId").value=g.id,i("#editPatientName").value=g.name,i("#editPatientDept").value=g.dept,i("#editPatientDoctor").value=g.doctor,i("#editPatientPriority").value=g.priority,i("#editPatientRoom").value=g.room,i("#editPatientStatus").value=g.status,p("#editPatientModal")):a==="View"||a==="Edit"?k(`Patient Record — ${v} (${r})`,{"Patient ID":r,"Full Name":v,"Attending Doctor":d.children[2].textContent,Department:d.children[3].textContent,Priority:d.children[4].textContent.trim(),"Appointment Time":d.children[5].textContent,"Room / Bed":d.children[6].textContent,"Health Status":d.children[7].textContent.trim()}):a==="Record"&&l("Medical Records",`Opening EMR EHR chart records for ${v} (${r}).`,"info")}return}if(t.closest(".bed-card")){const v=(((u=t.closest(".bed-card").querySelector("h4"))==null?void 0:u.textContent.trim())||"Ward").replace(/[^a-zA-Z\s]/g,"").trim();if(a==="Allocate")p("#bedAllocationModal"),i("#bedWardSelect").value=v,i("#bedActionType").value="allocate";else if(a==="Transfer")p("#bedAllocationModal"),i("#bedWardSelect").value=v,i("#bedActionType").value="transfer";else if(a==="Discharge"&&confirm(`Confirm patient discharge from ${v}?`)){const g=T.find(x=>x.ward.toLowerCase().includes(v.toLowerCase()));g&&g.occupied>0&&(g.occupied--,N(),l("Patient Discharged",`Patient discharged from ${v}. Freed 1 bed.`,"success"))}return}});const D={};window.AarogyaAPI={showToast:l,inspectItem:k,openModal:p,closeModal:f,registerPatient:e=>{w.unshift(e),E(),l("Patient Registered",`${e.name} registered via API.`,"success"),window.AarogyaAPI.emit("patientRegistered",e)},addDoctor:e=>{y.unshift(e),P(),l("Doctor Added",`${e.name} added via API.`,"success"),window.AarogyaAPI.emit("doctorAdded",e)},bookAppointment:e=>{C.unshift(e),R(),l("Appointment Booked",`Appointment for ${e.patient} booked via API.`,"success"),window.AarogyaAPI.emit("appointmentBooked",e)},allocateBed:(e,t="allocate")=>{const n=T.find(a=>a.ward.toLowerCase()===e.toLowerCase());n&&(t==="allocate"&&n.occupied<n.capacity?n.occupied++:t==="discharge"&&n.occupied>0&&n.occupied--,N(),l("Bed Status Updated",`${n.ward} occupied: ${n.occupied}/${n.capacity}`,"info"),window.AarogyaAPI.emit("bedUpdated",n))},exportReport:e=>{l("Report Exported",`${e} generated via API integration.`,"success"),window.AarogyaAPI.emit("reportExported",{reportName:e,timestamp:new Date})},getState:()=>({departments:B,doctors:y,patients:w,appointments:C,beds:T,shifts:Pt,inventory:S,activities:L}),on:(e,t)=>{D[e]||(D[e]=[]),D[e].push(t)},emit:(e,t)=>{D[e]&&D[e].forEach(n=>n(t))}};setTimeout(()=>{b(".animate-in:not(.visible)").forEach(e=>O.observe(e))},100);console.log("%c Aarogya Dashboard v1.0 ","background: linear-gradient(135deg, #0F766E, #38BDF8); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;");console.log("%c AI Powered Hospital Intelligence Platform Ready ","color: #14B8A6; font-size: 12px; font-weight: 600;");
