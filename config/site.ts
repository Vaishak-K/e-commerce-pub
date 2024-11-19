export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    // {
    //   label: "Home",
    //   href: "/",
    // },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "My Cart",
      href: "/cart",
    },
    {
      label: "My Addresses",
      href: "/address",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    // {
    //   label: "Home",
    //   href: "/",
    // },
    {
      label: "My Orders",
      href: "/order",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "My Cart",
      href: "/cart",
    },
    {
      label: "My Addresses",
      href: "/address",
    },

    {
      label: "Switch to Admin",
      href: "/admin",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
