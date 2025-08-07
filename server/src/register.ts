import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register the Jodit custom field on the server side
  strapi.customFields.register({
    name: 'jodit',
    plugin: 'jodit-editor',
    type: 'richtext',
    inputSize: {
      default: 12,
      isResizable: true,
    },
  });

  console.log('🎯 Jodit Editor plugin - SERVER REGISTER function called!');
  console.log('🎯 Jodit custom field registered on server side successfully!');
};

export default register;
