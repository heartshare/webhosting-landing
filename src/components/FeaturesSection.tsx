import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type FeaturesSectionProps = {
  startFrame: number;
};

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "NVMe SSD storage for 10x faster loading",
  },
  {
    icon: "🔒",
    title: "Secure",
    description: "Free SSL certificates & DDoS protection",
  },
  {
    icon: "🔄",
    title: "Auto Backups",
    description: "Daily automated backups included",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "Expert help whenever you need it",
  },
];

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ startFrame }) => {
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
        Why Choose Us?
      </h2>

      {/* Feature Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 40,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {features.map((feature, index) => {
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

          return (
            <div
              key={index}
              style={{
                backgroundColor: "#1e293b",
                padding: 40,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: 50 }}>{feature.icon}</div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: 18, color: "#94a3b8", margin: 0 }}>
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
