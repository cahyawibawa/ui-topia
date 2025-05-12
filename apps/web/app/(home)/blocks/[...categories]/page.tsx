import { BlockDisplay } from "@/components/block-display";
import { getAllBlockIds, getBlockCategories } from "@/lib/blocks";

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getBlockCategories();
  return categories.map((category) => ({
    categories: [category.slug],
  }));
}

type Params = Promise<{ categories?: string[] }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const _searchParams = await props.searchParams;

  const blocks = await getAllBlockIds(
    ["registry:block"],
    params.categories ?? [],
  );

  return (
    <div className="space-y-8">
      {blocks.map((name) => (
        <div key={name} className="py-8 first:pt-6 last:border-b-0 md:py-12">
          <BlockDisplay name={name} />
        </div>
      ))}
    </div>
  );
}
