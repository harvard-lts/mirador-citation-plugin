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