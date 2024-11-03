export const codeToHtml = async ({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) => {
  const { bundledLanguages, createHighlighter } = await import("shiki");

  const highlighter = await createHighlighter({
    themes: ["vesper"],
    langs: [...Object.keys(bundledLanguages)],
  });

  return highlighter.codeToHtml(code, {
    lang: lang,
    theme: "vesper",
  });
};
