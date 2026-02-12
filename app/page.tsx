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

      <p
        style={{
          marginTop: 40,
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
