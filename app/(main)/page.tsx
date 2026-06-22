import WhaleHero from "@/components/WhaleHero";
import {
  WhoWeServeSection,
  PainPointSection,
  SolutionSection,
  WhyMCGSection,
  FinalCTASection,
} from "@/components/HomeSections";
import DesignSwitcher from "@/components/DesignSwitcher";

export default function HomePage() {
  return (
    <>
      <WhaleHero />
      <WhoWeServeSection />
      <PainPointSection />
      <SolutionSection />
      <WhyMCGSection />
      <FinalCTASection />
      <DesignSwitcher active="Design 1" />
    </>
  );
}
