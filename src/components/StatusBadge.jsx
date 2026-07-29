import React from 'react';

export default function StatusBadge({ status }) {
  const map = {
    waiting: { label: "WAITING", bg: "rgba(245,158,11,0.15)", fg: "#D97706", border: "rgba(245,158,11,0.3)" },
    "checked-in": { label: "CHECKED IN", bg: "rgba(56,189,248,0.15)", fg: "#0284C7", border: "rgba(56,189,248,0.3)" },
    scheduled: { label: "SCHEDULED", bg: "rgba(100,116,139,0.15)", fg: "#64748B", border: "rgba(100,116,139,0.25)" },
    completed: { label: "COMPLETED", bg: "rgba(34,197,94,0.15)", fg: "#16A34A", border: "rgba(34,197,94,0.3)" },
    "in-consultation": { label: "IN CONSULTATION", bg: "rgba(15,118,110,0.15)", fg: "#0F766E", border: "rgba(15,118,110,0.3)" },
  };

  const s = map[status] || map.scheduled;

  return (
    <span
      className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap inline-flex items-center gap-1 border transition-all duration-200"
      style={{ background: s.bg, color: s.fg, borderColor: s.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.fg }} />
      {s.label}
    </span>
  );
}
