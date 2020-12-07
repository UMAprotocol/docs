module.exports = {
  title: "Docs",
  logo: {
    alt: "UMA Logo",
    src: "img/UMA_square_red_logo.png",
  },
  items: [
    {
      to: "/",
      label: "Understanding UMA",
      position: "left",
      activeBaseRegex: "(understanding-uma/|/$)",
    },
    {
      to: "developers/setup",
      label: "Developers",
      position: "left",
      activeBasePath: "developers",
    },
    {
      to: "uma-tokenholders/uma-holders",
      label: "Token Holders",
      position: "left",
      activeBasePath: "uma-tokenholders",
    },
    // {
    //   label: "The Protocol",
    //   to: "synthetic-tokens/explainer",
    //   position: "left",
    //   activeBaseRegex: "(synthetic-tokens|oracle)",
    //   items: [
    //     {
    //       to: "synthetic-tokens/explainer",
    //       label: "Synthetic Tokens",
    //       activeBasePath: "synthetic-tokens",
    //     },
    //     {
    //       to: "oracle/tech-architecture",
    //       label: "Oracle (DVM)",
    //       activeBasePath: "oracle",
    //     },
    //   ],
    // },
    // {
    //   to: "developers/addresses",
    //   label: "Developer Reference",
    //   position: "left",
    //   activeBasePath: "developers",
    // },
    { 
      to: "community/press", 
      label: "Community", 
      position: "right" 
    },
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
};
