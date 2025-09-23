import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CitationIcon from "@material-ui/icons/FormatQuote";
import Icon from "@material-ui/core/Icon";
import { getManifestTitle, getManifestUrl } from 'mirador/dist/es/src/state/selectors';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  hideCitationButton: {
    display: 'none',
  },
});

class CitationButton extends Component {
  constructor(props) {
    super(props);
    const { manifestId, citationAPI, manifestTitle } = this.props;
    this.state = {
      manifestId: manifestId,
      citationAPI: citationAPI,
      manifestTitle: manifestTitle,
      citationData: null,
      loading: true,
      error: null,
    };
  }
  async componentDidMount() {
    const { manifestId, citationAPI, manifestTitle } = this.state;
    
    // Only fetch if we have the required data
    if (manifestId && citationAPI) {
      this.fetchCitationData(manifestId, citationAPI);
    } else {
      console.log('CitationButton: manifestId or citationAPI not available yet', { manifestId, citationAPI });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    // Check if props changed and update state accordingly
    const { manifestId: newManifestId, citationAPI: newCitationAPI, manifestTitle: newManifestTitle } = this.props;
    const { manifestId: prevManifestId, citationAPI: prevCitationAPI } = prevState;
    
    // Update state if props changed
    if (newManifestId !== prevManifestId || newCitationAPI !== prevCitationAPI || newManifestTitle !== prevState.manifestTitle) {
      this.setState({
        manifestId: newManifestId,
        citationAPI: newCitationAPI,
        manifestTitle: newManifestTitle,
      });
    }
    
    // Check if manifestId or citationAPI became available and fetch data
    const { manifestId, citationAPI } = this.state;
    if ((manifestId !== prevManifestId || citationAPI !== prevCitationAPI) && manifestId && citationAPI) {
      this.fetchCitationData(manifestId, citationAPI);
    }
  }

  fetchCitationData = async (manifestId, citationAPI) => {
    const body = { "manifest_id": manifestId };
    
    try {
      const response = await fetch(citationAPI, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const citationData = await response.json();
      this.setState({ citationData, loading: false });
    } catch (error) {
      console.error('There was a problem receiving the citation:', error);
      this.setState({ loading: false, error: error.message });
    }
  }
  render() {
    const { classes, 
      windowId,
     } = this.props;
    const { citationData, loading, error } = this.state;
    if (citationData) {
      if (!citationData.error) {
        return (
          <div>
            <CitationIcon />
          </div>
        );
      }
      else {
        return (
          <div className={classes.hideCitationButton}>
            <style>
              {`
              section[id="`+windowId+`"] button[title="Cite"] { display: none }
              `}
            </style>
            <Icon />
          </div>
        );
      }
    }
    else {
      return (
        <div className={classes.hideCitationButton}>
            <style>
              {`
              section[id="`+windowId+`"] button[title="Cite"] { display: none }
              `}
            </style>
          <Icon />
        </div>
      );
    }
  }

}

CitationButton.value = 'CitationKey';

const mapStateToProps = (state, { windowId }) => {

  const manifestId = getManifestUrl(state, { windowId });
  const citationAPI = state.config.miradorCitationPlugin?.citationAPI;
  const manifestTitle = getManifestTitle(state, { windowId });

  return {
    manifestId: manifestId,
    citationAPI: citationAPI,
    manifestTitle: manifestTitle,
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

CitationButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  manifestId: PropTypes.string,
  citationAPI: PropTypes.string,
  manifestTitle: PropTypes.string,
};

CitationButton.defaultProps = {
  classes: {},
  manifestId: null,
  citationAPI: null,
  manifestTitle: null,
};

export default {
  target: 'WindowSideBarButtons',
  name: 'WindowSideBarCitationButton',
  mode: 'add',
  component: enhance(CitationButton)
};