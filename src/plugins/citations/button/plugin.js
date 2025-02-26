import React from 'react';
import CitationIcon from "@material-ui/icons/FormatQuote";

const CitationButton = () => (
  <CitationIcon />
);
CitationButton.value = 'CitationKey';

export default {
  target: 'WindowSideBarButtons',
  mode: 'add',
  component: CitationButton
};