import { siteConfig } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-balance text-center text-sm leading-loose md:text-left">
          Built by{' '}
          <a
            href={siteConfig.links.portfolio}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Cahya
          </a>
          . The source code is available on{' '}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
