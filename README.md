# Mirador citation plugin

A Mirador 3 plugin for displaying Harvard-specific citations.

## Requirements

- [NVM](https://github.com/nvm-sh/nvm)

## Setup

1. Run `nvm use` to ensure your version of matches that in the `.nvmrc` file
2. Run `npm i` to install dependencies
3. Use one of the [NPM scripts](#npm-scripts) to perform the actions described below.

## NPM scripts

The following are some useful scripts can be ran using `npm run <script>`. A full list can be seen in [package.json](./package.json)

| Script  | Description                                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `clean` | Removes the `dist` directories                                                                                             |
| `build` | Builds the source files into the `./dist` directory                                                                        |
| `serve` | Runs a local web server where the plugin can be viewed in a vanilla Mirador instance (helpful for testing and development) |
| `test`  | Runs the automated test suites  

## Installing in Mirador

The `mirador-citation-plugin` requires an instance of Mirador 3. Visit the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) to learn how to [install an existing plugin](https://github.com/ProjectMirador/mirador/wiki/Mirador-3-plugins#installing-an-existing-plugin) and for additional information about plugins.

Package you will need to install:

```bash
npm i @harvard-lts/mirador-citation-plugin
```

## Configuration

Configurations for this plugin are injected when Mirador is initialized under the `miradorCitationPlugin` key. See the [demo entry](./demo/demoEntry.js) for an example of importing and configuring `mirador-citation-plugin`. Note: the demo entry does not contain a valid citation API endpoint. You must fill it in for the demo to work.

```js
...
  id: 'mirador',
  miradorCitationPlugin: {
    ...
  }
...
```

| Config Key | Type | Description |
| --- | --- | --- |
| `citationAPI` | string | The API endpoint of your custom citation service |

Additionally, the `aria-label` and `title` of the buttons are injected when Mirador is initialized under the `translations` key. See the [demo entry](./demo/demoEntry.js) for an example. The common configuration is also listed below.

```js
...
  id: 'mirador',
    translations: {
      en: {
        openCompanionWindow_CitationKey: 'Cite',
        openCompanionWindow_RelatedLinksKey: 'Related Links'
      }
    }
...
```

| Config Key | Type | Description |
| --- | --- | --- |
| `openCompanionWindow_CitationKey` | string | The text you wish to appear in the `aria-label` and `title` of the Citation button |
| `openCompanionWindow_RelatedLinksKey` | string | The text you wish to appear in the `aria-label` and `title` of the Related Links button |

## Contribute
Mirador's development, design, and maintenance is driven by community needs and ongoing feedback and discussion. Join us at our regularly scheduled community calls, on [IIIF slack #mirador](http://bit.ly/iiif-slack), or the [mirador-tech](https://groups.google.com/forum/#!forum/mirador-tech) and [iiif-discuss](https://groups.google.com/forum/#!forum/iiif-discuss) mailing lists. To suggest features, report bugs, and clarify usage, please submit a GitHub issue.

[build-badge]: https://img.shields.io/travis/projectmirador/mirador-citation-plugin/master.png?style=flat-square
[build]: https://travis-ci.org/projectmirador/mirador-citation-plugin

[npm-badge]: https://img.shields.io/npm/v/mirador-citation-plugin.png?style=flat-square
[npm]: https://www.npmjs.org/package/mirador-citation-plugin
