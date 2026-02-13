"use client";

import { Player } from "@remotion/player";
import { MyComposition } from "../src/Composition";
import { useState } from "react";

// SVG Icons from Heroicons
const LightningIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
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
    <main className="min-h-screen bg-[#EEF2FF] font-['Fredoka',sans-serif]">
      {/* Hero Section */}
      <section className="py-20 px-5 text-center">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-[#1E1B4B] mb-6 leading-tight" style={{ 
          textShadow: '2px 2px 0px rgba(79, 70, 229, 0.1)'
        }}>
          Web Hosting That Just Works
        </h1>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#1E1B4B] max-w-2xl mx-auto mb-10 leading-relaxed opacity-90 font-['Nunito']">
          Fast, secure, and reliable hosting that makes your website perform at its best
        </p>

        <button
          className="bg-[#F97316] text-white text-lg font-semibold px-10 py-4 rounded-2xl border-none cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 font-['Fredoka']"
          style={{
            boxShadow: '4px 4px 0px rgba(249, 115, 22, 0.3), inset -2px -2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Start Free Trial 🚀
        </button>

        {/* Video Player */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl overflow-hidden" style={{
          boxShadow: '6px 6px 0px rgba(79, 70, 229, 0.2), inset -3px -3px 6px rgba(0,0,0,0.05)',
          border: '4px solid white',
        }}>
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
        <div className="bg-white rounded-3xl p-10 mb-10 cursor-pointer transition-all duration-200 hover:scale-[1.02]" style={{
          boxShadow: '4px 4px 0px rgba(79, 70, 229, 0.15), inset -2px -2px 4px rgba(0,0,0,0.05)',
          border: '4px solid white',
        }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#1E1B4B] mb-5" style={{
            textShadow: '1px 1px 0px rgba(79, 70, 229, 0.1)'
          }}>
            The Problem: Slow & Unreliable Hosting
          </h2>
          <p className="text-lg text-[#1E1B4B] leading-relaxed opacity-80 font-['Nunito']">
            Your website is slow, your host is unreliable, and support is hard to reach. Sound familiar? 
            Poor hosting affects your business, your users, and your peace of mind.
          </p>
        </div>

        {/* Chapter 2: The Journey */}
        <div className="bg-[#4F46E5] text-white rounded-3xl p-10 mb-10" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255,255,255,0.1)',
          border: '4px solid white',
        }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5" style={{
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)'
          }}>
            Your Journey to Better Hosting Starts Here
          </h2>
          <p className="text-lg leading-relaxed opacity-95 mb-8 font-['Nunito']">
            Switch to fast, secure, and reliable hosting. We've helped thousands of businesses 
            improve their online presence with enterprise-grade infrastructure.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.1)',
            }}>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-sm opacity-90 font-['Nunito']">Uptime SLA</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.1)',
            }}>
              <div className="text-5xl font-bold mb-2">5min</div>
              <div className="text-sm opacity-90 font-['Nunito']">Setup Time</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.1)',
            }}>
              <div className="text-5xl font-bold mb-2">10k+</div>
              <div className="text-sm opacity-90 font-['Nunito']">Active Sites</div>
            </div>
          </div>
        </div>

        {/* Chapter 3: The Solution */}
        <div className="bg-white rounded-3xl p-10 mb-10" style={{
          boxShadow: '4px 4px 0px rgba(79, 70, 229, 0.15), inset -2px -2px 4px rgba(0,0,0,0.05)',
          border: '4px solid white',
        }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#1E1B4B] mb-5" style={{
            textShadow: '1px 1px 0px rgba(79, 70, 229, 0.1)'
          }}>
            The Solution: Everything You Need
          </h2>
          <p className="text-lg text-[#1E1B4B] leading-relaxed mb-8 opacity-80 font-['Nunito']">
            Lightning-fast servers, rock-solid security, and expert support that actually cares. 
            All the tools you need to succeed online.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#EEF2FF] rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 border-4 border-white"
                style={{
                  boxShadow: '3px 3px 0px rgba(79, 70, 229, 0.15), inset -2px -2px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div className="text-[#4F46E5] mb-4 flex justify-center">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-[#1E1B4B] mb-3" style={{
                  textShadow: '1px 1px 0px rgba(79, 70, 229, 0.1)'
                }}>
                  {feature.title}
                </h3>
                <p className="text-base text-[#1E1B4B] leading-relaxed opacity-80 font-['Nunito']">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Images Section */}
        <div className="bg-[#4F46E5] text-white rounded-3xl p-10 mb-10" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255,255,255,0.1)',
          border: '4px solid white',
        }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-center mb-8" style={{
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)'
          }}>
            See Our Infrastructure
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] border-4 border-white/30" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.1)',
            }}>
              <img
                src="/images/server-infrastructure.png"
                alt="Server Infrastructure showing state-of-the-art data center"
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Powerful Infrastructure
              </h3>
              <p className="text-base opacity-90 leading-relaxed font-['Nunito']">
                State-of-the-art servers with 99.9% uptime
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] border-4 border-white/30" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.1)',
            }}>
              <img
                src="/images/cloud-dashboard.png"
                alt="Cloud Dashboard interface showing analytics and controls"
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Smart Dashboard
              </h3>
              <p className="text-base opacity-90 leading-relaxed font-['Nunito']">
                Real-time analytics and one-click deployments
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] border-4 border-white/30" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.1)',
            }}>
              <img
                src="/images/security-hosting.png"
                alt="Security features showing firewall and encryption"
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Super Secure
              </h3>
              <p className="text-base opacity-90 leading-relaxed font-['Nunito']">
                Advanced encryption and DDoS protection
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-3xl p-10" style={{
          boxShadow: '4px 4px 0px rgba(79, 70, 229, 0.15), inset -2px -2px 4px rgba(0,0,0,0.05)',
          border: '4px solid white',
        }}>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[#1E1B4B] mb-8 text-center" style={{
            textShadow: '1px 1px 0px rgba(79, 70, 229, 0.1)'
          }}>
            Image Gallery
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {[
              { src: '/images/server-infrastructure.png', alt: 'Server Infrastructure with high-performance hardware' },
              { src: '/images/cloud-dashboard.png', alt: 'Cloud Dashboard for managing your hosting' },
              { src: '/images/security-hosting.png', alt: 'Secure Hosting with advanced protection' },
              { src: '/images/cute-cat.png', alt: 'A cute cat to brighten your day' },
            ].map((image, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 border-4 border-white"
                style={{
                  boxShadow: '3px 3px 0px rgba(79, 70, 229, 0.15), inset -2px -2px 4px rgba(0,0,0,0.05)',
                }}
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
      <section className="py-20 px-5 bg-[#4F46E5] text-white" style={{
        boxShadow: 'inset 0 6px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-center mb-12" style={{
          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)'
        }}>
          What Our Customers Say
        </h2>

        <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-3xl p-10" style={{
          boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.1), inset 3px 3px 6px rgba(255,255,255,0.1)',
          border: '4px solid white',
        }}>
          {/* Testimonial Card */}
          <div className="flex flex-col items-center text-center">
            {/* Star Rating */}
            <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonials[activeTestimonial].rating} out of 5 stars`}>
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed mb-6 italic font-['Nunito']">
              "{testimonials[activeTestimonial].text}"
            </p>

            {/* Author */}
            <div className="mt-4">
              <div className="text-xl font-bold mb-1">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="text-base opacity-90 font-['Nunito']">
                {testimonials[activeTestimonial].role}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full border-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#4F46E5] ${
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
      </section>

      {/* Climax CTA Section */}
      <section className="py-24 px-5 text-center">
        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-[#1E1B4B] mb-6" style={{
          textShadow: '1px 1px 0px rgba(79, 70, 229, 0.1)'
        }}>
          Ready to Get Started?
        </h2>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#1E1B4B] max-w-2xl mx-auto mb-10 leading-relaxed opacity-90 font-['Nunito']">
          Join 10,000+ websites already enjoying fast, reliable hosting
        </p>
        <button
          className="bg-[#F97316] text-white text-xl font-semibold px-16 py-5 rounded-2xl border-none cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 font-['Fredoka']"
          style={{
            boxShadow: '6px 6px 0px rgba(249, 115, 22, 0.3), inset -3px -3px 6px rgba(0,0,0,0.1)',
          }}
        >
          Start Your Free Trial 🎉
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 text-center bg-white" style={{
        boxShadow: '0 -4px 0px rgba(79, 70, 229, 0.1)',
        borderTop: '4px solid #EEF2FF',
      }}>
        <p className="text-[#1E1B4B] text-sm opacity-60 font-['Nunito']">
          © 2026 Web Hosting. All rights reserved. 💙
        </p>
      </footer>
    </main>
  );
}
