const converterOptions = {
  emoji: true,
  metadata: true,
  strikethrough: true,
};

const els = {
  meta: document.querySelector('meta[name="description"]'),
  name: document.getElementById("name"),
  home: document.getElementById("home"),
  footer: document.getElementById("footer"),
};

const getYear = new Date().getFullYear();

const getZineHome = async () => {
  const converter = new showdown.Converter(converterOptions);
  try {
    const response = await (await fetch("./zine/index.md")).text();
    const zineHome = await converter.makeHtml(response);
    return { zineHome, zineMeta: converter.getMetadata() };
  } catch (e) {
    console.log("Looks like yer zine is messed up!");
    return;
  }
};

const buildFooterText = ({ circa, name, owner }) =>
  [`&copy;${circa}-${getYear}`, `${name} | ${owner}`].join(" ");

const buildZineHome = async () => {
  const { zineHome, zineMeta } = await getZineHome();

  document.title = zineMeta.name;
  els.meta.setAttribute("content", zineMeta.description);

  els.name.textContent = zineMeta.name;
  if (zineHome) els.home.innerHTML = zineHome;

  els.footer.innerHTML = `<p>${buildFooterText(zineMeta)}</p>`;
};

(async () => {
  buildZineHome();
})();
