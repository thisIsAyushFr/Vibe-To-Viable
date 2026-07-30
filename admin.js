/* ================================================================
   Aarogya — Admin Dashboard Script
   Complete interactive logic, dummy data, charts & animations
   ================================================================ */

// ────────────────────────────────────────────────────────────────
// UTILITY
// ────────────────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// Format numbers with commas
function formatNumber(n) {
  if (n >= 1_000_000) return '₹' + (n / 100_000).toFixed(1) + 'L';
  return n.toLocaleString('en-IN');
}

// ────────────────────────────────────────────────────────────────
// DATE DISPLAY
// ────────────────────────────────────────────────────────────────
function setCurrentDate() {
  const el = $('#currentDate');
  if (!el) return;
  const now = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  el.textContent = now.toLocaleDateString('en-IN', options);
}
setCurrentDate();

// ────────────────────────────────────────────────────────────────
// SIDEBAR TOGGLE (Mobile)
// ────────────────────────────────────────────────────────────────
const sidebar = $('#sidebar');
const overlay = $('#sidebarOverlay');
const menuToggle = $('#menuToggle');

menuToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});

// ────────────────────────────────────────────────────────────────
// SIDEBAR NAVIGATION & SECTION SWITCHING
// ────────────────────────────────────────────────────────────────
const sectionMap = {
  dashboard: 'kpiGrid',
  doctors: 'section-doctors',
  patients: 'section-patients',
  appointments: 'section-appointments',
  emergency: 'section-emergency',
  departments: 'section-departments',
  'bed-management': 'section-beds',
  'staff-shifts': 'section-staff',
  analytics: 'section-analytics',
  'ai-insights': 'section-ai-insights',
  inventory: 'section-inventory'
};

// Sidebar nav clicks & section scrolling
$$('.nav-item:not(.logout)').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    $$('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    const sectionKey = item.dataset.section;

    // Modal triggers vs Section scrolling
    if (sectionKey === 'reports') {
      openModal('#reportsModal');
    } else if (sectionKey === 'settings') {
      openModal('#settingsModal');
    } else if (sectionKey === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionKey && sectionMap[sectionKey]) {
      const targetId = sectionMap[sectionKey];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const topNav = $('.top-navbar');
        const offset = (topNav ? topNav.offsetHeight : 70) + 20;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        // Apply temporary glow highlight
        $$('.section-highlight').forEach(el => el.classList.remove('section-highlight'));
        targetEl.classList.add('section-highlight');
        setTimeout(() => {
          targetEl.classList.remove('section-highlight');
        }, 2500);
      }
    }

    // Close on mobile
    if (window.innerWidth <= 1024) {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
    }
  });
});

// Logout button action
$('.nav-item.logout')?.addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('🔒 Logout Confirmation\n\nAre you sure you want to log out of Aarogya Hospital Intelligence Platform?')) {
    alert('Logged out successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ────────────────────────────────────────────────────────────────
// MODAL CONTROLLERS & EXPORT ACTIONS
// ────────────────────────────────────────────────────────────────
function openModal(modalSel) {
  const modal = $(modalSel);
  if (modal) modal.classList.add('active');
}

function closeModal(modalSel) {
  const modal = $(modalSel);
  if (modal) modal.classList.remove('active');
}

$('#closeReportsModal')?.addEventListener('click', () => closeModal('#reportsModal'));
$('#cancelReportsModal')?.addEventListener('click', () => closeModal('#reportsModal'));
$('#closeSettingsModal')?.addEventListener('click', () => closeModal('#settingsModal'));
$('#cancelSettingsModal')?.addEventListener('click', () => closeModal('#settingsModal'));

// Register all modal close buttons
$$('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const overlay = btn.closest('.modal-overlay');
    if (overlay) overlay.classList.remove('active');
  });
});

$$('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

// Close buttons inside modals
['#cancelAddDoctorModal', '#confirmInspectorModal', '#cancelQuickActionModal', '#cancelNotifModal', '#cancelMsgModal', '#cancelEditPatientModal', '#cancelEditDoctorModal', '#cancelAllActivitiesModal', '#cancelInventoryManageModal'].forEach(id => {
  $(id)?.addEventListener('click', () => {
    const overlay = $(id).closest('.modal-overlay');
    if (overlay) overlay.classList.remove('active');
  });
});

$$('.export-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const reportName = btn.dataset.report || 'Report';
    showToast('📥 Downloading Report', `${reportName} has been generated and queued for download.`, 'success');
  });
});

$('#exportAllReportsBtn')?.addEventListener('click', () => {
  showToast('📦 Executive Package', 'All hospital operational reports are downloading as a ZIP archive.', 'success');
  closeModal('#reportsModal');
});

$('#saveSettingsBtn')?.addEventListener('click', () => {
  const theme = $('#themeSelect')?.value || 'light';
  const refreshRate = $('#refreshRateSelect')?.value || '15';
  const alertsEnabled = $('#emergencyAlertToggle')?.checked ?? true;

  showToast('⚙️ Preferences Saved', `Theme: ${theme === 'dark' ? 'Dark Aurora' : 'Light Aurora'} · Refresh: ${refreshRate}s · Alerts: ${alertsEnabled ? 'ON' : 'OFF'}`, 'success');
  closeModal('#settingsModal');
  window.AarogyaAPI?.emit('settingsUpdated', { theme, refreshRate, alertsEnabled });
});

// ────────────────────────────────────────────────────────────────
// SCROLL ANIMATION (IntersectionObserver)
// ────────────────────────────────────────────────────────────────
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

$$('.animate-in').forEach(el => animateObserver.observe(el));

// ────────────────────────────────────────────────────────────────
// KPI ANIMATED COUNTERS
// ────────────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);

    if (target >= 1_000_000) {
      el.textContent = prefix + (current / 100_000).toFixed(1) + 'L';
    } else {
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Observe KPI values
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count);
      if (!isNaN(target)) animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

$$('[data-count]').forEach(el => counterObserver.observe(el));

// ────────────────────────────────────────────────────────────────
// MINI BAR CHARTS (KPI Cards)
// ────────────────────────────────────────────────────────────────
function createMiniChart(containerId, data, color = '#14B8A6') {
  const container = $(`#${containerId}`);
  if (!container) return;
  data.forEach((val, i) => {
    const bar = document.createElement('div');
    bar.className = 'kpi-mini-bar';
    bar.style.height = `${val}%`;
    bar.style.background = color;
    bar.style.animationDelay = `${i * 0.08}s`;
    container.appendChild(bar);
  });
}

createMiniChart('miniChart1', [40, 65, 50, 80, 60, 90, 75, 85], '#14B8A6');
createMiniChart('miniChart2', [60, 55, 70, 65, 80, 75, 90, 70], '#38BDF8');
createMiniChart('miniChart3', [50, 70, 45, 85, 60, 75, 80, 65], '#F59E0B');
createMiniChart('miniChart4', [80, 70, 60, 55, 50, 45, 40, 35], '#22C55E');
createMiniChart('miniChart5', [20, 35, 40, 55, 45, 60, 70, 80], '#EF4444');
createMiniChart('miniChart6', [50, 60, 55, 70, 80, 85, 90, 95], '#7C3AED');
createMiniChart('miniChart7', [30, 40, 35, 50, 60, 55, 45, 40], '#F59E0B');

// ────────────────────────────────────────────────────────────────
// HEALTH SCORE RING ANIMATION
// ────────────────────────────────────────────────────────────────
function animateHealthRing() {
  const ring = $('#healthRing');
  const valueEl = $('#healthValue');
  if (!ring || !valueEl) return;

  const score = 92;
  const circumference = 2 * Math.PI * 72; // r=72
  const offset = circumference - (score / 100) * circumference;

  // Animate ring
  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
  }, 500);

  // Animate number
  let current = 0;
  const interval = setInterval(() => {
    current++;
    valueEl.textContent = current;
    if (current >= score) clearInterval(interval);
  }, 20);
}

const healthObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateHealthRing();
      healthObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const healthCard = $('.health-score-card');
if (healthCard) healthObserver.observe(healthCard);

// ────────────────────────────────────────────────────────────────
// PROGRESS BARS ANIMATION
// ────────────────────────────────────────────────────────────────
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.dataset.width;
      setTimeout(() => { fill.style.width = width + '%'; }, 300);
      progressObserver.unobserve(fill);
    }
  });
}, { threshold: 0.2 });

$$('.progress-bar-fill[data-width]').forEach(el => progressObserver.observe(el));

// ────────────────────────────────────────────────────────────────
// DUMMY DATA
// ────────────────────────────────────────────────────────────────

// Department data
const departments = [
  { name: 'Cardiology', doctors: 24, patients: 78, wait: '12 min', status: 'active', statusText: 'Normal' },
  { name: 'Orthopedics', doctors: 18, patients: 94, wait: '28 min', status: 'warning', statusText: 'High Load' },
  { name: 'Pediatrics', doctors: 15, patients: 45, wait: '8 min', status: 'active', statusText: 'Normal' },
  { name: 'Neurology', doctors: 12, patients: 56, wait: '22 min', status: 'warning', statusText: 'Moderate' },
  { name: 'Emergency', doctors: 20, patients: 34, wait: '5 min', status: 'critical', statusText: 'Critical' },
  { name: 'Oncology', doctors: 14, patients: 42, wait: '15 min', status: 'active', statusText: 'Normal' },
  { name: 'Dermatology', doctors: 8, patients: 38, wait: '10 min', status: 'active', statusText: 'Normal' },
  { name: 'ICU', doctors: 16, patients: 22, wait: '3 min', status: 'critical', statusText: 'Near Full' },
];

// Doctor data
const doctors = [
  { name: 'Dr. Priya Sharma', initials: 'PS', avatar: 'a1', dept: 'Cardiology', patients: 18, hours: '9.5h', shift: 'Morning', burnout: 'high', status: 'active' },
  { name: 'Dr. Rahul Mehra', initials: 'RM', avatar: 'a2', dept: 'Orthopedics', patients: 4, hours: '6h', shift: 'Morning', burnout: 'low', status: 'active' },
  { name: 'Dr. Ananya Patel', initials: 'AP', avatar: 'a3', dept: 'Neurology', patients: 12, hours: '8h', shift: 'Afternoon', burnout: 'medium', status: 'active' },
  { name: 'Dr. Vikram Singh', initials: 'VS', avatar: 'a4', dept: 'Emergency', patients: 15, hours: '11h', shift: 'Night', burnout: 'high', status: 'busy' },
  { name: 'Dr. Sneha Reddy', initials: 'SR', avatar: 'a5', dept: 'Pediatrics', patients: 8, hours: '5h', shift: 'Morning', burnout: 'low', status: 'active' },
  { name: 'Dr. Arjun Nair', initials: 'AN', avatar: 'a6', dept: 'Oncology', patients: 10, hours: '7.5h', shift: 'Afternoon', burnout: 'medium', status: 'active' },
];

// Patient data
const patients = [
  { id: 'PT-10234', name: 'Rajesh Kumar', doctor: 'Dr. Priya Sharma', dept: 'Cardiology', priority: 'high', appt: '10:30 AM', room: 'ICU-4', status: 'Critical' },
  { id: 'PT-10235', name: 'Meera Joshi', doctor: 'Dr. Rahul Mehra', dept: 'Orthopedics', priority: 'medium', appt: '11:00 AM', room: '204-A', status: 'Stable' },
  { id: 'PT-10236', name: 'Amit Verma', doctor: 'Dr. Ananya Patel', dept: 'Neurology', priority: 'high', appt: '11:30 AM', room: '302-B', status: 'Under Observation' },
  { id: 'PT-10237', name: 'Sunita Devi', doctor: 'Dr. Sneha Reddy', dept: 'Pediatrics', priority: 'low', appt: '12:00 PM', room: 'PED-8', status: 'Recovering' },
  { id: 'PT-10238', name: 'Farhan Ali', doctor: 'Dr. Vikram Singh', dept: 'Emergency', priority: 'high', appt: '09:15 AM', room: 'ER-2', status: 'Critical' },
  { id: 'PT-10239', name: 'Kavya Nair', doctor: 'Dr. Arjun Nair', dept: 'Oncology', priority: 'medium', appt: '02:00 PM', room: '108-C', status: 'Stable' },
];

// Appointment data
const appointments = [
  { time: '09:00', patient: 'Farhan Ali', doctor: 'Dr. Vikram Singh', type: 'Emergency Consult', status: 'completed' },
  { time: '09:30', patient: 'Riya Menon', doctor: 'Dr. Priya Sharma', type: 'Follow-up ECG', status: 'completed' },
  { time: '10:00', patient: 'Karan Kapoor', doctor: 'Dr. Rahul Mehra', type: 'Knee MRI Review', status: 'completed' },
  { time: '10:30', patient: 'Rajesh Kumar', doctor: 'Dr. Priya Sharma', type: 'Cardiac Checkup', status: 'in-progress' },
  { time: '11:00', patient: 'Meera Joshi', doctor: 'Dr. Rahul Mehra', type: 'Post-surgery Review', status: 'upcoming' },
  { time: '11:30', patient: 'Amit Verma', doctor: 'Dr. Ananya Patel', type: 'Neuro Assessment', status: 'upcoming' },
  { time: '12:00', patient: 'Sunita Devi', doctor: 'Dr. Sneha Reddy', type: 'Pediatric Checkup', status: 'upcoming' },
  { time: '02:00', patient: 'Kavya Nair', doctor: 'Dr. Arjun Nair', type: 'Chemo Consultation', status: 'upcoming' },
];

// Bed management data
const beds = [
  { ward: 'ICU', icon: '🏥', capacity: 30, occupied: 27, color: '#EF4444' },
  { ward: 'Emergency', icon: '🚨', capacity: 40, occupied: 25, color: '#F59E0B' },
  { ward: 'General Ward', icon: '🛏️', capacity: 200, occupied: 148, color: '#0F766E' },
  { ward: 'Private Rooms', icon: '🏠', capacity: 60, occupied: 42, color: '#7C3AED' },
  { ward: 'Pediatrics', icon: '👶', capacity: 50, occupied: 31, color: '#38BDF8' },
];

// Shift data
const shifts = [
  { name: 'Morning', badge: 'morning', doctors: 64, nurses: 120, hours: '6:00 AM – 2:00 PM', overtime: '12h' },
  { name: 'Afternoon', badge: 'afternoon', doctors: 58, nurses: 105, hours: '2:00 PM – 10:00 PM', overtime: '8h' },
  { name: 'Night', badge: 'night', doctors: 42, nurses: 80, hours: '10:00 PM – 6:00 AM', overtime: '15h' },
];

// Inventory data
const inventory = [
  { name: 'Medicine Stock', count: '12,450 units', status: 'active', statusText: 'Healthy', icon: '💊' },
  { name: 'Surgical Equipment', count: '840 items', status: 'active', statusText: 'Healthy', icon: '🔬' },
  { name: 'Ventilators', count: '24 / 30', status: 'warning', statusText: 'Low', icon: '🫁' },
  { name: 'Wheelchairs', count: '45 available', status: 'active', statusText: 'Healthy', icon: '♿' },
  { name: 'Ambulances', count: '6 active / 8', status: 'warning', statusText: 'Low', icon: '🚑' },
  { name: 'Oxygen Cylinders', count: '18 / 50', status: 'critical', statusText: 'Critical', icon: '🧪' },
  { name: 'PPE Kits', count: '2,100 units', status: 'active', statusText: 'Healthy', icon: '🥼' },
  { name: 'Blood Units', count: '340 units', status: 'warning', statusText: 'Low', icon: '🩸' },
];

// Activity feed data
const activities = [
  { text: 'Patient Admitted', desc: 'Rajesh Kumar admitted to ICU-4 with cardiac emergency.', time: '2 min ago', dot: 'red' },
  { text: 'Appointment Booked', desc: 'Kavya Nair scheduled for oncology consultation at 2:00 PM.', time: '15 min ago', dot: 'blue' },
  { text: 'Shift Updated', desc: 'Night shift staff roster updated by HR admin.', time: '32 min ago', dot: 'orange' },
  { text: 'Inventory Alert', desc: 'Oxygen cylinder stock dropped below threshold (36%).', time: '1 hr ago', dot: 'red' },
  { text: 'Doctor Added', desc: 'Dr. Nisha Gupta joined the Dermatology department.', time: '2 hrs ago', dot: 'green' },
  { text: 'Bed Transferred', desc: 'Patient moved from General Ward to Private Room 112.', time: '3 hrs ago', dot: 'teal' },
  { text: 'Report Generated', desc: 'Monthly analytics report exported by admin.', time: '4 hrs ago', dot: 'blue' },
];

// Quick Actions data
const quickActions = [
  { label: 'Add Doctor', icon: '👨‍⚕️', gradient: 'linear-gradient(135deg, #0F766E, #14B8A6)' },
  { label: 'Assign Shift', icon: '🕐', gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  { label: 'Generate Report', icon: '📊', gradient: 'linear-gradient(135deg, #0F766E, #38BDF8)' },
  { label: 'Export PDF', icon: '📄', gradient: 'linear-gradient(135deg, #DC2626, #F87171)' },
  { label: 'Export Excel', icon: '📗', gradient: 'linear-gradient(135deg, #16A34A, #4ADE80)' },
  { label: 'Announcement', icon: '📢', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)' },
];

// ────────────────────────────────────────────────────────────────
// RENDER: Department Table
// ────────────────────────────────────────────────────────────────
function renderDeptTable(filter = '') {
  const tbody = $('#deptTable tbody');
  if (!tbody) return;
  const filtered = filter
    ? departments.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()))
    : departments;

  tbody.innerHTML = filtered.map(d => `
    <tr>
      <td><strong>${d.name}</strong></td>
      <td>${d.doctors}</td>
      <td>${d.patients}</td>
      <td>${d.wait}</td>
      <td><span class="status-chip ${d.status}"><span class="status-dot ${d.status === 'active' ? 'green' : d.status === 'warning' ? 'yellow' : 'red'}"></span>${d.statusText}</span></td>
      <td class="table-actions">
        <button class="btn btn-sm btn-secondary">View</button>
        <button class="btn btn-sm btn-outline">Assign Staff</button>
        <button class="btn btn-sm btn-outline">Analytics</button>
      </td>
    </tr>
  `).join('');
}
renderDeptTable();

// ────────────────────────────────────────────────────────────────
// RENDER: Doctor Cards & Workload Table
// ────────────────────────────────────────────────────────────────
function renderDoctorCards(filter = '') {
  const container = $('#doctorCardsGrid');
  if (!container) return;

  const filtered = filter
    ? doctors.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()) || d.dept.toLowerCase().includes(filter.toLowerCase()))
    : doctors;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No doctors found matching "${filter}".</div>`;
    return;
  }

  container.innerHTML = filtered.map(d => {
    const burnoutLabel = d.burnout.charAt(0).toUpperCase() + d.burnout.slice(1);
    const statusChip = d.status === 'active' ? 'active' : 'busy';
    const statusDot = d.status === 'active' ? 'green' : 'yellow';
    const statusText = d.status === 'active' ? 'Available' : 'On Call';

    return `
      <div class="doctor-card glass-strong">
        <div class="doctor-card-header">
          <div class="doctor-profile-info">
            <div class="avatar ${d.avatar}">${d.initials}</div>
            <div>
              <h4>${d.name}</h4>
              <p>${d.dept}</p>
            </div>
          </div>
          <span class="status-chip ${statusChip}">
            <span class="status-dot ${statusDot}"></span>
            ${statusText}
          </span>
        </div>

        <div class="doctor-workload-stats">
          <div class="doctor-stat-box">
            <span class="doctor-stat-lbl">Active Patients</span>
            <span class="doctor-stat-val">${d.patients}</span>
          </div>
          <div class="doctor-stat-box">
            <span class="doctor-stat-lbl">Hours Worked</span>
            <span class="doctor-stat-val">${d.hours}</span>
          </div>
        </div>

        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:6px;">
            <span style="color:var(--text-secondary);">Workload Stress</span>
            <span class="burnout-indicator ${d.burnout}">${burnoutLabel}</span>
          </div>
          <div class="burnout-bar" style="width:100%;height:6px;">
            <div class="burnout-bar-fill ${d.burnout}" style="height:100%;"></div>
          </div>
        </div>

        <div class="doctor-card-footer">
          <span class="status-chip info" style="font-size:11px;">Shift: ${d.shift}</span>
          <button class="btn btn-sm btn-outline manage-doc-btn" data-name="${d.name}">Manage Profile</button>
        </div>
      </div>
    `;
  }).join('');
}
renderDoctorCards();

function renderDoctorTable(filter = '') {
  const tbody = $('#doctorTable tbody');
  if (!tbody) return;
  const filtered = filter
    ? doctors.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()) || d.dept.toLowerCase().includes(filter.toLowerCase()))
    : doctors;

  tbody.innerHTML = filtered.map(d => `
    <tr>
      <td>
        <div class="doctor-cell">
          <div class="avatar ${d.avatar}">${d.initials}</div>
          <div>
            <div style="font-weight:600;">${d.name}</div>
          </div>
        </div>
      </td>
      <td>${d.dept}</td>
      <td><strong>${d.patients}</strong></td>
      <td>${d.hours}</td>
      <td><span class="status-chip info">${d.shift}</span></td>
      <td>
        <div class="burnout-indicator ${d.burnout}">
          <div class="burnout-bar"><div class="burnout-bar-fill ${d.burnout}"></div></div>
          ${d.burnout.charAt(0).toUpperCase() + d.burnout.slice(1)}
        </div>
      </td>
      <td><span class="status-chip ${d.status === 'active' ? 'active' : 'busy'}"><span class="status-dot ${d.status === 'active' ? 'green' : 'yellow'}"></span>${d.status === 'active' ? 'Available' : 'Busy'}</span></td>
      <td><button class="btn btn-sm btn-secondary">Manage</button></td>
    </tr>
  `).join('');
}
renderDoctorTable();

// Doctor Section Listeners
$('#doctorSearch')?.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  renderDoctorCards(query);
  renderDoctorTable(query);
});

$('#addDoctorSectionBtn')?.addEventListener('click', () => {
  openModal('#addDoctorModal');
});

// ────────────────────────────────────────────────────────────────
// RENDER: Patient Table
// ────────────────────────────────────────────────────────────────
function renderPatientTable(filter = '') {
  const tbody = $('#patientTable tbody');
  if (!tbody) return;
  const filtered = filter
    ? patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.id.toLowerCase().includes(filter.toLowerCase()))
    : patients;

  tbody.innerHTML = filtered.map(p => {
    const statusClass = p.status === 'Critical' ? 'critical' : p.status === 'Stable' ? 'active' : p.status === 'Recovering' ? 'available' : 'info';
    const statusDot = p.status === 'Critical' ? 'red' : p.status === 'Stable' ? 'green' : p.status === 'Recovering' ? 'green' : 'blue';
    return `
      <tr>
        <td><code style="font-size:12px;background:rgba(15,118,110,0.06);padding:3px 8px;border-radius:6px;">${p.id}</code></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.doctor}</td>
        <td>${p.dept}</td>
        <td><span class="priority-badge ${p.priority}">${p.priority.toUpperCase()}</span></td>
        <td>${p.appt}</td>
        <td>${p.room}</td>
        <td><span class="status-chip ${statusClass}"><span class="status-dot ${statusDot}"></span>${p.status}</span></td>
        <td class="table-actions">
          <button class="btn btn-sm btn-secondary">View</button>
          <button class="btn btn-sm btn-outline">Edit</button>
          <button class="btn btn-sm btn-outline">Record</button>
        </td>
      </tr>
    `;
  }).join('');
}
renderPatientTable();

// Patient search
$('#patientSearch')?.addEventListener('input', (e) => {
  renderPatientTable(e.target.value);
});

// ────────────────────────────────────────────────────────────────
// RENDER: Appointments
// ────────────────────────────────────────────────────────────────
let currentApptFilter = 'today';

function renderAppointments(tabFilter = currentApptFilter) {
  const container = $('#appointmentList');
  if (!container) return;

  currentApptFilter = tabFilter;

  let filtered = appointments;
  if (tabFilter === 'upcoming') {
    filtered = appointments.filter(a => a.status === 'upcoming');
  } else if (tabFilter === 'completed') {
    filtered = appointments.filter(a => a.status === 'completed');
  } else if (tabFilter === 'cancelled') {
    filtered = appointments.filter(a => a.status === 'cancelled');
  } else if (tabFilter === 'today') {
    filtered = appointments.filter(a => a.status !== 'cancelled');
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No ${tabFilter} appointments found.</div>`;
    return;
  }

  container.innerHTML = filtered.map(a => {
    const chipClass = a.status === 'completed' ? 'active' : a.status === 'in-progress' ? 'warning' : a.status === 'cancelled' ? 'danger' : 'info';
    const chipText = a.status === 'completed' ? 'Completed' : a.status === 'in-progress' ? 'In Progress' : a.status === 'cancelled' ? 'Cancelled' : 'Upcoming';
    return `
      <div class="appointment-item">
        <span class="appointment-time">${a.time}</span>
        <span class="appointment-line"></span>
        <div class="appointment-details" style="flex:1;">
          <h4>${a.patient}</h4>
          <p>${a.type} · ${a.doctor}</p>
        </div>
        <span class="status-chip ${chipClass}">${chipText}</span>
      </div>
    `;
  }).join('');
}
renderAppointments();

