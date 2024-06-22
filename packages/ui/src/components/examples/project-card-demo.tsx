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
  // {
  //   title: 'llm.report',
  //   href: 'https://llm.report',
  //   dates: 'April 2023 - September 2023',
  //   active: true,
  //   description:
  //     'Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.',
  //   technologies: [
  //     'Next.js',
  //     'Typescript',
  //     'PostgreSQL',
  //     'Prisma',
  //     'TailwindCSS',
  //     'Shadcn UI',
  //     'Magic UI',
  //     'Stripe',
  //     'Cloudflare Workers',
  //   ],
  //   links: [
  //     {
  //       type: 'Website',
  //       href: 'https://llm.report',
  //       icon: <Icons.scan className="size-3" />,
  //     },
  //     {
  //       type: 'Source',
  //       href: 'https://github.com/dillionverma/llm.report',
  //       icon: <Icons.gitHub className="size-3" />,
  //     },
  //   ],
  //   image: '',
  //   video: 'https://cdn.llm.report/openai-demo.mp4',
  // },
  // {
  //   title: 'Automatic Chat',
  //   href: 'https://automatic.chat',
  //   dates: 'April 2023 - March 2024',
  //   active: true,
  //   description:
  //     'Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.',
  //   technologies: [
  //     'Next.js',
  //     'Typescript',
  //     'PostgreSQL',
  //     'Prisma',
  //     'TailwindCSS',
  //     'Shadcn UI',
  //     'Magic UI',
  //     'Stripe',
  //     'Cloudflare Workers',
  //   ],
  //   links: [
  //     {
  //       type: 'Website',
  //       href: 'https://automatic.chat',
  //       icon: <Icons.scan className="size-3" />,
  //     },
  //   ],
  //   image: '',
  //   video:
  //     'https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4',
  // },
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
