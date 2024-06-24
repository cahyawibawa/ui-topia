import { cn } from '@/lib/utils'
import Balance from 'react-wrap-balancer'

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        'mx-auto flex max-w-[980px] flex-col items-center gap-2 py-4 md:py-12 md:pb-6 lg:py-24 lg:pb-20',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'font-heading dark:text-primary space-y-2 text-center text-3xl font-semibold leading-tight md:max-w-[40rem] md:text-6xl lg:leading-[1.08]',
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        'text-foreground mt-4 max-w-[750px] text-center text-lg font-light',
        className
      )}
      {...props}
    />
  )
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center space-x-4 py-4 md:pb-10',
        className
      )}
      {...props}
    />
  )
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
