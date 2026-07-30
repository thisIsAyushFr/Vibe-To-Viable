import { useEffect } from 'react';

/**
 * CareSync AI Widget Component
 * Reusable across all React dashboards (Doctor, Nurse, Patient)
 * Uses shared-ai.css and shared-ai.js for consistent styling and functionality
 */
export default function AIWidget() {
  useEffect(() => {
    // Load shared CSS if not already loaded
    const existingLink = document.querySelector('link[href*="shared-ai.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/shared-ai.css';
      document.head.appendChild(link);
    }

    // Load shared JS if not already loaded
    const existingScript = document.querySelector('script[src*="shared-ai.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '/shared-ai.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* AI FAB Button */}
      <button
        className="ai-fab"
        id="aiFab"
        aria-label="Open CareSync AI Assistant"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 1 3 3v3a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
          <path d="M19 11a7 7 0 0 1-14 0M12 18v4M8 22h8" />
        </svg>
      </button>

      {/* AI Chat Panel */}
      <div className="ai-panel" id="aiPanel">
        <div className="ai-panel-inner">
          {/* Panel Header */}
          <div className="ai-panel-head">
            <span className="dot"></span>
            <div className="ai-panel-title">CareSync AI</div>
            <button
              className="ai-panel-close"
              aria-label="Close AI Assistant"
            >
              &times;
            </button>
          </div>

          {/* Panel Subtitle */}
          <div className="ai-panel-sub">How can I help you today?</div>

          {/* Chat Log */}
          <div className="ai-chat-log"></div>

          {/* Chat Input Row */}
          <div className="ai-chat-input-row">
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask CareSync AI..."
              aria-label="Chat message input"
            />
            <button
              className="ai-chat-send"
              aria-label="Send message"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 2 11 13 22 2"></polyline>
                <path d="M22 2L11 13m11-11v8.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 12.5V3.5A1.5 1.5 0 0 1 5.5 2H14"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
