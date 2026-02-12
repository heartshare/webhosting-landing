import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type PricingSectionProps = {
  startFrame: number;
};

const plans = [
  {
    name: "Starter",
    price: "$4.99",
    period: "/mo",
    features: ["10GB SSD Storage", "100GB Bandwidth", "1 Website", "Free SSL"],
    color: "#64748b",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    features: ["100GB SSD Storage", "1TB Bandwidth", "10 Websites", "Free SSL + CDN"],
    color: "#3b82f6",
    featured: true,
  },
  {
    name: "Business",
    price: "$24.99",
    period: "/mo",
    features: ["500GB SSD Storage", "Unlimited Bandwidth", "Unlimited Websites", "Priority Support"],
    color: "#8b5cf6",
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;

  // Section title animation
  const titleProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        Choose Your Plan
      </h2>

      {/* Pricing Cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
        }}
      >
        {plans.map((plan, index) => {
          const delay = 0.3 * fps * (index + 1);
          const cardProgress = spring({
            frame: localFrame - delay,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          });

          const cardY = interpolate(cardProgress, [0, 1], [50, 0], {
            extrapolateRight: "clamp",
          });

          const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1], {
            extrapolateRight: "clamp",
          });

          const isFeatured = plan.featured;
          const scale = isFeatured ? 1.1 : 1;

          return (
            <div
              key={index}
              style={{
                backgroundColor: "#1e293b",
                padding: isFeatured ? 50 : 40,
                borderRadius: 20,
                width: isFeatured ? 300 : 260,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale * scale})`,
                boxShadow: isFeatured
                  ? `0 8px 40px rgba(59, 130, 246, 0.4)`
                  : "0 4px 20px rgba(0, 0, 0, 0.3)",
                border: isFeatured ? `3px solid ${plan.color}` : "none",
                zIndex: isFeatured ? 1 : 0,
              }}
            >
              {isFeatured && (
                <div
                  style={{
                    backgroundColor: plan.color,
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                    padding: "6px 16px",
                    borderRadius: 20,
                    display: "inline-block",
                    marginBottom: 20,
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h3
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: 30 }}>
                <span style={{ fontSize: 48, fontWeight: "bold", color: plan.color }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: 20, color: "#94a3b8" }}>{plan.period}</span>
              </div>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map((feature, featureIndex) => {
                  const featureDelay = delay + 0.2 * fps * featureIndex;
                  const featureProgress = spring({
                    frame: localFrame - featureDelay,
                    fps,
                    config: { damping: 200 },
                  });

                  const featureOpacity = interpolate(featureProgress, [0, 1], [0, 1], {
                    extrapolateRight: "clamp",
                  });

                  return (
                    <div
                      key={featureIndex}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        opacity: featureOpacity,
                      }}
                    >
                      <span style={{ color: "#10b981", fontSize: 20 }}>✓</span>
                      <span style={{ color: "#e2e8f0", fontSize: 16 }}>{feature}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div
                style={{
                  marginTop: 30,
                  backgroundColor: plan.color,
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  padding: "14px 32px",
                  borderRadius: 10,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Get Started
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
