/**
 * CareSync AI Widget - Shared Component
 * Standardized across all dashboards (Index, Admin, Doctor, Nurse, Patient)
 * Provides AI chat FAB button and panel functionality
 */

(function initializeAIWidget() {
  // DOM Elements
  const aiFab = document.getElementById('aiFab');
  const aiPanel = document.getElementById('aiPanel');
  const aiPanelClose = document.querySelector('.ai-panel-close');
  const aiChatSend = document.querySelector('.ai-chat-send');
  const aiChatInput = document.querySelector('.ai-chat-input');
  const aiChatLog = document.querySelector('.ai-chat-log');

  // Guard: Exit if essential elements don't exist
  if (!aiFab || !aiPanel || !aiChatSend || !aiChatInput || !aiChatLog) {
    console.warn('CareSync AI Widget: Required elements not found');
    return;
  }

  /**
   * Toggle AI Panel Open/Close
   */
  function toggleAIPanel() {
    aiPanel.classList.toggle('open');
  }

  /**
   * Close AI Panel
   */
  function closeAIPanel() {
    aiPanel.classList.remove('open');
  }

  /**
   * Send AI Message
   */
  function sendAIMessage() {
    const message = aiChatInput.value.trim();

    // Guard: Empty message
    if (!message) return;

    // Add user message to chat log
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'ai-chat-msg';
    userMsgEl.textContent = message;
    aiChatLog.appendChild(userMsgEl);

    // Clear input
    aiChatInput.value = '';

    // Auto-scroll to bottom
    aiChatLog.scrollTop = aiChatLog.scrollHeight;

    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const aiMsgEl = document.createElement('div');
      aiMsgEl.className = 'ai-chat-msg';
      aiMsgEl.textContent = 'CareSync AI is processing your request...';
      aiChatLog.appendChild(aiMsgEl);
      aiChatLog.scrollTop = aiChatLog.scrollHeight;
    }, 500);

    // TODO: Replace with actual API call to AI backend
    // sendMessageToAI(message).then(response => {
    //   const aiMsgEl = document.createElement('div');
    //   aiMsgEl.className = 'ai-chat-msg';
    //   aiMsgEl.textContent = response;
    //   aiChatLog.appendChild(aiMsgEl);
    //   aiChatLog.scrollTop = aiChatLog.scrollHeight;
    // });
  }

  /**
   * Event Listeners
   */

  // FAB click: Toggle panel
  aiFab.addEventListener('click', toggleAIPanel);

  // Close button: Close panel
  if (aiPanelClose) {
    aiPanelClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAIPanel();
    });
  }

  // Send button: Send message
  aiChatSend.addEventListener('click', sendAIMessage);

  // Input: Send on Enter key
  aiChatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAIMessage();
    }
  });

  // Click outside panel: Close (optional - improves UX)
  document.addEventListener('click', (e) => {
    const isClickInsidePanel = aiPanel.contains(e.target);
    const isClickOnFab = aiFab.contains(e.target);

    if (!isClickInsidePanel && !isClickOnFab && aiPanel.classList.contains('open')) {
      closeAIPanel();
    }
  });

  // Focus on input when panel opens
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (aiPanel.classList.contains('open')) {
          setTimeout(() => aiChatInput.focus(), 100);
        }
      }
    });
  });

  observer.observe(aiPanel, { attributes: true });

  // Expose AI functions to window for external use
  window.CareSync = window.CareSync || {};
  window.CareSync.AI = {
    openPanel: () => aiPanel.classList.add('open'),
    closePanel: closeAIPanel,
    togglePanel: toggleAIPanel,
    sendMessage: sendAIMessage,
    addMessage: (text) => {
      const msgEl = document.createElement('div');
      msgEl.className = 'ai-chat-msg';
      msgEl.textContent = text;
      aiChatLog.appendChild(msgEl);
      aiChatLog.scrollTop = aiChatLog.scrollHeight;
    },
    clearChat: () => {
      aiChatLog.innerHTML = '';
    }
  };

  console.log('%c CareSync AI Widget Initialized ', 'background: linear-gradient(135deg, #0F766E, #38BDF8); color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;');
})();
