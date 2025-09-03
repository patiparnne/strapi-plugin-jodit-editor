import { PLUGIN_ID } from './pluginId';
import { Initializer, PluginIcon } from './components';
import { DEFAULT_BUTTONS, STRAPI_MEDIA_BUTTON_NAME } from './components/config';

// Import Jodit CSS
import 'jodit/es2015/jodit.css';

export default {
  register(app: any) {
    console.log('🎯 Jodit Editor plugin - ADMIN REGISTER function called!');
    
    // Inject global CSS to fix Jodit popup positioning
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .jodit .jodit-popup {
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Register the custom field for Jodit editor
    app.customFields.register({
      name: 'jodit',
      pluginId: PLUGIN_ID,
      type: 'richtext',
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.jodit.label`,
        defaultMessage: 'Jodit Editor',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.jodit.description`,
        defaultMessage: 'Rich text editor powered by Jodit with advanced formatting options',
      },
      components: {
        Input: async () => import('./components/JoditInput'),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.jodit.options.advanced.settings`,
              defaultMessage: 'Editor Settings',
            },
            items: [
              {
                name: 'options.height',
                type: 'number',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.height.label`,
                  defaultMessage: 'Editor Height (px)',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.height.description`,
                  defaultMessage: 'Set the height of the editor in pixels',
                },
                defaultValue: 400,
              },
              {
                name: 'options.readonly',
                type: 'checkbox',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.readonly.label`,
                  defaultMessage: 'Read Only',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.readonly.description`,
                  defaultMessage: 'Make the editor read-only',
                },
                defaultValue: false,
              },
              {
                name: 'options.buttons',
                type: 'textarea',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.buttons.label`,
                  defaultMessage: 'Toolbar Buttons (comma-separated)',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.buttons.description`,
                  defaultMessage: `Specify which buttons to include in the toolbar. Default: ${DEFAULT_BUTTONS} (${STRAPI_MEDIA_BUTTON_NAME} for Strapi's media library)`,
                },
                defaultValue: DEFAULT_BUTTONS,
              },
              {
                name: 'options.removeButtons',
                type: 'textarea',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.removeButtons.label`,
                  defaultMessage: 'Remove Buttons (comma-separated)',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.removeButtons.description`,
                  defaultMessage: 'Specify which buttons to remove from the toolbar. Example: bold,italic,underline',
                },
              },
              {
                name: 'options.toolbar',
                type: 'checkbox',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.toolbar.label`,
                  defaultMessage: 'Show Toolbar',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.toolbar.description`,
                  defaultMessage: 'Whether to show the editor toolbar',
                },
                defaultValue: true,
              },
              {
                name: 'options.fonts',
                type: 'textarea',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.fonts.label`,
                  defaultMessage: 'Custom Fonts (one line per value)',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.fonts.description`,
                  defaultMessage: 'Set the available fonts for the editor. Example: Arial, Helvetica, sans-serif',
                },
                defaultValue: '',
              },
              {
                name: 'options.webp',
                type: 'textarea',
                intlLabel: {
                  id: `${PLUGIN_ID}.jodit.options.webp.label`,
                  defaultMessage: 'WebP Conversion Settings',
                },
                description: {
                  id: `${PLUGIN_ID}.jodit.options.webp.description`,
                  defaultMessage: 'Set Mime Types separated by commas for WebP conversion. Example: image/jpeg,image/jpg,image/png,image/bmp',
                },
                defaultValue: '',
              },
            ],
          },
        ],
      },
    });

    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    //   Component: async () => {
    //     const { App } = await import('./pages/App');

    //     return App;
    //   },
    // });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
    
    console.log('🎯 Jodit Editor custom field registered successfully!');
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
