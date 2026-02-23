// src/pages/landingPage/Components/HowItWorks.tsx

const features = [
  {
    title: "Discover & Borrow",
    description: "Browse a vast collection of books shared by your local community and borrow with a simple request.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    step: "01",
  },
  {
    title: "Share Your Shelf",
    description: "List your own books, manage rental requests, and give your books a new life with readers who'll love them.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    step: "02",
  },
  {
    title: "Connect with Readers",
    description: "Join a community of book lovers, see what others are reading, and share your thoughts and recommendations.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #12213F 0%, #0d1f35 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(2, 145, 181, 0.3), transparent)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(2, 145, 181, 0.08)",
            border: "1px solid rgba(2, 145, 181, 0.2)",
            borderRadius: "24px",
            padding: "5px 14px",
            marginBottom: "20px",
            fontSize: "11px",
            fontWeight: 700,
            color: "rgba(2, 145, 181, 0.8)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Simple Process
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: "#e2e8f0",
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}>
            How It <span style={{ color: "#0291B5" }}>Works</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(148, 163, 184, 0.7)",
            fontSize: "16px",
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Three simple steps to start sharing and discovering books in your community.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {features.map((f, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, rgba(17, 57, 94, 0.5), rgba(7, 39, 67, 0.7))",
                border: "1px solid rgba(2, 145, 181, 0.15)",
                borderRadius: "18px",
                padding: "36px 30px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(2, 145, 181, 0.4)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(2, 145, 181, 0.15)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(2, 145, 181, 0.15)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Step number watermark */}
              <div style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                fontFamily: "'Playfair Display', serif",
                fontSize: "64px",
                fontWeight: 800,
                color: "rgba(2, 145, 181, 0.06)",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none" as const,
              }}>
                {f.step}
              </div>

              {/* Icon */}
              <div style={{
                width: "58px",
                height: "58px",
                background: "linear-gradient(135deg, rgba(6, 104, 134, 0.3), rgba(2, 145, 181, 0.15))",
                border: "1px solid rgba(2, 145, 181, 0.25)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0291B5",
                marginBottom: "24px",
              }}>
                {f.icon}
              </div>

              {/* Step tag */}
              <div style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#0291B5",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "10px",
              }}>
                Step {f.step}
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "21px",
                fontWeight: 700,
                color: "#e2e8f0",
                margin: "0 0 12px",
                letterSpacing: "-0.01em",
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(148, 163, 184, 0.75)",
                fontSize: "14px",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(2, 145, 181, 0.3), transparent)",
      }} />
    </section>
  );
};

export default HowItWorks;