// src/pages/landingPage/Components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "64px",
        background: scrolled
          ? "rgba(7, 39, 67, 0.95)"
          : "rgba(7, 39, 67, 0.3)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(2, 145, 181, 0.2)"
          : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <div style={{
          width: "34px",
          height: "34px",
          background: "linear-gradient(135deg, #066886, #0291B5)",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(2, 145, 181, 0.4)",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: "18px",
          color: "#e2e8f0",
          letterSpacing: "0.01em",
        }}>
          Book<span style={{ color: "#0291B5" }}>Share</span>
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(226, 232, 240, 0.75)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "color 0.2s",
            fontFamily: "inherit",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(226, 232, 240, 0.75)")}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{
            background: "linear-gradient(135deg, #066886, #0291B5)",
            border: "none",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "9px 22px",
            borderRadius: "9px",
            boxShadow: "0 4px 16px rgba(2, 145, 181, 0.35)",
            transition: "all 0.2s",
            fontFamily: "inherit",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(2, 145, 181, 0.55)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(2, 145, 181, 0.35)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;