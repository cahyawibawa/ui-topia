import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center py-8">
        <span className="text-sm font-medium">
          {/* Made by
          <a
            href={siteConfig.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
          >
            @cahya
          </a>{' '} */}
          Inspired by
          <a
            href="https://twitter.com/ibelick"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
          >
            @ibelick
          </a>
        </span>
      </div>
    </footer>
  )
}
