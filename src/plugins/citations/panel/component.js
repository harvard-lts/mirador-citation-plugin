import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import CollapsibleSection from 'mirador/dist/es/src/containers/CollapsibleSection';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default class CitationSidePanel extends Component {
  constructor(props) {
    super(props);
    const { manifestId, citationAPI, manifestTitle } = this.props;
    this.state = {
      hasOcr: false,
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
    console.log('windowId: ', windowId);
    let citationsIntro = 'Please note that a complete citation may require additional information (document date, author name, range of pages/sequence numbers, etc.)';
    return (
        <CompanionWindow
          title="Citation"
          windowId={windowId}
          id={id}
        >
          <Typography variant="body1">
            <SanitizedHtml htmlString={citationsIntro} ruleSet="iiif" />
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
                  id={`${id}-resource`}
                  label={'resource'}
                >
                  <List>
                      <ListItem>
                      <ListItemText
                        primary="Persistent Link:"
                        secondary={citationData.resource_persistent_link}
                      />
                      </ListItem>
                      <ListItem>
                      <ListItemText
                        primary="Description:"
                        secondary={manifestTitle}
                      />
                      </ListItem>
                      <ListItem>
                      <ListItemText
                        primary="Repository:"
                        secondary={citationData.repository}
                      />
                      </ListItem>
                      <ListItem>
                      <ListItemText
                        primary="Institution:"
                        secondary={citationData.institution}
                      />
                      </ListItem>
                      <ListItem>
                      <ListItemText
                        primary="Accessed:"
                        secondary={citationData.access_date}
                      />
                      </ListItem>
                  </List>
                </CollapsibleSection>
              </div>
            }
        </CompanionWindow>
    );
  }
}

CitationSidePanel.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  manifestId: PropTypes.string.isRequired,
  citationAPI: PropTypes.string.isRequired,
  manifestTitle: PropTypes.string.isRequired,
};

CitationSidePanel.defaultProps = {
  manifestId: null,
  citationAPI: null,
  manifestTitle: null,
  index: 1,
};