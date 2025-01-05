import ButtonsPage from "@/app/(home)/examples/buttons/page";
import { ExamplesNav } from "@/components/examples-nav";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="container relative">
      <Hero />
      <ExamplesNav />
      <ButtonsPage />
    </div>
  );
}
