import CitationSidePanel from './component';
import { withStyles } from '@material-ui/core/styles';
import { getManifestTitle } from 'mirador/dist/es/src/state/selectors';

const styles = () => ({
  citationItem: {
    "padding-bottom": 0,
  }
});

const mapStateToProps = (state, { id, windowId }) => ({
  manifestId: state.config.windows[0]?.manifestId,
  citationAPI: state.config.miradorCitationPlugin?.citationAPI,
  manifestTitle: getManifestTitle(state, { windowId }),
});

export default {
  component: withStyles(styles)(CitationSidePanel),
  companionWindowKey: 'CitationKey',
  mapStateToProps: mapStateToProps
};