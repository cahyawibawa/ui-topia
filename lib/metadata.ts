import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://uitopia.vercel.app',
      images: '/og-gh.png',
      siteName: 'ui/topia',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@kyuotaka',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/og-gh.png',
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL}`);