import { BlockDisplay } from "@/components/block-display";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = Promise<{ blockId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <div className="container py-8">
      <BlockDisplay name={params.blockId} />
    </div>
  );
}
