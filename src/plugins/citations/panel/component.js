import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import CollapsibleSection from 'mirador/dist/es/src/containers/CollapsibleSection';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { PluginHook } from 'mirador/dist/es/src/components/PluginHook';
import ns from 'mirador/dist/es/src/config/css-ns';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { CitationListItem } from '../../../components/CitationListItem';

export default class CitationSidePanel extends Component {
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
    let citationsIntro = 'Please note that a complete citation may require additional information (document date, author name, range of pages/sequence numbers, etc.)';
    return (
        <CompanionWindow
          title="Citation"
          paperClassName={ns('attribution-panel')}
          windowId={windowId}
          id={id}
        >
          <dl className={classes.citationIntro}>
          <Typography variant="body1" component="dd">
            <SanitizedHtml htmlString={citationsIntro} ruleSet="iiif" />
          </Typography>
          </dl>

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
                      <CitationListItem primary="Persistent Link:" secondary={citationData.resource_persistent_link}/>
                      <CitationListItem primary="Description:" secondary={manifestTitle}/>
                      <CitationListItem primary="Repository:" secondary={citationData.repository}/>
                      <CitationListItem primary="Institution:" secondary={citationData.institution}/>
                      <CitationListItem primary="Accessed:" secondary={citationData.access_date}/>
                  </List>
                </CollapsibleSection>
              </div>
            }
            <PluginHook {...this.props} />
        </CompanionWindow>
    );
  }
}

CitationSidePanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  manifestId: PropTypes.string.isRequired,
  citationAPI: PropTypes.string.isRequired,
  manifestTitle: PropTypes.string.isRequired,
};

CitationSidePanel.defaultProps = {
  classes: {},
  manifestId: null,
  citationAPI: null,
  manifestTitle: null,
  index: 1,
};