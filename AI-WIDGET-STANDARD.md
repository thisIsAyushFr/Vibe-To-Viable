# CareSync AI Widget - Standardized Component

## Overview
The CareSync AI Widget is a **pixel-perfect identical** floating AI assistant component that appears consistently across all dashboards in the CareSync platform. This document serves as the single source of truth for the AI widget implementation.

## Architecture

### Shared Files (Source of Truth)
- **`shared-ai.css`** - Complete styling for the AI widget (responsive, animations, shadows, typography)
- **`shared-ai.js`** - Core functionality (FAB toggle, message handling, event listeners, public API)
- **`shared-ai.html`** - HTML markup template (standardized structure)
- **`src/components/AIWidget.jsx`** - React component wrapper (dynamically loads shared assets)

### Integration Points

#### 1. React Dashboards (Doctor, Nurse, Patient, Index)
```jsx
import AIWidget from './components/AIWidget';

// In return statement:
<AIWidget />
```

**Dashboards using React:**
- Doctor Dashboard (`src/DoctorDashboard.jsx`)
- Nurse Dashboard (`src/components/NurseDashboard.jsx`)
- Patient Dashboard (`src/PatientDashboard.jsx`) - Uses embedded HTML template
- Hospital Landing (`src/components/HospitalLanding.jsx`)

#### 2. HTML Dashboards (Admin)
```html
<!-- In HTML head -->
<link rel="stylesheet" href="shared-ai.css" />

<!-- In HTML body, before closing </body> -->
<button class="ai-fab" id="aiFab" aria-label="Open CareSync AI Assistant">
  <!-- SVG content from shared-ai.html -->
</button>

<!-- AI Chat Panel -->
<div class="ai-panel" id="aiPanel">
  <!-- Panel content from shared-ai.html -->
</div>

<!-- In HTML body, before closing </body> -->
<script src="shared-ai.js"></script>
```

**Dashboards using HTML:**
- Admin Dashboard (`admin.html`)

---

## Visual Specification

### Dimensions
- **FAB Button (Floating Action Button)**
  - Width/Height: 64px (56px mobile)
  - Border Radius: 50% (circle)
  - Position: Fixed, bottom-right (28px from bottom, 32px from right)
  - Mobile: 20px from bottom, 20px from right

- **AI Panel (Chat Container)**
  - Width: 320px (280px mobile)
  - Border Radius: 20px
  - Position: Fixed, above FAB (104px from bottom, 32px from right)
  - Max Chat Height: 130px
  - Input Row Height: Auto

### Colors & Styling
```css
Primary Color: #0F766E (Teal)
Primary Dark: #0D6560
Text Primary: #17263B (Deep Navy)
Text Secondary: #5E7186 (Slate)
Background: #F4F7FB (Light Blue)
Success/Pulse: #43A96B (Green)
Border: #E2E8F0 (Light Gray)

Glass Effect:
  Background: rgba(255, 255, 255, 0.95)
  Backdrop Filter: blur(20px)
  Border: 1px solid rgba(255, 255, 255, 0.45)
  Shadow: 0 8px 32px rgba(0, 0, 0, 0.15)
```

### Typography
```css
Panel Title: 13.5px, weight 700, letter-spacing -0.01em
Panel Subtitle: 11.5px, weight 500, color #5E7186
Chat Messages: 12px, weight 500
Input Placeholder: 12.5px, color #94A3B8, weight 500
```

### Animations
```css
FAB Hover: scale(1.1), shadow increase
FAB Active: scale(0.95)
Panel Open: opacity 0→1, scale 0.96→1, transform translateY(10px)→0
Panel Close: Reverse of open
Input Focus: border-color change + box-shadow
Send Button Hover: transform translateY(-2px), shadow increase
Dot Pulse: Continuous opacity animation 2s loop
```

### Shadows & Spacing
```css
FAB Shadow: 0 6px 16px rgba(15, 118, 110, 0.25) [0 8px 24px on hover]
Panel Shadow: 0 8px 32px rgba(0, 0, 0, 0.15)
Input Focus Shadow: 0 0 0 3px rgba(20, 184, 166, 0.18)
Send Button Shadow: 0 2px 8px rgba(15, 118, 110, 0.2) [0 4px 12px on hover]

Panel Padding: 18px 18px 14px
Input Row Padding: 12px 18px (bottom adjusted)
Gap Between Elements: 8-12px
```

---

## Functional Specification

