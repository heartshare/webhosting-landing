import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type CTASectionProps = {
  startFrame: number;
};

export const CTASection: React.FC<CTASectionProps> = ({ startFrame }) => {
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

  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle animation (delayed)
  const subtitleProgress = spring({
    frame: localFrame - 0.3 * fps,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0], {
    extrapolateRight: "clamp",
  });

  // CTA button animation (delayed more)
  const ctaProgress = spring({
    frame: localFrame - 0.6 * fps,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  // Floating elements animation
  const floating1 = Math.sin(localFrame / 30) * 20;
  const floating2 = Math.sin(localFrame / 25 + 1) * 15;

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
          background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #0f172a 100%)",
        }}
      />

      {/* Floating decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          transform: `translateY(${floating1}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          transform: `translateY(${floating2}px)`,
        }}
      />

      {/* Content */}
      <div style={{ zIndex: 1, textAlign: "center", maxWidth: 900 }}>
        {/* Title */}
        <h1
          style={{
            fontSize: 70,
            fontWeight: "bold",
            color: "white",
            marginBottom: 30,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          Ready to Launch?
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 32,
            color: "#e0e7ff",
            marginBottom: 50,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            lineHeight: 1.6,
          }}
        >
          Join 10,000+ websites hosted on our platform.
          <br />
          Start your journey today with a 30-day money-back guarantee.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          {/* Primary Button */}
          <div
            style={{
              backgroundColor: "white",
              color: "#1e3a8a",
              fontSize: 26,
              fontWeight: "bold",
              padding: "20px 50px",
              borderRadius: 50,
              boxShadow: "0 10px 40px rgba(255, 255, 255, 0.3)",
              cursor: "pointer",
            }}
          >
            Get Started Now
          </div>

          {/* Secondary Button */}
          <div
            style={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: 26,
              fontWeight: "bold",
              padding: "20px 50px",
              borderRadius: 50,
              border: "3px solid white",
              cursor: "pointer",
            }}
          >
            Contact Sales
          </div>
        </div>

        {/* Trust badges */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            opacity: subtitleOpacity,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>99.9%</div>
            <div style={{ fontSize: 16, color: "#c7d2fe" }}>Uptime SLA</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>24/7</div>
            <div style={{ fontSize: 16, color: "#c7d2fe" }}>Support</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>30-day</div>
            <div style={{ fontSize: 16, color: "#c7d2fe" }}>Money Back</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
