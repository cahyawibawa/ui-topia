import { createMetadata } from '@/lib/metadata'
import { utils, type Page } from '@/lib/source'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { DocsBody, DocsPage } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Param {
  slug: string[]
}

export const dynamicParams = false

export default function Page({
  params,
}: {
  params: Param
}): React.ReactElement {
  const page = utils.getPage(params.slug)

  if (!page) notFound()

  const path = `apps/docs/content/docs/${page.file.path}`
  const preview = page.data.preview
  const MDX = page.data.exports.default

  return (
    <DocsPage
      toc={page.data.exports.toc}
      lastUpdate={page.data.exports.lastModified}
      tableOfContent={{
        enabled: page.data.toc,
      }}
    >
      <h1 className="font-heading scroll-m-20 text-3xl font-bold tracking-tight">
        {page.data.title}
      </h1>
      <p className="text-muted-foreground">{page.data.description}</p>
      <DocsBody>
        {page.data.index ? <Category page={page} /> : <MDX />}
      </DocsBody>
    </DocsPage>
  )
}

function Category({ page }: { page: Page }): React.ReactElement {
  const filtered = utils
    .getPages()
    .filter(
      (item) =>
        item.file.dirname === page.file.dirname && item.file.name !== 'index'
    )

  return (
    <Cards>
      {filtered.map((item) => (
        <Card
          key={item.url}
          title={item.data.title}
          description={item.data.description ?? 'No Description'}
          href={item.url}
        />
      ))}
    </Cards>
  )
}

export function generateStaticParams(): Param[] {
  return utils.getPages().map<Param>((page) => ({
    slug: page.slugs,
  }))
}
export function generateMetadata({ params }: { params: Param }): Metadata {
  const page = utils.getPage(params.slug)

  if (!page) notFound()

  const description =
    page.data.description ?? 'The library for UI designed components'

  const imageParams = new URLSearchParams()
  imageParams.set('title', page.data.title)
  imageParams.set('description', description)

  const image = {
    alt: 'Banner',
    url: `/api/og?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  }

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  })
}
