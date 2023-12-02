import { getMarkdownData } from "./get-markdown-data.js";
import { els } from "./constants.js";

export const getYear = new Date().getFullYear();

export const buildHomeHeaderText = ({ name, description }) =>
  [`<h1>${name}</h1>`, `<p>${description}</p>`].join("");

export const buildHomeFooterText = ({ circa, name, owner }) =>
  [
    `<p>`,
    `<span>&copy;${circa}-${getYear}</span> `,
    `<span>${name} | ${owner}</span>`,
    `</p>`,
  ].join("");

export const buildZineHome = async () => {
  const { content, meta } = await getMarkdownData();

  document.title = meta.name;
  els.meta.setAttribute("content", meta.description);

  els.header.innerHTML = buildHomeHeaderText(meta);
  els.footer.innerHTML = buildHomeFooterText(meta);

  if (content) els.main.insertAdjacentHTML("afterbegin", content);
};
