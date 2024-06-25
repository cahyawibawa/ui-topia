import Link from 'next/link'
import { Icons } from '../icons'
import { ProjectCard } from '../project-card'

const projects = [
  {
    title: 'Stashticly',
    href: 'https://antimetal.com',
    dates: 'Jan 2024 - Feb 2024',
    active: true,
    description: 'A simple, open source, and free expense tracking app.',
    technologies: [
      'Next.js',
      'Typescript',
      'TailwindCSS',
      'Clerk',
      'React Query',
      'Hono',
      'Drizzle',
      'Neon',
    ],
    links: [
      {
        type: 'Website',
        href: 'https://stashticly.vercel.app',
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image:
      'https://res.cloudinary.com/dfsxagbor/image/upload/v1719048474/opengraph-image_vncxx4.png',
    video: '',
  },
  {
    title: 'Next.js Commerce',
    href: 'https://vercel.com/templates/next.js/nextjs-commerce',
    dates: 'June 2023 - Present',
    active: true,
    description: 'Starter kit for high-performance commerce with Shopify.',
    technologies: ['Next.js', 'Typescript', 'TailwindCSS'],
    links: [
      {
        type: 'Website',
        href: 'https://demo.vercel.store/',
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: 'Source',
        href: 'https://vercel.com/templates/next.js/nextjs-commerce',
        icon: <Icons.gitHub className="size-3" />,
      },
    ],
    image:
      'https://pbs.twimg.com/media/GMcJfnXaYAAuEQm?format=jpg&name=4096x4096',
    video: '',
  },
  // add more projects here
]

export default function ProjectCardDemo() {
  return (
    <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
      {projects.map((project, id) => (
        <Link key={project.title} href={project.href}>
          <ProjectCard
            href={project.href}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            video={project.video}
            links={project.links}
          />
        </Link>
      ))}
    </div>
  )
}