### Core Features
1. **FAB Toggle** - Click to open/close AI panel
2. **Message Input** - Text input with placeholder "Ask CareSync AI..."
3. **Send Message** - Arrow icon button, send on click or Enter key
4. **Chat History** - Scrollable log of messages
5. **Auto-scroll** - Chat log scrolls to bottom on new messages
6. **Click Outside** - Panel closes when clicking outside
7. **Focus Management** - Input focuses when panel opens

### Public API (via `window.CareSync.AI`)
```javascript
window.CareSync.AI.openPanel()      // Open AI panel
window.CareSync.AI.closePanel()     // Close AI panel
window.CareSync.AI.togglePanel()    // Toggle state
window.CareSync.AI.sendMessage()    // Send current input
window.CareSync.AI.addMessage(text) // Add message to log
window.CareSync.AI.clearChat()      // Clear all messages
```

### Keyboard Support
- **Enter**: Send message (when focused in input)
- **Shift+Enter**: Multi-line input (not blocking)
- **Escape**: Close panel (optional enhancement)

### Accessibility
- ARIA labels on FAB and close button
- Semantic HTML structure
- Color contrast compliant (WCAG AA)
- Keyboard navigable
- Screen reader friendly

---

## Implementation Checklist

### For New Dashboards
- [ ] Import AIWidget (React) or include HTML (non-React)
- [ ] Link shared-ai.css
- [ ] Load shared-ai.js
- [ ] Verify FAB appears bottom-right
- [ ] Test FAB click toggles panel
- [ ] Test input and send functionality
- [ ] Verify mobile responsive layout
- [ ] Confirm no visual differences from reference

### For Updates to AI Widget
1. Update shared files first:
   - Modify `shared-ai.css` for styling changes
   - Modify `shared-ai.js` for functionality changes
   - Modify `shared-ai.html` for markup changes
   
2. Changes propagate automatically to:
   - React components via AIWidget.jsx
   - HTML pages via stylesheet/script includes
   - Patient Dashboard (via embedded template - manual sync needed)

3. **Do NOT** make dashboard-specific overrides - maintain single source of truth

---

## Consistency Verification

### Visual Consistency Checklist
- [ ] FAB size: 64px × 64px (desktop), 56px × 56px (mobile)
- [ ] FAB position: 28px bottom, 32px right (desktop)
- [ ] Panel width: 320px (desktop), 280px (mobile)
- [ ] Panel border-radius: 20px
- [ ] Chat area max-height: 130px
- [ ] Input placeholder: "Ask CareSync AI..."
- [ ] Colors match specification exactly
- [ ] Shadows and gloss effect identical
- [ ] Font sizes and weights match
- [ ] Animation timings consistent (0.22s default)

### Functional Consistency Checklist
- [ ] FAB click toggles panel
- [ ] Input accepts text
- [ ] Send button sends message (click and Enter)
- [ ] Chat log scrolls to bottom
- [ ] Click outside closes panel
- [ ] Input focuses when panel opens
- [ ] Mobile layout responsive
- [ ] No console errors
- [ ] Smooth animations play
- [ ] All ARIA labels present

---

## Troubleshooting

### FAB Not Appearing
- Check `shared-ai.css` is loaded
- Verify z-index: 50 isn't being overridden
- Check browser console for CSS errors

### Styles Not Applied
- Ensure `shared-ai.css` link precedes component render
- Check for conflicting global CSS
- Verify CSS file path is correct

### JavaScript Not Working
- Ensure `shared-ai.js` is loaded (non-React)
- Check browser console for JS errors
- Verify DOM IDs match (aiFab, aiPanel, etc.)

### React Component Issues
- Verify AIWidget is imported correctly
- Check that shared-ai.css and shared-ai.js load dynamically
- Ensure React component is placed at root level of page

### Mobile Not Responsive
- Verify media queries in shared-ai.css
- Check viewport meta tag is set
- Test on actual mobile device or DevTools mobile view

---

## Version History

### Version 1.0 - Initial Release
- Created shared-ai.css, shared-ai.js, shared-ai.html
- Implemented AIWidget.jsx React wrapper
- Integrated into 5 dashboards (Doctor, Nurse, Patient, Index, Admin)
- Established this specification document

---

## Future Enhancements (Roadmap)
- [ ] Real API integration for AI responses
- [ ] Message persistence (localStorage)
- [ ] Typing indicators
- [ ] Message reactions/emojis
- [ ] Dark mode support
- [ ] Customizable themes per dashboard
- [ ] RTL language support
- [ ] Voice input (speech-to-text)
- [ ] Voice output (text-to-speech)

---

## Support & Contact
For questions about the AI widget standard or to propose enhancements:
- Refer to this specification as the source of truth
- Maintain consistency across all implementations
- Update this document for any approved changes
