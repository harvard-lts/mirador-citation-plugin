import React from 'react';
import RelatedLinksIcon from '@material-ui/icons/Link';

const RelatedLinksButton = () => (
  <RelatedLinksIcon />
);
RelatedLinksButton.value = 'RelatedLinksKey';

export default {
  target: 'WindowSideBarButtons',
  mode: 'add',
  component: RelatedLinksButton
};