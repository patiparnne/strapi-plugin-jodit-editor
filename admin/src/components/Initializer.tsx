import { useEffect, useRef } from 'react';

import { PLUGIN_ID } from '../pluginId';

type InitializerProps = {
  setPlugin: (id: string) => void;
};

const Initializer = ({ setPlugin }: InitializerProps) => {
  const ref = useRef(setPlugin);

  useEffect(() => {
    ref.current(PLUGIN_ID);
    
    // Alternative: Inject CSS during initialization instead of registration
    // Uncomment this if you prefer to inject CSS here instead of in register()
    /*
    const existingStyle = document.getElementById('jodit-popup-fix');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'jodit-popup-fix';
      style.type = 'text/css';
      style.innerHTML = `
        .jodit .jodit-popup {
          transform: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    */
  }, []);

  return null;
};

export { Initializer };
