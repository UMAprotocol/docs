const navbar = require("./config/navbar");
const footer = require("./config/footer");
const redirects = require("./config/redirects");

module.exports = {
  title: "UMA Contracts Docs",
  tagline: "Documentation for smart contracts",
  url: "https://contracts.docs.umaproject.org/",
  baseUrl: "/",
  favicon: "img/favicon-32x32.png",
  organizationName: "umaprotocol",
  projectName: "docs",
  themeConfig: {
    navbar,
    footer,
    sidebarCollapsible: true,
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl"),
    },
    algolia: {
      apiKey: "b3a7b837d4e8ce1e75898ddd39885c19",
      indexName: "umaproject",
    },
    colorMode: {
      switchConfig: {
        darkIcon: "🌙",
        darkIconStyle: {
          marginLeft: "2px",
          marginTop: "1px",
        },
        lightIcon: "☀️",
        lightIconStyle: {
          marginLeft: "3px",
          marginTop: "0.5px",
        },
      },
    },
  },
  stylesheets: ["https://use.typekit.net/jll8euv.css"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          editUrl: "https://github.com/UMAProtocol/docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html"],
        redirects,
      },
    ],
  ],
};
