module.exports = {
  title: "UMA Docs",
  tagline: "A protocol for building synthetic assets",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon-32x32.png",
  organizationName: "umaprotocol",
  projectName: "docs",
  themeConfig: {
    sidebarCollapsible: false,
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl"),
    },
    navbar: {
      title: "",
      logo: {
        alt: "UMA Logo",
        src: "img/UMA_square_red_logo.png",
      },
      links: [
        {
          to: "/",
          label: "Getting Started",
          position: "left",
          activeBaseRegex: "(getting-started|/$)",
        },
        {
          to: "tutorials/setup",
          label: "Tutorials",
          position: "left",
          activeBasePath: "tutorials",
        },
        {
          to: "synthetic-tokens/explainer",
          label: "Synthetic Tokens",
          position: "left",
          activeBasePath: "synthetic-tokens",
        },
        {
          to: "oracle-solution/tech-architecture",
          label: "Oracle Solution (DVM)",
          position: "left",
          activeBaseRegex: "(oracle-solution|governance)",
        },
        { to: "getting-started", label: "FAQ", position: "right" },
        { to: "getting-started", label: "Status", position: "right" },
        {
          href: "https://github.com/UMAprotocol/protocol",
          className: "header-github-link",
          position: "right",
        },
        {
          href: "https://twitter.com/UMAprotocol",
          className: "header-twitter-link",
          position: "right",
        },
        {
          href: "https://discord.umaproject.org/",
          className: "header-discord-link",
          position: "right",
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      links: [
        {
          title: "Docs",
          // TODO update footer items
          items: [
            {
              label: "Getting Started",
              to: "getting-started/overview",
            },
            {
              label: "Tutorials",
              to: "tutorials/setup",
            },
            {
              label: "Synthetic Tokens",
              to: "synthetic-tokens/explainer",
            },
            {
              label: "Oracle Solution (DVM)",
              to: "oracle-solution/tech-architecture",
            },
            {
              label: "Governance",
              to: "governance/uma-holders",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.umaproject.org/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/UMAprotocol/",
            },
            {
              label: "GitHub",
              href: "https://github.com/UMAprotocol/protocol",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "FAQ",
              href: "https://github.com/UMAprotocol/protocol",
            },
            {
              label: "Status",
              href: "https://github.com/UMAprotocol/protocol",
            },
            {
              label: "Website",
              href: "https://umaproject.org/",
            },
            {
              label: "Medium",
              href: "https://medium.com/uma-project",
            },
          ],
        },
      ],
      // TODO confirm the appropriate org name here
      copyright: `Copyright © ${new Date().getFullYear()} UMA Protocol`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          homePageId: "getting-started/welcome",
          sidebarPath: require.resolve("./sidebars.js"),
          // TODO Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  stylesheets: ["https://use.typekit.net/jll8euv.css"],
};
