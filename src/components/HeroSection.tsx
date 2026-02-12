import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type HeroSectionProps = {
  startFrame: number;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;

  // Title animation
  const titleProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(titleProgress, [0, 1], [-50, 0], {
    extrapolateRight: "clamp",
  });

  // Subtitle animation (delayed)
  const subtitleProgress = spring({
    frame: localFrame - 0.5 * fps,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [-30, 0], {
    extrapolateRight: "clamp",
  });

  // CTA button animation (delayed more)
  const ctaProgress = spring({
    frame: localFrame - 1 * fps,
    fps,
    config: { damping: 200 },
  });

  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 30%, #1e40af 0%, #0f172a 70%)",
        }}
      />

      {/* Content */}
      <div style={{ zIndex: 1, textAlign: "center" }}>
        {/* Title */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Fast & Reliable
          <br />
          Web Hosting
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 32,
            color: "#94a3b8",
            marginBottom: 40,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          99.9% Uptime • 24/7 Support • Free SSL • Daily Backups
        </p>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
              padding: "20px 60px",
              borderRadius: 50,
              display: "inline-block",
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.5)",
            }}
          >
            Get Started - $9.99/mo
          </div>
        </div>
      </div>

      {/* Floating server icons */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          fontSize: 60,
          opacity: 0.3,
          transform: `translateY(${Math.sin(localFrame / 30) * 20}px)`,
        }}
      >
        🖥️
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "8%",
          fontSize: 50,
          opacity: 0.3,
          transform: `translateY(${Math.sin(localFrame / 25 + 1) * 15}px)`,
        }}
      >
        🔒
      </div>
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "12%",
          fontSize: 45,
          opacity: 0.3,
          transform: `translateY(${Math.sin(localFrame / 35 + 2) * 18}px)`,
        }}
      >
        ⚡
      </div>
    </AbsoluteFill>
  );
};
