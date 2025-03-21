import { compose } from 'redux';
import { connect } from 'react-redux';
import CitationSidePanel from './component';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { getManifestTitle, getManifestUrl } from 'mirador/dist/es/src/state/selectors';

const styles = theme => ({
  section: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  citationIntro: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
});

const mapStateToProps = (state, { id, windowId }) => ({
  manifestId: getManifestUrl(state, { windowId }),
  citationAPI: state.config.miradorCitationPlugin?.citationAPI,
  manifestTitle: getManifestTitle(state, { windowId }),
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
);

export default {
  component: enhance(CitationSidePanel),
  companionWindowKey: 'CitationKey',
};