// Appointment tab slider clicks & live filtering
$$('.appointment-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.appointment-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabText = tab.textContent.trim().toLowerCase();
    const filterKey = tabText.includes('today') ? 'today' : tabText.includes('upcoming') ? 'upcoming' : tabText.includes('completed') ? 'completed' : 'cancelled';
    renderAppointments(filterKey);
  });
});

// ────────────────────────────────────────────────────────────────
// RENDER: Bed Management
// ────────────────────────────────────────────────────────────────
function renderBedCards() {
  const container = $('#bedGrid');
  if (!container) return;
  container.innerHTML = beds.map(b => {
    const available = b.capacity - b.occupied;
    const pct = ((b.occupied / b.capacity) * 100).toFixed(0);
    const fillClass = pct > 85 ? 'danger' : pct > 65 ? 'warning' : 'success';
    return `
      <div class="bed-card glass">
        <div class="bed-card-header">
          <h4>${b.icon} ${b.ward}</h4>
          <span class="status-chip ${pct > 85 ? 'critical' : pct > 65 ? 'warning' : 'active'}">
            <span class="status-dot ${pct > 85 ? 'red' : pct > 65 ? 'yellow' : 'green'}"></span>
            ${pct}%
          </span>
        </div>
        <div class="bed-stats">
          <div class="bed-stat">
            <div class="bed-stat-value">${b.capacity}</div>
            <div class="bed-stat-label">Capacity</div>
          </div>
          <div class="bed-stat">
            <div class="bed-stat-value">${b.occupied}</div>
            <div class="bed-stat-label">Occupied</div>
          </div>
          <div class="bed-stat">
            <div class="bed-stat-value" style="color:var(--success)">${available}</div>
            <div class="bed-stat-label">Available</div>
          </div>
        </div>
        <div class="progress-bar"><div class="progress-bar-fill ${fillClass}" data-width="${pct}"></div></div>
        <div class="bed-card-actions">
          <button class="btn btn-sm btn-primary" style="flex:1;">Allocate</button>
          <button class="btn btn-sm btn-outline">Transfer</button>
          <button class="btn btn-sm btn-outline">Discharge</button>
        </div>
      </div>
    `;
  }).join('');

  // Re-observe new progress bars
  $$('.progress-bar-fill[data-width]').forEach(el => progressObserver.observe(el));
}
renderBedCards();

// ────────────────────────────────────────────────────────────────
// RENDER: Shift Management
// ────────────────────────────────────────────────────────────────
function renderShiftCards() {
  const container = $('#shiftCards');
  if (!container) return;
  container.innerHTML = shifts.map(s => `
    <div class="shift-card glass-strong">
      <div>
        <div class="shift-badge ${s.badge}">${s.name} Shift</div>
        <div style="font-size:11px;color:var(--text-secondary);margin-bottom:12px;font-weight:500;">${s.hours}</div>
      </div>
      <div class="shift-stats">
        <div class="shift-stat-item">
          <div class="value">${s.doctors}</div>
          <div class="label">Doctors</div>
        </div>
        <div class="shift-stat-item">
          <div class="value">${s.nurses}</div>
          <div class="label">Nurses</div>
        </div>
        <div class="shift-stat-item">
          <div class="value">${s.doctors + s.nurses}</div>
          <div class="label">Total Staff</div>
        </div>
        <div class="shift-stat-item">
          <div class="value" style="color:var(--warning);">${s.overtime}</div>
          <div class="label">Overtime</div>
        </div>
      </div>
    </div>
  `).join('');
}
renderShiftCards();

// ────────────────────────────────────────────────────────────────
// RENDER: Inventory
// ────────────────────────────────────────────────────────────────
function renderInventory(filter = '') {
  const container = $('#inventoryList');
  if (!container) return;
  const filtered = filter
    ? inventory.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))
    : inventory;

  container.innerHTML = filtered.map(i => `
    <div class="inventory-item">
      <div class="inventory-info">
        <div class="inventory-icon">${i.icon}</div>
        <div>
          <div class="inventory-name">${i.name}</div>
          <div class="inventory-count">${i.count}</div>
        </div>
      </div>
      <span class="status-chip ${i.status}">
        <span class="status-dot ${i.status === 'active' ? 'green' : i.status === 'warning' ? 'yellow' : 'red'}"></span>
        ${i.statusText}
      </span>
    </div>
  `).join('');
}
renderInventory();

