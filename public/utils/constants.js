export const paths = {
  home: "./zine/index.md",
};

export const converterOptions = {
  emoji: true,
  headerLevelStart: 2,
  metadata: true,
  strikethrough: true,
};

export const els = {
  meta: document.querySelector('meta[name="description"]'),
  header: document.getElementById("header"),
  main: document.getElementById("main"),
  footer: document.getElementById("footer"),
};
