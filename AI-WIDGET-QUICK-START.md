# CareSync AI Widget - Quick Start Guide

## 🚀 Add AI Widget to Your Dashboard

### For React Dashboards (Fastest Way)

#### 1. Import the Component
```jsx
import AIWidget from './components/AIWidget';
```

#### 2. Add to Your JSX (anywhere in return)
```jsx
return (
  <div>
    {/* Your dashboard content */}
    <AIWidget />
  </div>
);
```

#### 3. Done! ✅
The AI widget will appear in the bottom-right corner with:
- Floating action button (FAB)
- Chat panel with input
- Auto-loaded shared CSS and JS
- Full functionality (toggle, send, etc.)

**That's it!** No additional setup needed.

---

### For HTML Dashboards

#### 1. Link the Shared CSS
In your `<head>`:
```html
<link rel="stylesheet" href="shared-ai.css" />
```

#### 2. Add the HTML Markup
Before closing `</body>`:
```html
<!-- AI FAB Button -->
<button class="ai-fab" id="aiFab" aria-label="Open CareSync AI Assistant">
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2a3 3 0 0 1 3 3v3a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
    <path d="M19 11a7 7 0 0 1-14 0M12 18v4M8 22h8"/>
  </svg>
</button>

<!-- AI Chat Panel -->
<div class="ai-panel" id="aiPanel">
  <div class="ai-panel-inner">
    <div class="ai-panel-head">
      <span class="dot"></span>
      <div class="ai-panel-title">CareSync AI</div>
      <button class="ai-panel-close" aria-label="Close AI Assistant">&times;</button>
    </div>
    <div class="ai-panel-sub">How can I help you today?</div>
    <div class="ai-chat-log"></div>
    <div class="ai-chat-input-row">
      <input type="text" class="ai-chat-input" placeholder="Ask CareSync AI..." aria-label="Chat message input">
      <button class="ai-chat-send" aria-label="Send message" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="22 2 11 13 22 2"></polyline>
          <path d="M22 2L11 13m11-11v8.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 12.5V3.5A1.5 1.5 0 0 1 5.5 2H14"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

#### 3. Load the Shared JavaScript
Before closing `</body>`:
```html
<script src="shared-ai.js"></script>
```

#### 4. Done! ✅
The AI widget will automatically initialize and be fully functional.

---

## 📋 File Reference

### Shared Components (Single Source of Truth)
| File | Purpose | Size |
|------|---------|------|
| `shared-ai.css` | Complete styling | ~200 lines |
| `shared-ai.js` | Core functionality | ~150 lines |
| `shared-ai.html` | Markup reference | ~30 lines |

### React Component
| File | Purpose |
|------|---------|
| `src/components/AIWidget.jsx` | React wrapper - handles CSS/JS loading |

### Documentation
| File | Purpose |
|------|---------|
| `AI-WIDGET-STANDARD.md` | Complete specification (visual + functional) |
| `STANDARDIZATION-SUMMARY.md` | What was done and why |
| `AI-WIDGET-QUICK-START.md` | This file - quick reference |

---

## 🎨 Visual Specifications

### FAB Button
- **Size**: 64px × 64px (56px mobile)
- **Shape**: Circle (border-radius: 50%)
- **Position**: 28px from bottom, 32px from right
- **Color**: Teal gradient (#0F766E to #0D6560)
- **Icon**: Microphone SVG (white, stroke-width 2)
- **Shadow**: 0 6px 16px rgba(15, 118, 110, 0.25)
- **Hover**: Scale 1.1, shadow increase

### Chat Panel
- **Width**: 320px (280px mobile)
- **Max Height**: Auto (chat log max 130px)
- **Border Radius**: 20px
- **Background**: rgba(255, 255, 255, 0.95)
- **Backdrop**: blur(20px)
- **Border**: 1px solid rgba(255, 255, 255, 0.45)
- **Shadow**: 0 8px 32px rgba(0, 0, 0, 0.15)

### Input Field
- **Placeholder**: "Ask CareSync AI..."
- **Background**: #F4F7FB
- **Border Radius**: 12px
- **Padding**: 10px 13px
- **Font Size**: 12.5px
- **Focus Shadow**: 0 0 0 3px rgba(20, 184, 166, 0.18)

### Send Button
- **Size**: 36px × 36px
- **Border Radius**: 10px
- **Background**: Teal gradient
- **Icon**: Arrow-right SVG (white)
- **Hover**: Scale up, shadow increase
- **Active**: Scale down

---

## ⚙️ Functionality

### User Actions
| Action | Result |
|--------|--------|
| Click FAB | Toggle panel open/close |
| Type in input | Input accepts text |
| Click send button | Send message |
| Press Enter | Send message |
| Click outside panel | Close panel |
| Panel opens | Input auto-focuses |

### JavaScript API
```javascript
// Access via window.CareSync.AI
window.CareSync.AI.openPanel()      // Open the panel
window.CareSync.AI.closePanel()     // Close the panel
window.CareSync.AI.togglePanel()    // Toggle open/close
window.CareSync.AI.sendMessage()    // Send current input
window.CareSync.AI.addMessage(text) // Add message to log
window.CareSync.AI.clearChat()      // Clear all messages
```

### Example: Programmatic Control
```javascript
// Open panel from another component
window.CareSync.AI.openPanel();

