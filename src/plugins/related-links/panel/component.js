import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import CollapsibleSection from 'mirador/dist/es/src/containers/CollapsibleSection';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
export default class RelatedLinksSidePanel extends Component {
  constructor(props) {
    super(props);
    const { manifestId, citationAPI, manifestTitle } = this.props;
    this.state = {
      manifestId: manifestId,
      citationAPI: citationAPI,
      manifestTitle: manifestTitle,
    };
  }

  async componentDidMount() {
    const { manifestId, citationAPI, manifestTitle } = this.state;
    const body = { "manifest_id": manifestId };
    fetch(citationAPI, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(citationData => {
        this.setState({ citationData, loading: false });
      })
      .catch(error => {
        console.error('There was a problem receiving the citation:', error);
        this.setState({ loading: false, error: error.message });
    });
  }

  render() {
    const { classes, 
      id, 
      windowId,
      index,
      manifestTitle,
     } = this.props;
    const { citationData, loading, error } = this.state;
    let relatedLinksTitle = '<b>Links relating to:</b> ' + manifestTitle;
    let relatedLinksIntro = 'The following links provide more information about this resource. Links open in a new window.';
    return (
        <CompanionWindow
          title="Related Links"
          windowId={windowId}
          id={id}
        > 
            <Typography variant="body1">
            <SanitizedHtml htmlString={relatedLinksTitle} ruleSet="iiif" />
            </Typography>

            <Typography variant="body1">
            <SanitizedHtml htmlString={relatedLinksIntro} ruleSet="iiif" />
            </Typography>

          <Typography
            aria-labelledby={
              `${id}-currentItem-${index} ${id}-currentItem-${index}-heading`
            }
            id={`${id}-currentItem-${index}-heading`}
            variant="h4"
            component="h5"
          >
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
          </Typography>

            {citationData &&
              <div className={classes.section}>
                <CollapsibleSection
                  id={`${id}-harvard-metadata`}
                  label={'harvard metadata'}
                >
                  <List>
                    {
                        citationData.harvard_metadata_links.map((metadataLink, i) =>
                            <ListItem button component={Link} href={metadataLink.link} target="_blank" rel="noopener" key={i}>
                            <ListItemText
                            primary={metadataLink.label}
                            secondary={metadataLink.link}
                            />
                            </ListItem>
                        )
                    }
                  </List>
                </CollapsibleSection>
                <CollapsibleSection
                  id={`${id}-related-links`}
                  label={'related links'}
                >
                  <List>
                  {
                        citationData.related_links.map((relatedLink, i) =>
                            <ListItem button component={Link} href={relatedLink.link} target="_blank" rel="noopener" key={i}>
                            <ListItemText
                            primary={relatedLink.label}
                            secondary={relatedLink.link}
                            />
                            </ListItem>
                        )
                    }
                  </List>
                </CollapsibleSection>
              </div>
            }
        </CompanionWindow>
    );
  }
}

RelatedLinksSidePanel.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  manifestId: PropTypes.string.isRequired,
  citationAPI: PropTypes.string.isRequired,
};

RelatedLinksSidePanel.defaultProps = {
  manifestId: null,
  citationAPI: null,
  index: 1,
};