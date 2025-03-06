import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CitationIcon from "@material-ui/icons/FormatQuote";
import { getManifestTitle, getManifestUrl } from 'mirador/dist/es/src/state/selectors';

class CitationButton extends Component {
  constructor(props) {
    super(props);
    const { manifestId, citationAPI, manifestTitle } = this.props;
    console.log('manifestId2:' + manifestId);
    this.state = {
      manifestId: manifestId,
      citationAPI: citationAPI,
      manifestTitle: manifestTitle,
    };
  }
  async componentDidMount() {
    const { manifestId, citationAPI, manifestTitle } = this.state;
    console.log('manifestId:', manifestId);
  }
  render() {
    return (
      <CitationIcon />
    );
  }

}

CitationButton.value = 'CitationKey';

const mapStateToProps = (state, { windowId }) => ({
  manifestId: getManifestUrl(state, { windowId }),
  citationAPI: state.config.miradorCitationPlugin?.citationAPI,
  manifestTitle: getManifestTitle(state, { windowId }),
});

const enhance = compose(
  connect(mapStateToProps),
);

CitationButton.propTypes = {
  manifestId: PropTypes.string,
  citationAPI: PropTypes.string,
  manifestTitle: PropTypes.string,
};

CitationButton.defaultProps = {
  manifestId: null,
  citationAPI: null,
  manifestTitle: null,
};

export default {
  target: 'WindowSideBarButtons',
  mode: 'add',
  component: enhance(CitationButton)
};