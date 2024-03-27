import { CheckIcon, ExitIcon } from '@radix-ui/react-icons'

const Envelope = () => {
  return (
    <svg
      viewBox="0 0 180 115"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
    >
      <path
        d="M31.686183,74.975327c-.000001-20.021367,18.364811-12.473405,30.07638-1.187337q.355294.342386,42.880186,39.180759c9.33805,8.421676,14.860098,8.421676,23.824626,0L170.91443,74.975327c11.723539-10.487412,30.401358-19.301745,30.401358,0v82.892704c-.040902,20.367828-17.996401,32.920989-30.401358,32.920989h-109.151867c-14.52235,0-30.076376-12.688694-30.07638-27.984747v-87.828946Z"
        transform="matrix(1.011678 0 0 0.81598-27.886672-46.015212)"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="4px"
      />
    </svg>
  )
}

const Steps = () => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-gradient-to-l from-slate-100/60 to-white p-4">
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-orange-600 p-1 text-orange-600">
            <CheckIcon className="size-3" />
          </div>
          <span className="text-sm opacity-50">Sign up</span>
        </div>
        <div className="px-3">
          <div className="h-12 w-[1px] bg-orange-500" />
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-orange-600 p-1 text-orange-600">
            <CheckIcon className="size-3" />
          </div>
          <span className="text-sm opacity-50">Basic info</span>
        </div>
        <div className="px-3">
          <div className="h-12 w-[1px] bg-orange-600" />
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-orange-600 bg-orange-600 p-1 text-orange-600">
            <div className="px-1 text-xs text-white">3</div>
          </div>

          <span className="text-sm font-medium text-orange-600">
            Confirm email
          </span>
        </div>
      </div>
      <div>
        <button className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-sm font-medium shadow-md">
          <ExitIcon className="size-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className="flex flex-col gap-8 px-12 py-4">
      <div className="flex-1">
        <div>
          <div className="flex items-center justify-center">
            <div className="relative size-48">
              <div className="absolute z-[0] size-full rounded-full border"></div>
              <div className="absolute z-[1] size-full bg-gradient-to-t from-white from-30% via-white/50 to-white/0"></div>
              <div className="absolute z-[2] flex size-full -translate-y-4 items-center justify-center">
                <div className="size-12 rotate-45 rounded-md border-[2px] border-slate-200 bg-white"></div>
              </div>
              <div className="absolute z-[2] flex size-full items-center justify-center">
                <div className=" flex w-1/5 -translate-y-6 flex-col gap-[6px] rounded-md bg-[--orange] px-3 pb-4 pt-2">
                  <div className="h-1 w-2/3 rounded-sm bg-white" />
                  <div className="h-1 w-full rounded-sm bg-white" />
                  <div className="h-1 w-full rounded-sm bg-white" />
                </div>
              </div>
              <div className="absolute z-[3] flex size-full items-center justify-center">
                <div className="w-2/5 text-slate-200">
                  <Envelope />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-12"></div>
        <div>
          <div>
            <span className="font-bold">
              Check your inbox to confirm your email address
            </span>
          </div>
          <div className="h-4"></div>
          <div>
            <p className="font-light">
              We&apos;ve emailed you a link. Please check your inbox, including
              the spam folder to confirm your email and access to the platform.
            </p>
          </div>
        </div>
      </div>
      <div className="h-2"></div>
      <div className="flex justify-between gap-8">
        <button className="min-w-[140px] rounded-xl p-4 text-sm font-medium shadow-md">
          Resend email
        </button>
        <button className="min-w-[140px] rounded-xl bg-orange-600 p-4 text-sm font-medium text-white shadow-[0px_4px_12px_rgba(255,0,0,0.35)]">
          Continue
        </button>
      </div>
    </div>
  )
}

const EmailConfirm = () => {
  return (
    <div className="h-screen w-screen bg-slate-100/70 text-gray-700">
      <div className="flex size-full items-center justify-center">
        <div className="max-w-2xl rounded-3xl border border-slate-200/40 bg-white p-4 shadow-md">
          <div className="flex">
            <div className="min-w-[200px]">
              <Steps />
            </div>
            <div className="flex-1">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailConfirm
