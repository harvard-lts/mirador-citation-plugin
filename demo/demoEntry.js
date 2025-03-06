import Mirador from "mirador/dist/es/src/index";
import Plugin from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        manifestId: "https://nrs.lib.harvard.edu/URN-3:FHCL:37563741:MANIFEST:3",
      },
      {
        manifestId: "https://iiif.io/api/cookbook/recipe/0036-composition-from-multiple-images/manifest.json",
      },
      {
        manifestId: "https://api.dc.library.northwestern.edu/api/v2/works/1bc233eb-4bb5-4439-9456-d567aaf7977b?as=iiif",
      }, 
      {
        manifestId: "https://media.getty.edu/iiif/manifest/fb9efb54-09dd-42bb-837c-2d27f797cfb2",
      },
      {
        manifestId: "https://nrs.lib.harvard.edu/URN-3:HUL.GUEST:101907912:MANIFEST:3",
      },
      {
        manifestId: "https://nrs.lib.harvard.edu/URN-3:HLS.LIBR:102621314:MANIFEST:3",
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