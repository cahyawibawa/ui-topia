import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { createMetadata } from '@/lib/metadata'
import { utils, type Page } from '@/lib/source'
import { cn } from '@/lib/utils'
import { Card, Cards } from 'fumadocs-ui/components/card'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
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

  const path = `apps/web/content/docs/${page.file.path}`
  const preview = page.data.preview
  const MDX = page.data.exports.default

  const footer = (
    <a
      href={`https://github.com/cahyawibawa/ui-topia/blob/main/${path}`}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        buttonVariants({
          variant: 'outline',
          size: 'sm',
          className: 'gap-1.5 text-xs',
        })
      )}
    >
      <Icons.edit className="size-3" />
      Edit on Github
    </a>
  )

  return (
    <DocsPage
      toc={page.data.exports.toc}
      lastUpdate={page.data.exports.lastModified}
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
        single: false,
        footer,
      }}
      tableOfContentPopover={{ footer }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
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
