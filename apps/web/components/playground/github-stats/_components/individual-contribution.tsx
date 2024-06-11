import { cn } from '@/lib/utils'

interface IndividualContributionProps {
  className?: string
}

export const IndividualContribution = ({
  className,
}: IndividualContributionProps) => {
  const isGreen200 = Math.random() < 0.65
  const isGreen500 = Math.random() < 0.25

  return (
    <div
      className={cn(
        'group size-3 rounded border-neutral-50 bg-neutral-100 transition-all duration-500 ',
        isGreen200 &&
          'border-green-200 bg-green-200 group-hover:border-green-100 group-hover:bg-green-100',
        isGreen500 &&
          'border-green-500 bg-green-500 group-hover:border-green-200 group-hover:bg-green-200',
        className
      )}
    ></div>
  )
}
