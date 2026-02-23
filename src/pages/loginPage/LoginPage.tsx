// src/pages/loginPage/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const API_LOGIN_URL = "https://bookshare-api.onrender.com/api/user/login/";

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access) {
          localStorage.setItem("authToken", data.access);
          navigate("/dashboard");
        } else {
          setError("Login successful, but no authentication token received.");
        }
      } else {
        const errorData = await response.json();
        if (errorData.detail) {
          setError(errorData.detail);
        } else if (errorData.non_field_errors) {
          setError(errorData.non_field_errors.join(", "));
        } else {
          setError(Object.values(errorData).flat().join(", ") || "Login failed. Please check your credentials.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #072743 0%, #0d1f35 50%, #12213F 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow orbs */}
      <div style={{
        position: "absolute", top: "15%", left: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(2, 145, 181, 0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "8%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6, 104, 134, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(2, 145, 181, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(2, 145, 181, 0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "linear-gradient(135deg, rgba(17, 57, 94, 0.6), rgba(7, 39, 67, 0.8))",
        border: "1px solid rgba(2, 145, 181, 0.2)",
        borderRadius: "20px",
        padding: "40px 36px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.4)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo mark */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div style={{
            width: "48px", height: "48px",
            background: "linear-gradient(135deg, #066886, #0291B5)",
            borderRadius: "13px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 20px rgba(2, 145, 181, 0.4)",
          }}>
            <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "26px", fontWeight: 800,
          color: "#e2e8f0", textAlign: "center",
          margin: "0 0 8px", letterSpacing: "-0.02em",
        }}>
          Welcome back
        </h2>
        <p style={{
          color: "rgba(148, 163, 184, 0.7)", textAlign: "center",
          fontSize: "14px", margin: "0 0 32px", lineHeight: 1.5,
        }}>
          Sign in to your BookShare account
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{
              display: "block", fontSize: "12px", fontWeight: 600,
              color: "rgba(148, 163, 184, 0.8)", marginBottom: "8px",
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", boxSizing: "border-box",
                background: "rgba(7, 39, 67, 0.6)",
                border: "1px solid rgba(2, 145, 181, 0.2)",
                borderRadius: "10px", padding: "12px 14px",
                color: "#e2e8f0", fontSize: "14px",
                outline: "none", transition: "border-color 0.2s",
                fontFamily: "inherit",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(2, 145, 181, 0.6)")}
              onBlur={e => (e.target.style.borderColor = "rgba(2, 145, 181, 0.2)")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block", fontSize: "12px", fontWeight: 600,
              color: "rgba(148, 163, 184, 0.8)", marginBottom: "8px",
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(7, 39, 67, 0.6)",
                  border: "1px solid rgba(2, 145, 181, 0.2)",
                  borderRadius: "10px", padding: "12px 42px 12px 14px",
                  color: "#e2e8f0", fontSize: "14px",
                  outline: "none", transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(2, 145, 181, 0.6)")}
                onBlur={e => (e.target.style.borderColor = "rgba(2, 145, 181, 0.2)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "12px", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer",
                  color: "rgba(148, 163, 184, 0.5)", padding: "2px",
                }}
              >
                {showPassword ? (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.3)",
              borderRadius: "10px", padding: "12px 14px",
              color: "#F87171", fontSize: "13px", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "rgba(6, 104, 134, 0.5)" : "linear-gradient(135deg, #066886, #0291B5)",
              border: "none", color: "#fff",
              fontSize: "15px", fontWeight: 700,
              padding: "13px 0", borderRadius: "11px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 6px 24px rgba(2, 145, 181, 0.4)",
              transition: "all 0.2s", fontFamily: "inherit",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(2, 145, 181, 0.55)";
            }}
            onMouseLeave={e => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(2, 145, 181, 0.4)";
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          height: "1px", margin: "24px 0",
          background: "linear-gradient(90deg, transparent, rgba(2, 145, 181, 0.2), transparent)",
        }} />

        {/* Footer links */}
        <p style={{ textAlign: "center", color: "rgba(148, 163, 184, 0.6)", fontSize: "13px", margin: "0 0 10px" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#0291B5", textDecoration: "none", fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
        <p style={{ textAlign: "center", color: "rgba(148, 163, 184, 0.6)", fontSize: "13px", margin: 0 }}>
          Want to explore first?{" "}
          <Link to="/browse" style={{ color: "#0291B5", textDecoration: "none", fontWeight: 600 }}>
            Browse books
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;