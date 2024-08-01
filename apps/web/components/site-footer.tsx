import { siteConfig } from '@/config/site'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="py-6 md:py-0">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="font-redaction text-muted-foreground flex w-full justify-between text-balance text-center text-sm leading-loose md:text-left">
          <span>Built with Next.js</span>
          <span className="flex items-center space-x-1">
            <a
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noreferrer"
              className="font-medium"
            >
              Cahya Wibawa
            </a>
            <span>• {currentYear}</span>
          </span>
        </p>
      </div>
    </footer>
  )
}
