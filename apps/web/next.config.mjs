// @ts-check
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import createMDX from 'fumadocs-mdx/config'
import { transformerTwoslash } from 'fumadocs-twoslash'
import rehypeKatex from 'rehype-katex'

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  eslint: {
    // Replaced by root workspace command
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.noParse = [/typescript\/lib\/typescript.js/]

    return config
  },
}

const withMDX = createMDX({
  buildSearchIndex: {
    filter: (v) => {
      return !v.match(/.+\.model\.mdx/)
    },
  },
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      transformers: [
        // @ts-ignore
        ...rehypeCodeDefaultOptions.transformers,
        transformerTwoslash(),
        {
          name: 'fumadocs:remove-escape',
          code(element) {
            element.children.forEach((line) => {
              if (line.type !== 'element') return

              line.children.forEach((child) => {
                if (child.type !== 'element') return
                const textNode = child.children[0]
                if (!textNode || textNode.type !== 'text') return

                textNode.value = textNode.value.replace(/\[\\!code/g, '[!code')
              })
            })

            return element
          },
        },
      ],
    },
    lastModifiedTime: 'git',
    remarkPlugins: [],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
})

export default withMDX(config)
