// src/pages/landingPage/Components/Footer.tsx

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#072743",
        borderTop: "1px solid rgba(2, 145, 181, 0.15)",
        padding: "48px 40px 32px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
          marginBottom: "40px",
        }}>
          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #066886, #0291B5)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#e2e8f0",
              }}>
                Book<span style={{ color: "#0291B5" }}>Share</span>
              </span>
            </div>
            <p style={{
              color: "rgba(148, 163, 184, 0.6)",
              fontSize: "13px",
              lineHeight: 1.7,
              margin: 0,
            }}>
              A community-driven platform for sharing books and connecting readers.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
            {[
              {
                heading: "Platform",
                links: ["Browse Books", "How It Works", "For Lenders", "For Readers"],
              },
              {
                heading: "Company",
                links: ["About Us", "Blog", "Careers", "Contact"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <div style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "rgba(2, 145, 181, 0.6)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}>
                  {col.heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        color: "rgba(148, 163, 184, 0.65)",
                        fontSize: "13px",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#0291B5")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(148, 163, 184, 0.65)")}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(2, 145, 181, 0.2), transparent)",
          marginBottom: "24px",
        }} />

        {/* Bottom row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{
            color: "rgba(148, 163, 184, 0.4)",
            fontSize: "12px",
            margin: 0,
          }}>
            © {year} BookShare. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "rgba(148, 163, 184, 0.4)",
                  fontSize: "12px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(2, 145, 181, 0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(148, 163, 184, 0.4)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;