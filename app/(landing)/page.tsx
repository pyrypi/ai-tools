import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { Vortex } from "@/components/ui/vortex";

export default function LandingPage() {
  return (
    <div className="">
      <Vortex
        backgroundColor="black"
        rangeY={400}
        particleCount={70}
        baseHue={160}
        baseRadius={1}
        rangeRadius={4}
        className=""
      >
        <LandingNavbar />
        <LandingHero />
      </Vortex>
    </div>
  );
}
