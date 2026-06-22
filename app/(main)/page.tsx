import WhaleHero from "@/components/WhaleHero";
import {
  WhoWeServeSection,
  PainPointSection,
  SolutionSection,
  WhyMCGSection,
  FinalCTASection,
} from "@/components/HomeSections";

export default function HomePage() {
  return (
    <>
      <WhaleHero />
      <WhoWeServeSection />
      <PainPointSection />
      <SolutionSection />
      <WhyMCGSection />
      <FinalCTASection />
    </>
  );
}