// Add a system message
window.CareSync.AI.addMessage('Welcome to CareSync AI');

// Clear chat and close
window.CareSync.AI.clearChat();
window.CareSync.AI.closePanel();
```

---

## 🔍 Current Implementation Status

### React Dashboards ✅
- [x] Doctor Dashboard
- [x] Nurse Dashboard
- [x] Patient Dashboard (reference)
- [x] Hospital Landing (Index)

### HTML Dashboards ✅
- [x] Admin Dashboard

### Result
**All 5 dashboards have identical AI widgets** - pixel-perfect consistency across the platform.

---

## ❓ Common Questions

### Q: Do I need to customize the AI widget for my dashboard?
**A:** No. The widget is standardized and identical across all dashboards. The styling, colors, and behavior are fixed to maintain consistency.

### Q: What if I need to change the button position?
**A:** Don't. The position is part of the standard. If positioning needs to change globally, it should be updated in `shared-ai.css` and applied to all dashboards simultaneously.

### Q: Can I override the styling?
**A:** Avoid it. Overrides break consistency. If styling needs to change, update `shared-ai.css` and it propagates to all dashboards.

### Q: How do I integrate with a real AI backend?
**A:** The `sendMessage()` function in `shared-ai.js` currently shows a placeholder response. Replace the placeholder with an actual API call:
```javascript
// In shared-ai.js, replace the setTimeout block with:
fetch('/api/ai/chat', {
  method: 'POST',
  body: JSON.stringify({ message })
})
.then(res => res.json())
.then(data => {
  const aiMsgEl = document.createElement('div');
  aiMsgEl.className = 'ai-chat-msg';
  aiMsgEl.textContent = data.response;
  aiChatLog.appendChild(aiMsgEl);
  aiChatLog.scrollTop = aiChatLog.scrollHeight;
});
```

### Q: How do I add features like typing indicators?
**A:** Update `shared-ai.js` with the new functionality. The change will automatically apply to all dashboards.

### Q: Can I have different AI widgets on different pages?
**A:** No. The entire point of this standardization is consistency. All dashboards have identical widgets. If you need different behavior, create separate functionality (not UI) in your backend.

---

## 🛠️ Troubleshooting

### FAB not visible
```
✓ Check shared-ai.css is loaded
✓ Verify no CSS conflicts (z-index, display: none, etc.)
✓ Check browser console for CSS errors
✓ Ensure DOM IDs match (aiFab, aiPanel)
```

### Send button not working
```
✓ Check shared-ai.js is loaded
✓ Verify DOM elements exist (ai-chat-input, ai-chat-send)
✓ Check browser console for JS errors
✓ Try opening DevTools and running: window.CareSync.AI.sendMessage()
```

### Panel doesn't appear when FAB clicked
```
✓ Verify shared-ai.js loaded successfully
✓ Check aiPanel.classList has 'open' class when clicking
✓ Verify CSS has .ai-panel.open { opacity: 1; }
✓ Check for JavaScript errors in console
```

### Styling different from other dashboards
```
✓ Confirm shared-ai.css is loaded
✓ Check for conflicting global CSS
✓ Compare with reference dashboard
✓ Use browser DevTools to inspect element styles
✓ Check for !important overrides
```

### React component not rendering
```
✓ Verify AIWidget is imported
✓ Check React console for errors
✓ Ensure shared-ai.css and shared-ai.js load dynamically
✓ Check network tab to see if files loaded
```

---

## 📖 For More Details

- **Complete Specification**: See `AI-WIDGET-STANDARD.md`
- **Implementation Details**: See `STANDARDIZATION-SUMMARY.md`
- **Current Status**: All 5 dashboards fully integrated ✅

---

## ✨ Summary

The CareSync AI Widget is a **reusable, standardized component** that provides:

✅ Pixel-perfect identical appearance across all dashboards  
✅ Consistent functionality (toggle, send, scroll, etc.)  
✅ Responsive design (desktop & mobile)  
✅ Accessibility compliance  
✅ Easy integration (React or HTML)  
✅ Single source of truth (shared files)  
✅ Future-proof public API  

**Get started**: Import `AIWidget` or link the shared CSS/JS and you're done!
