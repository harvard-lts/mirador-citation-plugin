import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { PluginHook } from 'mirador/dist/es/src/components/PluginHook';
import ns from 'mirador/dist/es/src/config/css-ns';
import Typography from '@material-ui/core/Typography';
import { CitationSection } from '../../../components/CitationSection';
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
          paperClassName={ns('related-links-panel')}
          windowId={windowId}
          id={id}
        > 
          <dl className={classes.relatedLinksIntro}>
            <Typography variant="body1" component="dd">
              <SanitizedHtml htmlString={relatedLinksTitle} ruleSet="iiif" />
            </Typography>
          </dl>
          <dl className={classes.relatedLinksIntro}>
            <Typography variant="body1" component="dd">
              <SanitizedHtml htmlString={relatedLinksIntro} ruleSet="iiif" />
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
                <CitationSection id='harvard-metadata' label='harvard metadata' links={citationData.harvard_metadata_links}/>
                <CitationSection id='related-links' label='related links' links={citationData.related_links}/>
              </div>
            }
            <PluginHook {...this.props} />
        </CompanionWindow>
    );
  }
}

RelatedLinksSidePanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  manifestId: PropTypes.string.isRequired,
  citationAPI: PropTypes.string.isRequired,
};

RelatedLinksSidePanel.defaultProps = {
  classes: {},
  manifestId: null,
  citationAPI: null,
  index: 1,
};