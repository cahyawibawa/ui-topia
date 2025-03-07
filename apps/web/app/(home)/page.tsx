import { Hero } from "@/components/hero";
import { ShowcaseComponent } from "@/components/showcase-component";
import ActionSearchInput from "@/registry/components/action-search-input";
import FamilyWallets from "@/registry/components/family-wallets-demo";
import TextLoopDemo from "@/registry/components/text-loop-demo";

export default function Home() {
  return (
    <div className="container-wrapper">
      <div className="container py-4">
        <Hero />
        <ShowcaseComponent
          name="action-search-input-demo"
          demo={ActionSearchInput}
        />
        <ShowcaseComponent name="family-wallets-demo" demo={FamilyWallets} />
        <ShowcaseComponent name="text-loop-demo" demo={TextLoopDemo} />
      </div>
    </div>
  );
}
