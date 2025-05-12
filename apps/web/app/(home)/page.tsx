import { Hero } from "@/components/hero";
import { ShowcaseComponent } from "@/components/showcase-component";

export default function Home() {
  return (
    <div className="container-wrapper">
      <div className="container">
        <Hero />
        <ShowcaseComponent name="family-wallets-demo" showV0Button={false} />
        <ShowcaseComponent
          name="action-search-input-demo"
          showV0Button={false}
        />
        <ShowcaseComponent name="paper-fold-demo" showV0Button={false} />
        <ShowcaseComponent name="text-loop-demo" showV0Button={false} />
      </div>
    </div>
  );
}
