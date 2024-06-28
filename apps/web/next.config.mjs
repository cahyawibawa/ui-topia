import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import {
  fileGenerator,
  remarkDocGen,
  remarkInstall,
  typescriptGenerator,
} from 'fumadocs-docgen'
import createMDX from 'fumadocs-mdx/config'
import { transformerTwoslash } from 'fumadocs-twoslash'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

const withMDX = createMDX({
  mdxOptions: {
    rehypeCodeOptions: {
      transformers: [
        ...rehypeCodeDefaultOptions.transformers,
        transformerTwoslash(),
      ],
      themes: {
        light: 'vitesse-light',
        dark: 'vesper',
      },
    },
    lastModifiedTime: 'git',
    remarkPlugins: [
      [remarkInstall, { Tabs: 'InstallTabs' }],
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
    ],
  },
})

export default withMDX(nextConfig)
