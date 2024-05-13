import { getPage, getPages } from '@/app/source'
import Preview from '@/components/preview'
import { DocsBody, DocsPage } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export default function Page({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug)

  if (page == null) {
    notFound()
  }
  const preview = page.data.preview
  const MDX = page.data.exports.default
  return (
    <DocsPage toc={page.data.exports.toc}>
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        {page.data.title}
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        {page.data.description}
      </p>
      <DocsBody>
        {preview && preview in Preview ? Preview[preview] : null}
        {page.data.index ? null : <MDX />}
      </DocsBody>
    </DocsPage>
  )
}

export const generateStaticParams = () => {
  return getPages().map((page) => ({
    slug: page.slugs,
  }))
}

export const generateMetadata = ({
  params,
}: {
  params: { slug?: string[] }
}) => {
  const post = getPage(params.slug)
  if (post === undefined) return

  const title = post.data.title
  const description = post.data.description
  const imageParams = new URLSearchParams()
  imageParams.set('title', title)
  imageParams.set('description', description ?? '')

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    ),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: `/api/og?${imageParams.toString()}`,
      url: post.url,
    },
    twitter: {
      title: title,
      description: description,
      images: `/api/og?${imageParams.toString()}`,
    },
  } satisfies Metadata
}