// ────────────────────────────────────────────────────────────────
// RENDER: Activity Feed
// ────────────────────────────────────────────────────────────────
function renderActivityFeed() {
  const container = $('#activityFeed');
  if (!container) return;
  container.innerHTML = activities.map((a, idx) => `
    <div class="activity-item">
      <div class="activity-dot-wrap">
        <div class="activity-dot ${a.dot}"></div>
        ${idx < activities.length - 1 ? '<div class="activity-line-v"></div>' : ''}
      </div>
      <div class="activity-content">
        <h4>${a.text}</h4>
        <p>${a.desc}</p>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}
renderActivityFeed();

// ────────────────────────────────────────────────────────────────
// RENDER: Quick Actions
// ────────────────────────────────────────────────────────────────
function renderQuickActions() {
  const container = $('#quickActionsGrid');
  if (!container) return;
  container.innerHTML = quickActions.map(a => `
    <div class="quick-action-btn" role="button" tabindex="0">
      <div class="quick-action-icon" style="background:${a.gradient};font-size:20px;">${a.icon}</div>
      <span>${a.label}</span>
    </div>
  `).join('');
}
renderQuickActions();

// ────────────────────────────────────────────────────────────────
// CHARTS (Chart.js)
// ────────────────────────────────────────────────────────────────
function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Shared defaults
  Chart.defaults.font.family = "'Inter', 'Poppins', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#64748B';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
  Chart.defaults.plugins.legend.labels.padding = 16;

  const gridColor = 'rgba(15, 118, 110, 0.05)';
  const gridOpts = { color: gridColor, drawBorder: false };

  // ── Line Chart: Patients This Week ──
  const lineCtx = $('#chartLine');
  if (lineCtx) {
    window.lineChartInstance = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Patients',
          data: [145, 178, 162, 210, 195, 230, 198],
          borderColor: '#0F766E',
          backgroundColor: 'rgba(15, 118, 110, 0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#0F766E',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { grid: gridOpts }, y: { grid: gridOpts, beginAtZero: true } },
        plugins: { legend: { display: false } },
        animation: { duration: 1500, easing: 'easeOutQuart' },
      }
    });
  }

  // ── Bar Chart: Department Workload ──
  const barCtx = $('#chartBar');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Cardio', 'Ortho', 'Neuro', 'Pedia', 'ER', 'Onco'],
        datasets: [{
          label: 'Patients',
          data: [78, 94, 56, 45, 34, 42],
          backgroundColor: [
            'rgba(15, 118, 110, 0.75)',
            'rgba(20, 184, 166, 0.75)',
            'rgba(56, 189, 248, 0.75)',
            'rgba(124, 58, 237, 0.75)',
            'rgba(239, 68, 68, 0.75)',
            'rgba(245, 158, 11, 0.75)',
          ],
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { grid: { display: false } }, y: { grid: gridOpts, beginAtZero: true } },
        plugins: { legend: { display: false } },
        animation: { duration: 1500, easing: 'easeOutQuart' },
      }
    });
  }

  // ── Doughnut Chart: Patient Distribution ──
  const doughnutCtx = $('#chartDoughnut');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['In-Patient', 'Out-Patient', 'Emergency', 'ICU', 'Day Care'],
        datasets: [{
          data: [35, 30, 15, 12, 8],
          backgroundColor: ['#0F766E', '#14B8A6', '#38BDF8', '#7C3AED', '#F59E0B'],
          borderWidth: 0,
          spacing: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 12, font: { size: 11 } } },
        },
        animation: { animateRotate: true, duration: 1500 },
      }
    });
  }

  // ── Area Chart: Appointments ──
  const areaCtx = $('#chartArea');
  if (areaCtx) {
    const gradient = areaCtx.getContext('2d').createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.01)');

    const gradient2 = areaCtx.getContext('2d').createLinearGradient(0, 0, 0, 280);
    gradient2.addColorStop(0, 'rgba(15, 118, 110, 0.15)');
    gradient2.addColorStop(1, 'rgba(15, 118, 110, 0.01)');

    window.areaChartInstance = new Chart(areaCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Booked',
            data: [42, 55, 48, 62, 58, 72, 65],
            borderColor: '#38BDF8',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#38BDF8',
          },
          {
            label: 'Completed',
            data: [38, 50, 44, 55, 52, 64, 58],
            borderColor: '#0F766E',
            backgroundColor: gradient2,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#0F766E',
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { grid: gridOpts }, y: { grid: gridOpts, beginAtZero: true } },
        plugins: { legend: { position: 'top' } },
        animation: { duration: 1800, easing: 'easeOutQuart' },
      }
    });
  }

  // ── Donut 2: Bed Occupancy ──
  const donut2Ctx = $('#chartDonut2');
  if (donut2Ctx) {
    new Chart(donut2Ctx, {
      type: 'doughnut',
      data: {
        labels: ['ICU', 'Emergency', 'General', 'Private', 'Pediatrics'],
        datasets: [{
          data: [90, 62.5, 74, 70, 62],
          backgroundColor: ['#EF4444', '#F59E0B', '#0F766E', '#7C3AED', '#38BDF8'],
          borderWidth: 0,
          spacing: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}% occupied`
            }
          }
        },
        animation: { animateRotate: true, duration: 1500 },
      }
    });
  }
}

// Wait for Chart.js
if (typeof Chart !== 'undefined') {
  initCharts();
} else {
  window.addEventListener('load', () => {
    setTimeout(initCharts, 200);
  });
}

// ────────────────────────────────────────────────────────────────
// TOAST NOTIFICATION ENGINE
// ────────────────────────────────────────────────────────────────
function showToast(title, message, type = 'info', duration = 4500) {
  const container = $('#toastContainer');
  if (!container) return;

  const icons = {
    success: '✅',
    warning: '⚠️',
    danger: '🚨',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast-card ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => removeToast(toast));

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(() => removeToast(toast), duration);
  }
}

function removeToast(toast) {
  if (!toast || !toast.parentNode) return;
  toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  setTimeout(() => toast.remove(), 300);
}

// ────────────────────────────────────────────────────────────────
// DETAIL INSPECTOR MODAL HELPER
// ────────────────────────────────────────────────────────────────
function inspectItem(title, detailsMap) {
  const modal = $('#detailInspectorModal');
  const titleEl = $('#inspectorTitle');
  const contentEl = $('#inspectorContent');
  if (!modal || !titleEl || !contentEl) return;

  titleEl.textContent = title;
  contentEl.innerHTML = `
    <div class="detail-inspector-card">
      ${Object.entries(detailsMap).map(([k, v]) => `
        <div class="detail-row">
          <span class="detail-label">${k}</span>
          <span class="detail-value">${v}</span>
        </div>
      `).join('')}
    </div>
  `;
  openModal('#detailInspectorModal');
}

// ────────────────────────────────────────────────────────────────
// NAVBAR & HEADER BUTTON HANDLERS
// ────────────────────────────────────────────────────────────────

// Notifications bell
$('#notifBtn')?.addEventListener('click', () => {
  openModal('#notificationsModal');
});

$('#clearNotifBtn')?.addEventListener('click', () => {
  showToast('Notifications Cleared', 'All pending alerts have been marked as read.', 'info');
  closeModal('#notificationsModal');
});

// Messages icon
$('#msgBtn')?.addEventListener('click', () => {
  openModal('#messagesModal');
});

// Page Header actions
$('#pageHeaderExportBtn')?.addEventListener('click', () => {
  openModal('#reportsModal');
  showToast('Export Center', 'Select a report to download or export full executive package.', 'info');
});

$('#pageHeaderQuickActionBtn')?.addEventListener('click', () => {
  openModal('#quickActionModal');
  populateModalQuickActions();
});


// Inventory Management button & form
$('#manageInventoryBtn')?.addEventListener('click', () => {
  openModal('#inventoryManageModal');
});

$('#inventoryManageForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = $('#invItemSelect').value;
  const newCount = $('#invCountInput').value.trim();
  const newStatus = $('#invStatusSelect').value;

  const item = inventory.find(i => i.name === itemName);
  if (item) {
    item.count = newCount;
    item.status = newStatus;
    item.statusText = newStatus === 'active' ? 'Healthy' : newStatus === 'warning' ? 'Low' : 'Critical';
    renderInventory();
    showToast('Inventory Stock Updated', `${itemName} stock level updated to "${newCount}".`, 'success');
    window.AarogyaAPI?.emit('inventoryUpdated', item);
  }
  closeModal('#inventoryManageModal');
  e.target.reset();
});

