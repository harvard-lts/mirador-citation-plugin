import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import isValidUrl from '../lib/isValidUrl';

export function CitationListItem({
    primary, 
    secondary,
    i,
  }) {

    if (isValidUrl(secondary)) {
        return (
          <ListItem button component={Link} href={secondary} target="_blank" rel="noopener" key={i}>
            <ListItemText primary={primary} secondary={secondary}/>
          </ListItem>
        );
    }
    else {
        return (
        <ListItem>
            <ListItemText primary={primary} secondary={secondary} key={i}/>
        </ListItem>
        );
    }
}
  
CitationListItem.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    i: PropTypes.number,
};