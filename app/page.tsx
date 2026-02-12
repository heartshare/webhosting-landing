"use client";

import { Player } from "@remotion/player";
import { MyComposition } from "../src/Composition";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <h1
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: "white",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Web Hosting Landing Page
      </h1>

      <Player
        component={MyComposition}
        durationInFrames={300}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        controls
        style={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          width: "100%",
          maxWidth: 1200,
          marginTop: 60,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src="/images/server-infrastructure.png"
            alt="Server Infrastructure"
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
          <h3
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Powerful Infrastructure
          </h3>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            State-of-the-art servers with 99.9% uptime guarantee and
            enterprise-grade hardware.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src="/images/cloud-dashboard.png"
            alt="Cloud Dashboard"
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
          <h3
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Cloud Dashboard
          </h3>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Intuitive control panel with real-time analytics, server metrics,
            and one-click deployments.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src="/images/security-hosting.png"
            alt="Secure Hosting"
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
          <h3
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Secure Hosting
          </h3>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Advanced encryption, DDoS protection, and 24/7 security monitoring
            to keep your data safe.
          </p>
        </div>
      </div>

      <p
        style={{
          marginTop: 60,
          color: "#94a3b8",
          fontSize: 16,
          textAlign: "center",
          maxWidth: 600,
        }}
      >
        Built with Remotion • Deployed on Vercel
        <br />
        Animated landing page for a web hosting company
      </p>
    </main>
  );
}