// Analytics Timeframe Toggle Buttons (This Week / This Month)
$('#analyticsMonthBtn')?.addEventListener('click', () => {
  const weekBtn = $('#analyticsWeekBtn');
  const monthBtn = $('#analyticsMonthBtn');
  if (weekBtn && monthBtn) {
    weekBtn.classList.remove('btn-secondary');
    weekBtn.classList.add('btn-outline');
    monthBtn.classList.remove('btn-outline');
    monthBtn.classList.add('btn-secondary');
  }

  // Update Line Chart (Patients This Month)
  if (window.lineChartInstance) {
    window.lineChartInstance.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    window.lineChartInstance.data.datasets[0].data = [680, 840, 790, 950];
    window.lineChartInstance.update();
  }

  // Update Area Chart (Appointments This Month)
  if (window.areaChartInstance) {
    window.areaChartInstance.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    window.areaChartInstance.data.datasets[0].data = [240, 310, 280, 340];
    window.areaChartInstance.data.datasets[1].data = [210, 280, 260, 315];
    window.areaChartInstance.update();
  }

  const lineChartTitle = document.querySelector('#chartLine')?.closest('.dashboard-card')?.querySelector('.chart-title');
  const lineChartSub = document.querySelector('#chartLine')?.closest('.dashboard-card')?.querySelector('.chart-subtitle');
  if (lineChartTitle) lineChartTitle.textContent = 'Patients This Month';
  if (lineChartSub) lineChartSub.textContent = 'Monthly patient admissions overview';

  showToast('Analytics Timeframe', 'Displaying operational analytics for This Month.', 'info');
});

$('#analyticsWeekBtn')?.addEventListener('click', () => {
  const weekBtn = $('#analyticsWeekBtn');
  const monthBtn = $('#analyticsMonthBtn');
  if (weekBtn && monthBtn) {
    monthBtn.classList.remove('btn-secondary');
    monthBtn.classList.add('btn-outline');
    weekBtn.classList.remove('btn-outline');
    weekBtn.classList.add('btn-secondary');
  }

  // Revert Line Chart (Patients This Week)
  if (window.lineChartInstance) {
    window.lineChartInstance.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    window.lineChartInstance.data.datasets[0].data = [145, 178, 162, 210, 195, 230, 198];
    window.lineChartInstance.update();
  }

  // Revert Area Chart (Appointments This Week)
  if (window.areaChartInstance) {
    window.areaChartInstance.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    window.areaChartInstance.data.datasets[0].data = [42, 55, 48, 62, 58, 72, 65];
    window.areaChartInstance.data.datasets[1].data = [38, 50, 44, 55, 52, 64, 58];
    window.areaChartInstance.update();
  }

  const lineChartTitle = document.querySelector('#chartLine')?.closest('.dashboard-card')?.querySelector('.chart-title');
  const lineChartSub = document.querySelector('#chartLine')?.closest('.dashboard-card')?.querySelector('.chart-subtitle');
  if (lineChartTitle) lineChartTitle.textContent = 'Patients This Week';
  if (lineChartSub) lineChartSub.textContent = 'Daily patient admissions';

  showToast('Analytics Timeframe', 'Displaying operational analytics for This Week.', 'info');
});

// Admin profile
$('#adminProfile')?.addEventListener('click', () => {
  inspectItem('Dr. Arjun (Administrator)', {
    'Full Name': 'Dr. Arjun Kapoor',
    'Role': 'Chief Hospital Administrator',
    'Email': 'arjun@aarogyahospital.com',
    'Department': 'Hospital Operations',
    'Privileges': 'Full Executive Access',
    'Status': 'Active (Logged in)'
  });
});

// ────────────────────────────────────────────────────────────────
// TOP NAVBAR GLOBAL OMNI-SEARCH ENGINE
// ────────────────────────────────────────────────────────────────
const globalSearchInput = $('#globalSearch');
const globalSearchResultsDropdown = $('#globalSearchResults');

function handleGlobalSearch(query) {
  const q = query.trim().toLowerCase();

  // 1. Live filter on-page sections/tables
  renderPatientTable(q);
  renderDoctorTable(q);
  renderDeptTable(q);
  renderInventory(q);

  if (!globalSearchResultsDropdown) return;

  if (!q) {
    globalSearchResultsDropdown.classList.remove('active');
    globalSearchResultsDropdown.innerHTML = '';
    return;
  }

  // 2. Query hospital data structures for matches
  const matchedPatients = patients.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.dept.toLowerCase().includes(q));
  const matchedDoctors = doctors.filter(d => d.name.toLowerCase().includes(q) || d.dept.toLowerCase().includes(q));
  const matchedDepts = departments.filter(d => d.name.toLowerCase().includes(q));
  const matchedInventory = inventory.filter(i => i.name.toLowerCase().includes(q));
  const matchedActions = quickActions.filter(a => a.label.toLowerCase().includes(q));

  const totalMatches = matchedPatients.length + matchedDoctors.length + matchedDepts.length + matchedInventory.length + matchedActions.length;

  if (totalMatches === 0) {
    globalSearchResultsDropdown.innerHTML = `
      <div style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">
        No hospital records matching "<strong>${query}</strong>"
      </div>
    `;
    globalSearchResultsDropdown.classList.add('active');
    return;
  }

  let html = '';

  // Quick Actions Group
  if (matchedActions.length > 0) {
    html += `
      <div class="search-results-group">
        <div class="search-group-header">⚡ Quick Actions</div>
        ${matchedActions.map(a => `
          <div class="search-result-row" data-type="action" data-label="${a.label}">
            <div class="search-result-info">
              <span class="search-result-title">${a.icon} ${a.label}</span>
              <span class="search-result-sub">Hospital Action Shortcut</span>
            </div>
            <span class="search-result-badge">Execute</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Patients Group
  if (matchedPatients.length > 0) {
    html += `
      <div class="search-results-group">
        <div class="search-group-header">🩺 Patients (${matchedPatients.length})</div>
        ${matchedPatients.slice(0, 4).map(p => `
          <div class="search-result-row" data-type="patient" data-id="${p.id}" data-name="${p.name}">
            <div class="search-result-info">
              <span class="search-result-title">${p.name} <code style="font-size:11px;opacity:0.8;">(${p.id})</code></span>
              <span class="search-result-sub">${p.dept} · Doctor: ${p.doctor}</span>
            </div>
            <span class="search-result-badge">${p.status}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Doctors Group
  if (matchedDoctors.length > 0) {
    html += `
      <div class="search-results-group">
        <div class="search-group-header">👨‍⚕️ Doctors (${matchedDoctors.length})</div>
        ${matchedDoctors.slice(0, 4).map(d => `
          <div class="search-result-row" data-type="doctor" data-name="${d.name}">
            <div class="search-result-info">
              <span class="search-result-title">${d.name}</span>
              <span class="search-result-sub">${d.dept} · Shift: ${d.shift}</span>
            </div>
            <span class="search-result-badge">${d.status === 'active' ? 'Available' : 'Busy'}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Departments Group
  if (matchedDepts.length > 0) {
    html += `
      <div class="search-results-group">
        <div class="search-group-header">🏢 Departments (${matchedDepts.length})</div>
        ${matchedDepts.map(d => `
          <div class="search-result-row" data-type="dept" data-name="${d.name}">
            <div class="search-result-info">
              <span class="search-result-title">${d.name}</span>
              <span class="search-result-sub">${d.doctors} Doctors · ${d.patients} Patients</span>
            </div>
            <span class="search-result-badge">${d.statusText}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Inventory Group
  if (matchedInventory.length > 0) {
    html += `
      <div class="search-results-group">
        <div class="search-group-header">📦 Inventory Supplies (${matchedInventory.length})</div>
        ${matchedInventory.map(i => `
          <div class="search-result-row" data-type="inventory" data-name="${i.name}">
            <div class="search-result-info">
              <span class="search-result-title">${i.icon} ${i.name}</span>
              <span class="search-result-sub">Stock Level: ${i.count}</span>
            </div>
            <span class="search-result-badge">${i.statusText}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  globalSearchResultsDropdown.innerHTML = html;
  globalSearchResultsDropdown.classList.add('active');
}

// Live typing listener
globalSearchInput?.addEventListener('input', (e) => {
  handleGlobalSearch(e.target.value);
});

// Focus listener
globalSearchInput?.addEventListener('focus', (e) => {
  if (e.target.value.trim()) {
    handleGlobalSearch(e.target.value);
  }
});

// Enter key & Escape key press listener
globalSearchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val) {
      showToast('Global Search', `Filtered all hospital records for "${val}".`, 'info');
      handleGlobalSearch(val);
    }
  } else if (e.key === 'Escape') {
    globalSearchResultsDropdown?.classList.remove('active');
    globalSearchInput.blur();
  }
});

