"use client";

import { Player } from "@remotion/player";
import { MyComposition } from "../src/Composition";
import { useState } from "react";

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      text: "The cutest hosting I've ever used! Fast, reliable, and the support team is amazing!",
      rating: 5,
    },
    {
      name: "Mike Johnson",
      role: "Web Developer",
      text: "Love how everything just works! The dashboard is so easy to use and my clients are happy!",
      rating: 5,
    },
    {
      name: "Emily Zhang",
      role: "E-commerce Owner",
      text: "Switched from a boring host and couldn't be happier! My store is faster and looks great!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "99.9% uptime with blazing fast servers",
    },
    {
      icon: "🔒",
      title: "Super Secure",
      description: "Advanced protection for your precious data",
    },
    {
      icon: "🚀",
      title: "Easy Setup",
      description: "Get online in just 5 minutes!",
    },
    {
      icon: "💬",
      title: "Friendly Support",
      description: "24/7 help from real humans!",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F0F9FF",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: "700",
            color: "#0C4A6E",
            marginBottom: 24,
            fontFamily: "'Fredoka', sans-serif",
          }}
        >
          The Cutest Web Hosting 🌈
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#0C4A6E",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.75,
          }}
        >
          Fast, secure, and oh-so-friendly hosting that makes your website shine! ✨
        </p>

        <button
          style={{
            backgroundColor: "#F97316",
            color: "white",
            fontSize: 20,
            fontWeight: "700",
            padding: "16px 40px",
            borderRadius: 50,
            border: "none",
            cursor: "pointer",
            fontFamily: "'Fredoka', sans-serif",
            boxShadow: "0 8px 20px rgba(249, 115, 22, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(249, 115, 22, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(249, 115, 22, 0.3)";
          }}
        >
          Get Started Free! 🎀
        </button>

        {/* Video Player */}
        <div
          style={{
            marginTop: 60,
            maxWidth: 960,
            margin: "60px auto 0",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(14, 165, 233, 0.2)",
          }}
        >
          <Player
            component={MyComposition}
            durationInFrames={300}
            compositionWidth={1280}
            compositionHeight={720}
            fps={30}
            controls
            style={{
              width: "100%",
              borderRadius: 20,
            }}
          />
        </div>
      </section>

      {/* Storytelling Section */}
      <section
        style={{
          padding: "80px 20px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {/* Chapter 1: The Problem */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 24,
            padding: 40,
            marginBottom: 40,
            boxShadow: "0 10px 40px rgba(14, 165, 233, 0.15)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "700",
              color: "#0C4A6E",
              marginBottom: 20,
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            The Problem: Slow & Boring Hosting 😢
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "#0C4A6E",
              lineHeight: 1.75,
            }}
          >
            Your website is slow, your host is boring, and support is... well,
            let's just say it's not very friendly. Sound familiar? 😅
          </p>
        </div>

        {/* Chapter 2: The Journey */}
        <div
          style={{
            backgroundColor: "#0EA5E9",
            color: "white",
            borderRadius: 24,
            padding: 40,
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "700",
              marginBottom: 20,
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            Your Journey to Happiness Starts Here 🚀
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.75,
            }}
          >
            Switch to the cutest, fastest, and friendliest hosting around!
            We've helped thousands of websites shine brighter! ✨
          </p>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 24,
              marginTop: 32,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: "700", marginBottom: 8 }}>
                99.9%
              </div>
              <div>Uptime</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: "700", marginBottom: 8 }}>
                5min
              </div>
              <div>Setup Time</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: "700", marginBottom: 8 }}>
                10k+
              </div>
              <div>Happy Sites</div>
            </div>
          </div>
        </div>

        {/* Chapter 3: The Solution */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 24,
            padding: 40,
            marginBottom: 40,
            boxShadow: "0 10px 40px rgba(14, 165, 233, 0.15)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "700",
              color: "#0C4A6E",
              marginBottom: 20,
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            The Solution: Everything You Need! 🎉
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "#0C4A6E",
              lineHeight: 1.75,
            }}
          >
            Lightning-fast servers, rock-solid security, and support that actually
            cares! All wrapped in a super cute package! 🌟
          </p>

          {/* Feature Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              marginTop: 32,
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#F0F9FF",
                  borderRadius: 16,
                  padding: 24,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0EA5E9";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(14, 165, 233, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    marginBottom: 16,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "#0C4A6E",
                    marginBottom: 12,
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#0C4A6E",
                    lineHeight: 1.5,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#0EA5E9",
          color: "white",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 48,
            fontFamily: "'Fredoka', sans-serif",
          }}
        >
          What Our Friends Say! 💬
        </h2>

        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 24,
            padding: 40,
          }}
        >
          {/* Testimonial Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Star Rating */}
            <div
              style={{
                fontSize: 32,
                marginBottom: 16,
              }}
            >
              {"⭐".repeat(testimonials[activeTestimonial].rating)}
            </div>

            {/* Testimonial Text */}
            <p
              style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                lineHeight: 1.6,
                marginBottom: 24,
                fontStyle: "italic",
              }}
            >
              "{testimonials[activeTestimonial].text}"
            </p>

            {/* Author */}
            <div
              style={{
                marginTop: 16,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  fontFamily: "'Fredoka', sans-serif",
                  marginBottom: 4,
                }}
              >
                {testimonials[activeTestimonial].name}
              </div>
              <div
                style={{
                  fontSize: 16,
                  opacity: 0.9,
                }}
              >
                {testimonials[activeTestimonial].role}
              </div>
            </div>

            {/* Navigation Dots */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 32,
              }}
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor:
                      activeTestimonial === index ? "white" : "rgba(255, 255, 255, 0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Climax CTA Section */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: "700",
            color: "#0C4A6E",
            marginBottom: 24,
            fontFamily: "'Fredoka', sans-serif",
          }}
        >
          Ready to Make Your Website Shine? ✨
        </h2>
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#0C4A6E",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.75,
          }}
        >
          Join 10,000+ happy websites enjoying the cutest hosting around! 🌈
        </p>
        <button
          style={{
            backgroundColor: "#F97316",
            color: "white",
            fontSize: 24,
            fontWeight: "700",
            padding: "20px 60px",
            borderRadius: 50,
            border: "none",
            cursor: "pointer",
            fontFamily: "'Fredoka', sans-serif",
            boxShadow: "0 12px 30px rgba(249, 115, 22, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 16px 40px rgba(249, 115, 22, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(249, 115, 22, 0.4)";
          }}
        >
          Start Your Journey! 🚀
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <p
          style={{
            color: "#0C4A6E",
            fontSize: 16,
            opacity: 0.7,
          }}
        >
          Made with love by Cute Web Hosting 💙
        </p>
      </footer>
    </main>
  );
}
