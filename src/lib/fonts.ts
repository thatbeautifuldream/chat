import localFont from "next/font/local";

const fkGroteskNeue = localFont({
  src: "../../public/fonts/fk_grotesk_neue.woff2",
  variable: "--font-fk-grotesk-neue",
  display: "swap",
});

const berkeleyMono = localFont({
  src: "../../public/fonts/berkeley_mono.woff2",
  variable: "--font-berkeley-mono",
  display: "swap",
});

const ppEditorialNew = localFont({
  src: "../../public/fonts/pp_editorial_new_variable.woff2",
  variable: "--font-pp-editorial-new",
  display: "swap",
});

export const sans = {
  fkGroteskNeue,
};

export const mono = {
  berkeleyMono,
};

export const serif = {
  ppEditorialNew,
};
