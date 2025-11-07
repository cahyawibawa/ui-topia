import { ImageResponse } from "next/og";
import { Icons } from "@/registry/components/icons";

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "ui/topia";
  const description =
    searchParams.get("description") ||
    (title ? `Learn about the ${title} component.` : "A modern UI library");

  const [fonts] = await Promise.all([loadAssets()]);

  return new ImageResponse(
    <div
      tw="flex h-full w-full bg-white text-black"
      style={{ fontFamily: "Geist Sans" }}
    >
      <div tw="flex border absolute border-neutral-200 border-dashed inset-y-0 left-16 w-[1px]" />
      <div tw="flex border absolute border-neutral-200 border-dashed inset-y-0 right-16 w-[1px]" />
      <div tw="flex border absolute border-neutral-200 inset-x-0 h-[1px] top-16" />
      <div tw="flex border absolute border-neutral-200 inset-x-0 h-[1px] bottom-16" />
      <div tw="flex absolute flex-row bottom-24 right-24">
        <Icons.logo className="size-40" />
      </div>
      <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
        <div
          tw="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
          style={{
            textWrap: "balance",
            fontWeight: 600,
            fontSize: 70,
            letterSpacing: "-0.04em",
            color: "black",
          }}
        >
          {title}
        </div>
        <div
          tw="text-[32px] leading-[1.5] flex-grow-1"
          style={{
            fontWeight: 500,
            textWrap: "balance",
            color: "#9ca3af",
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 628,
      fonts,
    },
  );
}