// Click search result item delegation
globalSearchResultsDropdown?.addEventListener('click', (e) => {
  const row = e.target.closest('.search-result-row');
  if (!row) return;

  const type = row.dataset.type;
  const typeName = row.dataset.name || row.dataset.id || row.dataset.label;

  globalSearchResultsDropdown.classList.remove('active');

  if (type === 'action') {
    triggerQuickAction(typeName);
  } else if (type === 'patient') {
    const pId = row.dataset.id;
    const p = patients.find(item => item.id === pId);
    if (p) {
      $('#editPatientId').value = p.id;
      $('#editPatientName').value = p.name;
      $('#editPatientDept').value = p.dept;
      $('#editPatientDoctor').value = p.doctor;
      $('#editPatientPriority').value = p.priority;
      $('#editPatientRoom').value = p.room;
      $('#editPatientStatus').value = p.status;
      openModal('#editPatientModal');
    }
  } else if (type === 'doctor') {
    const docName = row.dataset.name;
    const d = doctors.find(item => item.name === docName);
    if (d) {
      $('#editDoctorOriginalName').value = d.name;
      $('#editDoctorName').value = d.name;
      $('#editDoctorDept').value = d.dept;
      $('#editDoctorShift').value = d.shift;
      $('#editDoctorStatus').value = d.status;
      openModal('#editDoctorModal');
    }
  } else if (type === 'dept') {
    const deptEl = document.getElementById('section-departments');
    if (deptEl) deptEl.scrollIntoView({ behavior: 'smooth' });
    showToast('Department Found', `Navigated to ${typeName} Department.`, 'info');
  } else if (type === 'inventory') {
    const invName = row.dataset.name;
    openModal('#inventoryManageModal');
    if ($('#invItemSelect')) $('#invItemSelect').value = invName;
  }
});

// Keyboard shortcut (Cmd+K / Ctrl+K)
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    globalSearchInput?.focus();
    if (globalSearchInput?.value.trim()) {
      handleGlobalSearch(globalSearchInput.value);
    }
  }
});

// Close dropdown on click outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-bar')) {
    globalSearchResultsDropdown?.classList.remove('active');
  }
});

// ────────────────────────────────────────────────────────────────
// MODAL QUICK ACTIONS POPULATION & HANDLERS
// ────────────────────────────────────────────────────────────────
function populateModalQuickActions() {
  const container = $('#modalQuickActionGrid');
  if (!container) return;
  container.innerHTML = quickActions.map(a => `
    <div class="quick-action-btn modal-qa-item" data-action="${a.label}" role="button" tabindex="0">
      <div class="quick-action-icon" style="background:${a.gradient};font-size:20px;">${a.icon}</div>
      <span>${a.label}</span>
    </div>
  `).join('');

  $$('.modal-qa-item').forEach(item => {
    item.addEventListener('click', () => {
      const actionName = item.dataset.action;
      closeModal('#quickActionModal');
      triggerQuickAction(actionName);
    });
  });
}

function triggerQuickAction(label) {
  if (label === 'Add Doctor') {
    openModal('#addDoctorModal');
  } else if (label === 'Assign Shift') {
    openModal('#bedAllocationModal');
  } else if (label === 'Generate Report') {
    openModal('#reportsModal');
  } else if (label === 'Export PDF') {
    showToast('Exporting PDF', 'Generating high-resolution hospital operational PDF...', 'success');
  } else if (label === 'Export Excel') {
    showToast('Exporting Excel', 'Exporting patient & revenue datasets to CSV format...', 'success');
  } else if (label === 'Announcement') {
    const msg = prompt('Enter Broadcast Announcement Message for Hospital Staff:');
    if (msg) showToast('📢 Hospital Broadcast Sent', msg, 'info');
  } else {
    showToast('Quick Action', `Action "${label}" executed.`, 'info');
  }
}

// ────────────────────────────────────────────────────────────────
// FORM SUBMISSIONS & DATA MUTATIONS
// ────────────────────────────────────────────────────────────────


// Add Doctor Form
$('#addDoctorForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#docName').value.trim();
  const dept = $('#docDept').value;
  const shift = $('#docShift').value;
  const status = $('#docStatus').value;

  const newDoctor = {
    name,
    initials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    avatar: 'a' + (Math.floor(Math.random() * 6) + 1),
    dept,
    patients: 0,
    hours: '0h',
    shift,
    burnout: 'low',
    status
  };

  doctors.unshift(newDoctor);
  renderDoctorTable();
  renderDoctorCards();
  closeModal('#addDoctorModal');
  e.target.reset();
  showToast('Doctor Added', `${name} assigned to ${dept} (${shift} shift).`, 'success');

  window.AarogyaAPI?.emit('doctorAdded', newDoctor);
});



// Edit Patient Form Submit
$('#editPatientForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = $('#editPatientId').value;
  const p = patients.find(item => item.id === id);
  if (p) {
    p.name = $('#editPatientName').value.trim();
    p.dept = $('#editPatientDept').value;
    p.doctor = $('#editPatientDoctor').value;
    p.priority = $('#editPatientPriority').value;
    p.room = $('#editPatientRoom').value.trim();
    p.status = $('#editPatientStatus').value;

    renderPatientTable();
    showToast('Patient Updated', `Record for ${p.name} (${p.id}) updated successfully.`, 'success');
    window.AarogyaAPI?.emit('patientUpdated', p);
  }
  closeModal('#editPatientModal');
});

// Edit Doctor Form Submit
$('#editDoctorForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const origName = $('#editDoctorOriginalName').value;
  const d = doctors.find(item => item.name === origName);
  if (d) {
    d.name = $('#editDoctorName').value.trim();
    d.dept = $('#editDoctorDept').value;
    d.shift = $('#editDoctorShift').value;
    d.status = $('#editDoctorStatus').value;

    renderDoctorTable();
    renderDoctorCards();
    showToast('Doctor Profile Updated', `Profile for ${d.name} updated successfully.`, 'success');
    window.AarogyaAPI?.emit('doctorUpdated', d);
  }
  closeModal('#editDoctorModal');
});

// Recent Activity View All Button
$('#viewAllActivityBtn')?.addEventListener('click', () => {
  renderAllActivities();
  openModal('#allActivitiesModal');
});

