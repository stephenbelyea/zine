import { converterOptions, paths } from "./constants.js";

export const getMarkdownData = async (
  path = paths.home,
  options = converterOptions
) => {
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
