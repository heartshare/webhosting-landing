import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PricingSection } from "./components/PricingSection";
import { CTASection } from "./components/CTASection";

export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      <HeroSection startFrame={0} />
      <FeaturesSection startFrame={2 * fps} />
      <PricingSection startFrame={5 * fps} />
      <CTASection startFrame={8 * fps} />
    </AbsoluteFill>
  );
};
