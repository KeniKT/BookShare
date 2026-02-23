// src/pages/landingPage/Components/HeroSection.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        background: "linear-gradient(160deg, #072743 0%, #0d1f35 50%, #12213F 100%)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background decorative circles */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "480px",
        height: "480px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(2, 145, 181, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "5%",
        right: "5%",
        width: "360px",
        height: "360px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6, 104, 134, 0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(2, 145, 181, 0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(2, 145, 181, 0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(2, 145, 181, 0.1)",
        border: "1px solid rgba(2, 145, 181, 0.25)",
        borderRadius: "24px",
        padding: "6px 16px",
        marginBottom: "28px",
        fontSize: "12px",
        fontWeight: 600,
        color: "#0291B5",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0291B5", display: "inline-block" }} />
        Community Book Sharing
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(42px, 7vw, 80px)",
        fontWeight: 800,
        lineHeight: 1.1,
        color: "#e2e8f0",
        margin: "0 0 24px",
        maxWidth: "800px",
        letterSpacing: "-0.02em",
      }}>
        Share Books.{" "}
        <span style={{
          color: "transparent",
          backgroundImage: "linear-gradient(135deg, #066886, #0291B5)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}>
          Build
        </span>{" "}
        Community.
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "clamp(15px, 2vw, 18px)",
        color: "rgba(148, 163, 184, 0.85)",
        lineHeight: 1.7,
        maxWidth: "540px",
        margin: "0 0 44px",
        fontWeight: 400,
      }}>
        Your neighbourhood library, reimagined. Lend books you love, discover new reads, and connect with fellow readers in your community.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/signup")}
          style={{
            background: "linear-gradient(135deg, #066886, #0291B5)",
            border: "none",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "14px 32px",
            borderRadius: "11px",
            boxShadow: "0 6px 28px rgba(2, 145, 181, 0.4)",
            transition: "all 0.25s ease",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 36px rgba(2, 145, 181, 0.55)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(2, 145, 181, 0.4)";
          }}
        >
          Get Started Free
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <button
          onClick={() => navigate("/browse")}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(226, 232, 240, 0.9)",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            padding: "14px 32px",
            borderRadius: "11px",
            transition: "all 0.25s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(2, 145, 181, 0.4)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          Browse Books
        </button>
      </div>

      {/* Stats Row */}
      <div style={{
        display: "flex",
        gap: "48px",
        marginTop: "64px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {[
          { value: "2,400+", label: "Books Available" },
          { value: "850+", label: "Active Readers" },
          { value: "100%", label: "Free to Join" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "28px",
              fontWeight: 800,
              color: "#0291B5",
              lineHeight: 1,
              marginBottom: "4px",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(148, 163, 184, 0.6)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        opacity: 0.4,
        animation: "bounce 2s infinite",
      }}>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(6px); }
          }
        `}</style>
        <svg width="20" height="20" fill="none" stroke="rgba(2,145,181,0.8)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;