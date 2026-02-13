"use client";

import { Player } from "@remotion/player";
import { MyComposition } from "../src/Composition";
import { useState } from "react";

// SVG Icons from Heroicons (replacing emojis)
const LightningIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      text: "The best hosting I've ever used! Fast, reliable, and the support team is amazing!",
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
      text: "Switched from another host and couldn't be happier! My store is faster and more reliable!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: LightningIcon,
      title: "Lightning Fast",
      description: "99.9% uptime with blazing fast servers",
    },
    {
      icon: ShieldIcon,
      title: "Super Secure",
      description: "Advanced protection for your data",
    },
    {
      icon: RocketIcon,
      title: "Easy Setup",
      description: "Get online in just 5 minutes",
    },
    {
      icon: ChatIcon,
      title: "24/7 Support",
      description: "Expert help whenever you need it",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F0F9FF] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Hero Section */}
      <section className="py-20 px-5 text-center">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-[#0C4A6E] mb-6 leading-tight">
          Web Hosting That Just Works
        </h1>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#0C4A6E] max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
          Fast, secure, and reliable hosting that makes your website perform at its best
        </p>

        <button
          className="bg-[#F97316] text-white text-lg font-semibold px-10 py-4 rounded-full border-none cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105"
          style={{ boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)' }}
        >
          Start Free Trial
        </button>

        {/* Video Player */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(14, 165, 233, 0.15)' }}>
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
      <section className="py-20 px-5 max-w-6xl mx-auto">
        {/* Chapter 1: The Problem */}
        <div className="bg-white rounded-3xl p-10 mb-10 cursor-pointer transition-all duration-200 hover:shadow-2xl" style={{ boxShadow: '0 10px 40px rgba(14, 165, 233, 0.1)' }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#0C4A6E] mb-5">
            The Problem: Slow & Unreliable Hosting
          </h2>
          <p className="text-lg text-[#0C4A6E] leading-relaxed opacity-80">
            Your website is slow, your host is unreliable, and support is hard to reach. Sound familiar? 
            Poor hosting affects your business, your users, and your peace of mind.
          </p>
        </div>

        {/* Chapter 2: The Journey */}
        <div className="bg-[#0EA5E9] text-white rounded-3xl p-10 mb-10">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">
            Your Journey to Better Hosting Starts Here
          </h2>
          <p className="text-lg leading-relaxed opacity-90 mb-8">
            Switch to fast, secure, and reliable hosting. We've helped thousands of businesses 
            improve their online presence with enterprise-grade infrastructure.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-sm opacity-80">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5min</div>
              <div className="text-sm opacity-80">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10k+</div>
              <div className="text-sm opacity-80">Active Sites</div>
            </div>
          </div>
        </div>

        {/* Chapter 3: The Solution */}
        <div className="bg-white rounded-3xl p-10 mb-10" style={{ boxShadow: '0 10px 40px rgba(14, 165, 233, 0.1)' }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#0C4A6E] mb-5">
            The Solution: Everything You Need
          </h2>
          <p className="text-lg text-[#0C4A6E] leading-relaxed mb-8 opacity-80">
            Lightning-fast servers, rock-solid security, and expert support that actually cares. 
            All the tools you need to succeed online.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#F0F9FF] rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-[#0EA5E9]"
              >
                <div className="text-[#0EA5E9] mb-4 flex justify-center">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-[#0C4A6E] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-[#0C4A6E] leading-relaxed opacity-80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Images Section */}
        <div className="bg-[#0EA5E9] text-white rounded-3xl p-10 mb-10">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-center mb-8">
            See Our Infrastructure
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
            <div className="bg-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:bg-white/20 border-2 border-transparent hover:border-white/50">
              <img
                src="/images/server-infrastructure.png"
                alt="Server Infrastructure"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Powerful Infrastructure
              </h3>
              <p className="text-base opacity-90 leading-relaxed">
                State-of-the-art servers with 99.9% uptime
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:bg-white/20 border-2 border-transparent hover:border-white/50">
              <img
                src="/images/cloud-dashboard.png"
                alt="Cloud Dashboard"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Smart Dashboard
              </h3>
              <p className="text-base opacity-90 leading-relaxed">
                Real-time analytics and one-click deployments
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:bg-white/20 border-2 border-transparent hover:border-white/50">
              <img
                src="/images/security-hosting.png"
                alt="Secure Hosting"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Super Secure
              </h3>
              <p className="text-base opacity-90 leading-relaxed">
                Advanced encryption and DDoS protection
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-3xl p-10" style={{ boxShadow: '0 10px 40px rgba(14, 165, 233, 0.1)' }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#0C4A6E] mb-8 text-center">
            Image Gallery
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {[
              { src: '/images/server-infrastructure.png', alt: 'Server Infrastructure' },
              { src: '/images/cloud-dashboard.png', alt: 'Cloud Dashboard' },
              { src: '/images/security-hosting.png', alt: 'Secure Hosting' },
              { src: '/images/cute-cat.png', alt: 'Cute Cat' },
            ].map((image, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ boxShadow: '0 4px 20px rgba(14, 165, 233, 0.15)' }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-5 bg-[#0EA5E9] text-white">
        <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="max-w-4xl mx-auto bg-white/10 rounded-3xl p-10">
          {/* Testimonial Card */}
          <div className="flex flex-col items-center text-center">
            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed mb-6 italic">
              "{testimonials[activeTestimonial].text}"
            </p>

            {/* Author */}
            <div className="mt-4">
              <div className="text-xl font-bold mb-1">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="text-base opacity-80">
                {testimonials[activeTestimonial].role}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-200 ${
                    activeTestimonial === index 
                      ? 'bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Climax CTA Section */}
      <section className="py-24 px-5 text-center">
        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-[#0C4A6E] mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#0C4A6E] max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
          Join 10,000+ websites already enjoying fast, reliable hosting
        </p>
        <button
          className="bg-[#F97316] text-white text-xl font-semibold px-16 py-5 rounded-full border-none cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-105"
          style={{ boxShadow: '0 12px 30px rgba(249, 115, 22, 0.4)' }}
        >
          Start Your Free Trial
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 text-center bg-white">
        <p className="text-[#0C4A6E] text-sm opacity-60">
          © 2026 Web Hosting. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
