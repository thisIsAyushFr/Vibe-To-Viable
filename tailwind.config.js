/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./DoctorDashboard.jsx"
  ],
  theme: {
    extend: {
      colors: {
        tealPrimary: "#0F766E",
        tealDark: "#0B5C56",
        cyanSecondary: "#14B8A6",
        skyAccent: "#38BDF8",
        auroraBg: "#F0FDFA",
        navyText: "#0F172A",
        slateMuted: "#64748B",
        emeraldSuccess: "#22C55E",
        amberWarning: "#F59E0B",
        roseDanger: "#EF4444",
      },
    },
  },
  plugins: [],
}