function renderAllActivities() {
  const container = $('#allActivitiesList');
  if (!container) return;
  container.innerHTML = activities.map((a, idx) => `
    <div class="activity-item">
      <div class="activity-dot-wrap">
        <div class="activity-dot ${a.dot}"></div>
        ${idx < activities.length - 1 ? '<div class="activity-line-v"></div>' : ''}
      </div>
      <div class="activity-content">
        <h4>${a.text}</h4>
        <p>${a.desc}</p>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

// ────────────────────────────────────────────────────────────────
// TABLE & CARD BUTTON DELEGATION HANDLERS
// ────────────────────────────────────────────────────────────────
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button, .btn, .quick-action-btn');
  if (!btn) return;

  // Handle Quick Action Grid clicks
  const qa = btn.closest('#quickActionsGrid .quick-action-btn');
  if (qa) {
    const label = qa.querySelector('span')?.textContent || 'Action';
    triggerQuickAction(label);
    return;
  }

  const text = btn.textContent.trim();

  // Doctor Card Manage Button Actions
  const manageCardBtn = btn.closest('.manage-doc-btn');
  if (manageCardBtn) {
    const docName = manageCardBtn.dataset.name;
    const d = doctors.find(item => item.name === docName);
    if (d) {
      $('#editDoctorOriginalName').value = d.name;
      $('#editDoctorName').value = d.name;
      $('#editDoctorDept').value = d.dept;
      $('#editDoctorShift').value = d.shift;
      $('#editDoctorStatus').value = d.status;
      openModal('#editDoctorModal');
    }
    return;
  }

  // Department Table Actions
  if (btn.closest('#deptTable')) {
    const tr = btn.closest('tr');
    const deptName = tr ? tr.children[0].textContent.trim() : 'Department';
    if (text === 'View') {
      inspectItem(`${deptName} Department`, {
        'Active Doctors': tr.children[1].textContent,
        'Current Patients': tr.children[2].textContent,
        'Avg Wait Time': tr.children[3].textContent,
        'Operational Status': tr.children[4].textContent.trim()
      });
    } else if (text === 'Assign Staff') {
      openModal('#addDoctorModal');
      $('#docDept').value = deptName.split(' ')[0];
    } else if (text === 'Analytics') {
      const analyticsEl = document.getElementById('section-analytics');
      if (analyticsEl) {
        analyticsEl.scrollIntoView({ behavior: 'smooth' });
        showToast('Analytics Navigated', `Viewing workload analytics for ${deptName}.`, 'info');
      }
    }
    return;
  }

  // Doctor Table Actions
  if (btn.closest('#doctorTable')) {
    const tr = btn.closest('tr');
    if (tr && text === 'Manage') {
      const docName = tr.querySelector('.doctor-cell div div')?.textContent.trim() || 'Doctor';
      const d = doctors.find(item => item.name === docName);
      if (d) {
        $('#editDoctorOriginalName').value = d.name;
        $('#editDoctorName').value = d.name;
        $('#editDoctorDept').value = d.dept;
        $('#editDoctorShift').value = d.shift;
        $('#editDoctorStatus').value = d.status;
        openModal('#editDoctorModal');
      } else {
        inspectItem(`Doctor Profile — ${docName}`, {
          'Department': tr.children[1].textContent,
          'Active Patients': tr.children[2].textContent,
          'Hours Worked': tr.children[3].textContent,
          'Shift': tr.children[4].textContent.trim(),
          'Burnout Status': tr.children[5].textContent.trim(),
          'Availability': tr.children[6].textContent.trim()
        });
      }
    }
    return;
  }

  // Patient Table Actions
  if (btn.closest('#patientTable')) {
    const tr = btn.closest('tr');
    if (tr) {
      const pId = tr.children[0].textContent.trim();
      const pName = tr.children[1].textContent.trim();
      const p = patients.find(item => item.id === pId);

      if (text === 'Edit' && p) {
        $('#editPatientId').value = p.id;
        $('#editPatientName').value = p.name;
        $('#editPatientDept').value = p.dept;
        $('#editPatientDoctor').value = p.doctor;
        $('#editPatientPriority').value = p.priority;
        $('#editPatientRoom').value = p.room;
        $('#editPatientStatus').value = p.status;
        openModal('#editPatientModal');
      } else if (text === 'View' || text === 'Edit') {
        inspectItem(`Patient Record — ${pName} (${pId})`, {
          'Patient ID': pId,
          'Full Name': pName,
          'Attending Doctor': tr.children[2].textContent,
          'Department': tr.children[3].textContent,
          'Priority': tr.children[4].textContent.trim(),
          'Appointment Time': tr.children[5].textContent,
          'Room / Bed': tr.children[6].textContent,
          'Health Status': tr.children[7].textContent.trim()
        });
      } else if (text === 'Record') {
        showToast('Medical Records', `Opening EMR EHR chart records for ${pName} (${pId}).`, 'info');
      }
    }
    return;
  }

  // Bed Card Actions
  if (btn.closest('.bed-card')) {
    const card = btn.closest('.bed-card');
    const wardTitle = card.querySelector('h4')?.textContent.trim() || 'Ward';
    const wardName = wardTitle.replace(/[^a-zA-Z\s]/g, '').trim();

    if (text === 'Allocate') {
      openModal('#bedAllocationModal');
      $('#bedWardSelect').value = wardName;
      $('#bedActionType').value = 'allocate';
    } else if (text === 'Transfer') {
      openModal('#bedAllocationModal');
      $('#bedWardSelect').value = wardName;
      $('#bedActionType').value = 'transfer';
    } else if (text === 'Discharge') {
      if (confirm(`Confirm patient discharge from ${wardName}?`)) {
        const bed = beds.find(b => b.ward.toLowerCase().includes(wardName.toLowerCase()));
        if (bed && bed.occupied > 0) {
          bed.occupied--;
          renderBedCards();
          showToast('Patient Discharged', `Patient discharged from ${wardName}. Freed 1 bed.`, 'success');
        }
      }
    }
    return;
  }
});

// ────────────────────────────────────────────────────────────────
// INTEGRATION API BRIDGE (window.AarogyaAPI)
// ────────────────────────────────────────────────────────────────
const apiListeners = {};

window.AarogyaAPI = {
  showToast,
  inspectItem,
  openModal,
  closeModal,
  registerPatient: (patientData) => {
    patients.unshift(patientData);
    renderPatientTable();
    showToast('Patient Registered', `${patientData.name} registered via API.`, 'success');
    window.AarogyaAPI.emit('patientRegistered', patientData);
  },
  addDoctor: (doctorData) => {
    doctors.unshift(doctorData);
    renderDoctorTable();
    showToast('Doctor Added', `${doctorData.name} added via API.`, 'success');
    window.AarogyaAPI.emit('doctorAdded', doctorData);
  },
  bookAppointment: (apptData) => {
    appointments.unshift(apptData);
    renderAppointments();
    showToast('Appointment Booked', `Appointment for ${apptData.patient} booked via API.`, 'success');
    window.AarogyaAPI.emit('appointmentBooked', apptData);
  },
  allocateBed: (wardName, action = 'allocate') => {
    const bed = beds.find(b => b.ward.toLowerCase() === wardName.toLowerCase());
    if (bed) {
      if (action === 'allocate' && bed.occupied < bed.capacity) bed.occupied++;
      else if (action === 'discharge' && bed.occupied > 0) bed.occupied--;
      renderBedCards();
      showToast('Bed Status Updated', `${bed.ward} occupied: ${bed.occupied}/${bed.capacity}`, 'info');
      window.AarogyaAPI.emit('bedUpdated', bed);
    }
  },
  exportReport: (reportName) => {
    showToast('Report Exported', `${reportName} generated via API integration.`, 'success');
    window.AarogyaAPI.emit('reportExported', { reportName, timestamp: new Date() });
  },
  getState: () => ({ departments, doctors, patients, appointments, beds, shifts, inventory, activities }),
  on: (event, fn) => {
    if (!apiListeners[event]) apiListeners[event] = [];
    apiListeners[event].push(fn);
  },
  emit: (event, data) => {
    if (apiListeners[event]) apiListeners[event].forEach(fn => fn(data));
  }
};

// ────────────────────────────────────────────────────────────────
// RE-OBSERVE DYNAMICALLY ADDED ELEMENTS
// ────────────────────────────────────────────────────────────────
setTimeout(() => {
  $$('.animate-in:not(.visible)').forEach(el => animateObserver.observe(el));
}, 100);

console.log('%c Aarogya Dashboard v1.0 ', 'background: linear-gradient(135deg, #0F766E, #38BDF8); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;');
console.log('%c AI Powered Hospital Intelligence Platform Ready ', 'color: #14B8A6; font-size: 12px; font-weight: 600;');

