import { Hero } from "@/components/hero";
import { ShowcaseComponent } from "@/components/showcase-component";
import FamilyWalletsDemo from "@/registry/showcases/family-wallets-demo";
import TextLoopDemo from "@/registry/showcases/text-loop-demo";

export default function Home() {
  return (
    <div className="container relative">
      <Hero />
      <ShowcaseComponent name="family-wallets-demo" demo={FamilyWalletsDemo} />
      <ShowcaseComponent name="text-loop-demo" demo={TextLoopDemo} />
    </div>
  );
}
