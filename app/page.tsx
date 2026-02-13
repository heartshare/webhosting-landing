"use client";

import { Player } from "@remotion/player";
import { MyComposition } from "../src/Composition";
import { useState } from "react";

// SVG Icons from Heroicons
const LightningIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
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

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-['Outfit',sans-serif]">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#1E293B] mb-4 leading-tight">
            Web Hosting That Just Works
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#1E293B] max-w-2xl mx-auto mb-8 leading-relaxed opacity-80 font-['Work_Sans',sans-serif]">
            Fast, secure, and reliable hosting that makes your website perform at its best
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-[#F97316] text-white text-lg font-semibold px-8 py-4 rounded-xl border-none cursor-pointer transition-all duration-200 hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 min-h-[48px]"
            >
              Start Free Trial
            </button>
            <button
              className="bg-white text-[#2563EB] text-lg font-semibold px-8 py-4 rounded-xl border-2 border-[#2563EB] cursor-pointer transition-all duration-200 hover:bg-[#2563EB] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 min-h-[48px]"
            >
              View Plans
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden bg-white p-2">
          <Player
            component={MyComposition}
            durationInFrames={300}
            compositionWidth={1280}
            compositionHeight={720}
            fps={30}
            controls
            style={{
              width: "100%",
              borderRadius: 16,
            }}
          />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Large Feature Card - Lightning Fast */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:col-span-2 cursor-pointer transition-all duration-200 hover:shadow-xl group min-h-[200px]">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 flex-shrink-0">
                <LightningIcon />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-2">Lightning Fast</h3>
                <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">99.9% uptime with blazing fast servers</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#2563EB]">99.9%</div>
                <div className="text-sm text-[#1E293B] opacity-60 font-['Work_Sans',sans-serif]">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#2563EB]">&lt;1s</div>
                <div className="text-sm text-[#1E293B] opacity-60 font-['Work_Sans',sans-serif]">Response</div>
              </div>
            </div>
          </div>

          {/* Small Feature Card - Super Secure */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl group min-h-[200px]">
            <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all duration-200 mb-4">
              <ShieldIcon />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Super Secure</h3>
            <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Advanced protection for your data</p>
          </div>

          {/* Medium Feature Card - Easy Setup */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl group min-h-[200px]">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 mb-4">
              <RocketIcon />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Easy Setup</h3>
            <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Get online in just 5 minutes</p>
            <div className="mt-4 text-sm text-[#1E293B] opacity-60 font-['Work_Sans',sans-serif]">
              One-click deployment
            </div>
          </div>

          {/* Medium Feature Card - 24/7 Support */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl group min-h-[200px]">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 mb-4">
              <ChatIcon />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">24/7 Support</h3>
            <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Expert help whenever you need it</p>
            <div className="mt-4 text-sm text-[#1E293B] opacity-60 font-['Work_Sans',sans-serif]">
              Avg response: 2 min
            </div>
          </div>

          {/* Image Card - Server Infrastructure */}
          <div className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl">
            <div className="aspect-video relative">
              <img
                src="/images/server-infrastructure.png"
                alt="Server Infrastructure"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">Powerful Infrastructure</h3>
              <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">State-of-the-art servers</p>
            </div>
          </div>

          {/* Image Card - Cloud Dashboard */}
          <div className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl md:col-span-2">
            <div className="aspect-video relative">
              <img
                src="/images/cloud-dashboard.png"
                alt="Cloud Dashboard"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">Smart Dashboard</h3>
              <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Real-time analytics and one-click deployments</p>
            </div>
          </div>

          {/* Small Feature Card - Global CDN */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl group min-h-[200px]">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 mb-4">
              <GlobeIcon />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Global CDN</h3>
            <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Content delivered fast worldwide</p>
          </div>

          {/* Image Card - Security Hosting */}
          <div className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl">
            <div className="aspect-video relative">
              <img
                src="/images/security-hosting.png"
                alt="Secure Hosting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">Super Secure</h3>
              <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Advanced encryption & DDoS</p>
            </div>
          </div>

          {/* Image Card - Cute Cat */}
          <div className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl">
            <div className="aspect-video relative">
              <img
                src="/images/cute-cat.png"
                alt="Cute Cat"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">Fun Stuff</h3>
              <p className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Because we love our users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 hover:shadow-xl min-h-[140px] flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] mb-2">10k+</div>
            <div className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Active Sites</div>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 hover:shadow-xl min-h-[140px] flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] mb-2">99.9%</div>
            <div className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Uptime SLA</div>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 hover:shadow-xl min-h-[140px] flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] mb-2">5min</div>
            <div className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Setup Time</div>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 hover:shadow-xl min-h-[140px] flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] mb-2">24/7</div>
            <div className="text-[#1E293B] opacity-70 font-['Work_Sans',sans-serif]">Support</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-[#2563EB] rounded-3xl p-6 sm:p-8 md:p-12 text-white">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-center mb-8 sm:mb-12">
            What Our Customers Say
          </h2>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="flex flex-col items-center text-center">
              {/* Star Rating */}
              <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonials[activeTestimonial].rating} out of 5 stars`}>
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed mb-6 italic font-['Work_Sans',sans-serif]">
                "{testimonials[activeTestimonial].text}"
              </p>

              {/* Author */}
              <div className="mt-4">
                <div className="text-xl font-bold mb-1">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-base opacity-90 font-['Work_Sans',sans-serif]">
                  {testimonials[activeTestimonial].role}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-4 h-4 rounded-full border-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2563EB] min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      activeTestimonial === index 
                        ? 'bg-white' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                    aria-current={activeTestimonial === index ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 text-center">
        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-[#1E293B] mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#1E293B] max-w-2xl mx-auto mb-8 leading-relaxed opacity-80 font-['Work_Sans',sans-serif]">
          Join 10,000+ websites already enjoying fast, reliable hosting
        </p>
        <button
          className="bg-[#F97316] text-white text-lg sm:text-xl font-semibold px-10 sm:px-12 py-4 sm:py-5 rounded-xl border-none cursor-pointer transition-all duration-200 hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 min-h-[48px]"
        >
          Start Your Free Trial
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 text-center bg-white border-t border-gray-100">
        <p className="text-[#1E293B] text-sm opacity-60 font-['Work_Sans',sans-serif]">
          © 2026 Web Hosting. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
