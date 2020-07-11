module.exports = {
  title: "UMA Docs",
  tagline: "A protocol for building synthetic assets",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon-32x32.png",
  organizationName: "umaprotocol",
  projectName: "docs",
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
    },
    navbar: {
      title: "Explained",
      logo: {
        alt: "UMA Logo",
        src: "img/UMA_square_red_logo.png",
      },
      links: [
        { to: "docs/", label: "Getting Started", position: "left" },
        { to: "getting-started", label: "Tutorials", position: "left" },
        { to: "getting-started", label: "Synthetic Tokens", position: "left" },
        {
          to: "getting-started",
          label: "Oracle Solution (DVM)",
          position: "left",
        },
        { to: "getting-started", label: "FAQ", position: "right" },
        { to: "getting-started", label: "Status", position: "right" },
        {
          href: "https://github.com/UMAprotocol/protocol",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://umaproject.org/",
          label: "Website",
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
              to: "docs/",
            },
            {
              label: "Tutorials",
              to: "docs/",
            },
            {
              label: "Synthetic Tokens",
              to: "docs/",
            },
            {
              label: "Oracle Solution (DVM)",
              to: "docs/",
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
          homePageId: "getting-started/overview",
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
