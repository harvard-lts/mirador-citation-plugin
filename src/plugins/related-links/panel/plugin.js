import { compose } from 'redux';
import { connect } from 'react-redux';
import RelatedLinksSidePanel from './component';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { getManifestTitle } from 'mirador/dist/es/src/state/selectors';

const styles = theme => ({
  section: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  relatedLinksIntro: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
});

const mapStateToProps = (state, { id, windowId }) => ({
  manifestId: state.config.windows[0]?.manifestId,
  citationAPI: state.config.miradorCitationPlugin?.citationAPI,
  manifestTitle: getManifestTitle(state, { windowId }),
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
);

export default {
  component: enhance(RelatedLinksSidePanel),
  companionWindowKey: 'RelatedLinksKey',
};