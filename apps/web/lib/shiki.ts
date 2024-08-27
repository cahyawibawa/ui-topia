export const codeToHtml = async ({
  code,
  lang,
  theme,
}: {
  code: string;
  lang: string;
  theme: "light" | "dark";
}) => {
  const { bundledLanguages, createHighlighter } = await import("shiki");

  const highlighter = await createHighlighter({
    themes: ["catppuccin-latte", "vesper"],
    langs: [...Object.keys(bundledLanguages)],
  });

  return highlighter.codeToHtml(code, {
    lang: lang,
    theme: theme === "light" ? "catppuccin-latte" : "vesper",
  });
};
