import { Hero } from "@/components/hero";
import { ShowcaseComponent } from "@/components/showcase-component";
import FamilyWalletsDemo from "@/registry/components/family-wallets-demo";
import TextLoopDemo from "@/registry/components/text-loop-demo";

export default function Home() {
  return (
    <div className="container relative">
      <Hero />
      <ShowcaseComponent name="family-wallets-demo" demo={FamilyWalletsDemo} />
      <ShowcaseComponent name="text-loop-demo" demo={TextLoopDemo} />
    </div>
  );
}
