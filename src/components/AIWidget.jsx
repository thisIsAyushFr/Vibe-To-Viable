import { useEffect } from 'react';

/**
 * CareSync AI widget loader.
 *
 * Renders nothing itself. The widget's markup, styling and behaviour all live in
 * the one shared component (`public/shared-ai.css` + `public/shared-ai.js`), so
 * that React pages, admin.html and Patient.html render a byte-identical widget.
 *
 * shared-ai.js appends the widget to document.body and binds delegated events,
 * so it is safe to mount this component on any page and safe to mount twice.
 */
const CSS_HREF = '/shared-ai.css';
const JS_SRC = '/shared-ai.js';

export default function AIWidget() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    if (window.CareSyncAI) {
      // Script already loaded on a previous page — just (re)mount the markup.
      window.CareSyncAI.mount();
      return;
    }

    if (!document.querySelector(`script[src="${JS_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = JS_SRC;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
