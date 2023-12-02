const converterOptions = {
  emoji: true,
  headerLevelStart: 2,
  metadata: true,
  strikethrough: true,
};

const paths = {
  home: "./zine/index.md",
};

const els = {
  meta: document.querySelector('meta[name="description"]'),
  header: document.getElementById("header"),
  main: document.getElementById("main"),
  footer: document.getElementById("footer"),
};

const getYear = new Date().getFullYear();

const getPageData = async (path = paths.home, options = converterOptions) => {
  const converter = new showdown.Converter(options);
  try {
    const response = await (await fetch(path)).text();
    const content = await converter.makeHtml(response);
    return { content, meta: converter.getMetadata() };
  } catch (e) {
    console.log("Looks like yer zine is messed up!");
    return;
  }
};

const buildHeaderText = ({ name, description }) =>
  [`<h1>${name}</h1>`, `<p>${description}</p>`].join("");

const buildFooterText = ({ circa, name, owner }) =>
  [
    `<p>`,
    `<span>&copy;${circa}-${getYear}</span> `,
    `<span>${name} | ${owner}</span>`,
    `</p>`,
  ].join("");

const buildZineHome = async () => {
  const { content, meta } = await getPageData();

  document.title = meta.name;
  els.meta.setAttribute("content", meta.description);

  els.header.innerHTML = buildHeaderText(meta);
  els.footer.innerHTML = buildFooterText(meta);

  if (content) els.main.insertAdjacentHTML("afterbegin", content);
};

(async () => {
  buildZineHome();
})();
