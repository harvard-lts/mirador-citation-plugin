import Mirador from "mirador/dist/es/src/index";
import Plugin from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        manifestId: "https://nrs.lib.harvard.edu/URN-3:FHCL:37563741:MANIFEST:3",
      },
    ],
    miradorCitationPlugin: {
      citationAPI:'YOUR CITATION API ENDPOINT GOES HERE',
    },
    translations: {
      en: {
        openCompanionWindow_CitationKey: 'Cite',
        openCompanionWindow_RelatedLinksKey: 'Related Links'
      }
    }
  };

  const plugins = [...Plugin];

  Mirador.viewer(config, plugins);
});