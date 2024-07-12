import { bundledLanguages, createHighlighter } from 'shiki'

export const codeToHtml = async ({
  code,
  lang,
  theme,
}: {
  code: string
  lang: string
  theme: 'light' | 'dark'
}) => {
  const highlighter = await createHighlighter({
    themes: ['catppuccin-latte', 'vesper'],
    langs: [...Object.keys(bundledLanguages)],
  })

  return highlighter.codeToHtml(code, {
    lang: lang,
    theme: theme === 'light' ? 'catppuccin-latte' : 'vesper',
  })
}
