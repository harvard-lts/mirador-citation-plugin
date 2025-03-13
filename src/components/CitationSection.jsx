import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CollapsibleSection from 'mirador/dist/es/src/containers/CollapsibleSection';
import List from '@material-ui/core/List';
import { CitationListItem } from './CitationListItem';

export function CitationSection({
    id,
    label,
    links, 
  }) {
    if (!links) {
        return null;
    }
    else if (links.length === 0) {    
        return null;
    }
    else {
        return (
            <CollapsibleSection
                id={`${id}-${id}`}
                label={`${label}`}
            >
                <List>
                    {
                    links.map((link, i) =>
                        <CitationListItem primary={link.label} secondary={link.link} key={i} />
                    )
                    }
                </List>
            </CollapsibleSection>        
        );
    }

}
    
CitationSection.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.object),
};