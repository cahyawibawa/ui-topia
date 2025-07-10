import { BlockDisplay } from "@/components/block-display";

const FEATURED_BLOCKS = ["login-03", "login-05"];

export default async function BlocksPage() {
  return (
    <div>
      {FEATURED_BLOCKS.map((block) => (
        <div
          className="border-grid border-b py-8 first:pt-6 last:border-b-0 md:py-12"
          key={block}
        >
          <BlockDisplay name={block} />
        </div>
      ))}
    </div>
  );
}
