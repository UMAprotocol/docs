module.exports = {
  title: "UMA Docs",
  tagline: "A protocol for building synthetic assets",
  url: "https://docs.umaproject.org/",
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
      title: "Docs",
      logo: {
        alt: "UMA Logo",
        src: "img/UMA_square_red_logo.png",
      },
      links: [
        {
          to: "/",
          label: "Getting Started",
          position: "left",
          activeBaseRegex: "(getting-started/|/$)",
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
          to: "oracle/tech-architecture",
          label: "Oracle (DVM)",
          position: "left",
          activeBaseRegex: "(oracle/|governance/)",
        },
        {
          to: "dev-ref/addresses",
          label: "Developer Reference",
          position: "left",
          activeBasePath: "dev-ref",
        },
        { to: "community/press", label: "Community", position: "right" },
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
    },
    footer: {
      links: [
        {
          title: "Docs",
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
              label: "Oracle (DVM)",
              to: "oracle/tech-architecture",
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
      copyright: `Copyright © ${new Date().getFullYear()} Risk Labs`,
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
          showLastUpdateTime: true,
          editUrl: "https://github.com/UMAProtocol/docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  stylesheets: ["https://use.typekit.net/jll8euv.css"],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html"],
        redirects: [
          {
            to: "/",
            from: ["/uma/index.html"],
          },
          // getting started
          {
            to: "/getting-started/overview",
            from: ["/uma/getting_started/architecture_overview.html"],
          },
          {
            to: "/getting-started/synthetic-tokens",
            from: ["/uma/getting_started/priceless_defi_contracts.html"],
          },
          {
            to: "/getting-started/oracle",
            from: ["/uma/getting_started/uma_oracle_design.html"],
          },
          // synthetic tokens
          {
            to: "/synthetic-tokens/explainer",
            from: ["/uma/synthetic_tokens/explainer.html"],
          },
          {
            to: "/synthetic-tokens/glossary",
            from: ["/uma/synthetic_tokens/glossary.html"],
          },
          {
            to: "/synthetic-tokens/known-issues",
            from: ["/uma/synthetic_tokens/known_issues.html"],
          },
          // tutorials (synthetic tokens)
          {
            to: "/tutorials/setup",
            from: ["/uma/synthetic_tokens/prerequisites.html"],
          },
          {
            to: "/tutorials/mint-locally",
            from: ["/uma/synthetic_tokens/creating_from_truffle.html"],
          },
          {
            to: "/tutorials/cli-tool",
            from: ["/uma/synthetic_tokens/using_the_uma_sponsor_cli_tool.html"],
          },
          {
            to: "/tutorials/bots",
            from: ["/uma/synthetic_tokens/liquidation.html"],
          },
          {
            to: "/tutorials/mint-etherscan",
            from: ["/uma/synthetic_tokens/mint_tokens_via_etherscan.html"],
          },
          // oracle
          {
            to: "/oracle/tech-architecture",
            from: ["/uma/oracle/technical_architecture.html"],
          },
          {
            to: "/oracle/econ-architecture",
            from: ["/uma/oracle/economic_architecture.html"],
          },
          {
            to: "/oracle/dvm-interface",
            from: ["/uma/oracle/dvm_interfaces.html"],
          },
          {
            to: "/oracle/known-issues",
            from: ["/uma/oracle/known_issues.html"],
          },
          {
            to: "/oracle/mainnet-info",
            from: ["/uma/oracle/mainnet_deployment_info.html"],
          },
          // governance
          {
            to: "/oracle/uma-holders",
            from: ["/uma/oracle/UMA_token_holder_responsibilities.html"],
          },
          {
            to: "/oracle/umips",
            from: ["/uma/oracle/UMIPs.html"],
          },
          {
            to: "/oracle/adding-price-id",
            from: ["/uma/oracle/adding_a_price_identifier.html"],
          },
          // tutorials (oracle)
          {
            to: "/tutorials/voting-uma",
            from: ["/uma/oracle/voting_with_uma_tokens.html"],
          },
          {
            to: "/tutorials/voting-2key",
            from: ["/uma/oracle/voting_with_UMA_2-key_contract.html"],
          },
          {
            to: "/tutorials/dvm-integration",
            from: ["/uma/oracle/integrating_the_dvm.html"],
          },
        ],
      },
    ],
  ],
};
