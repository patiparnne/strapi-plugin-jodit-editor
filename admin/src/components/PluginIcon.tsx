import { Pencil } from '@strapi/icons';
import { Flex } from '@strapi/design-system';

import styled from 'styled-components';

const IconBox = styled(Flex)`
  padding: 6px;
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */
  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;

const PluginIcon = () => <IconBox justifyContent="center" alignItems="center" hasRadius>
  <Pencil />
</IconBox>;

export { PluginIcon };
