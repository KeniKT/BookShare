// src/pages/landingPage/Components/FeaturedBooks.tsx
import React from "react";

interface Book {
  title: string;
  author: string;
  image?: string;
  genre?: string;
}

const FeaturedBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  // Placeholder colors for books without images
  const placeholderColors = [
    { bg: "linear-gradient(160deg, #066886, #072743)", accent: "#0291B5" },
    { bg: "linear-gradient(160deg, #11395E, #0d1f35)", accent: "#0291B5" },
    { bg: "linear-gradient(160deg, #12213F, #066886)", accent: "#0291B5" },
    { bg: "linear-gradient(160deg, #0d1f35, #11395E)", accent: "#0291B5" },
  ];

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #0d1f35 0%, #072743 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "52px",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(2, 145, 181, 0.08)",
              border: "1px solid rgba(2, 145, 181, 0.2)",
              borderRadius: "24px",
              padding: "5px 14px",
              marginBottom: "16px",
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(2, 145, 181, 0.8)",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Curated Picks
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              color: "#e2e8f0",
              margin: 0,
              letterSpacing: "-0.02em",
            }}>
              Featured <span style={{ color: "#0291B5" }}>Books</span>
            </h2>
          </div>
          <a
            href="/browse"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#0291B5",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              borderBottom: "1px solid rgba(2, 145, 181, 0.3)",
              paddingBottom: "2px",
              transition: "border-color 0.2s",
            }}
          >
            View all books
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Book Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
        }}>
          {(books.length > 0 ? books : Array(4).fill(null)).slice(0, 4).map((book, index) => {
            const colors = placeholderColors[index % placeholderColors.length];
            return (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg, rgba(17, 57, 94, 0.4), rgba(7, 39, 67, 0.6))",
                  border: "1px solid rgba(2, 145, 181, 0.15)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(2, 145, 181, 0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(2, 145, 181, 0.15)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Book Cover */}
                <div style={{
                  height: "260px",
                  background: book?.image ? undefined : colors.bg,
                  overflow: "hidden",
                  position: "relative",
                }}>
                  {book?.image ? (
                    <img
                      src={book.image}
                      alt={book?.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                    }}>
                      <svg width="40" height="40" fill="none" stroke={colors.accent} viewBox="0 0 24 24" style={{ opacity: 0.5 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "80px",
                    background: "linear-gradient(to top, rgba(7, 39, 67, 0.8), transparent)",
                  }} />

                  {/* Available badge */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(6, 104, 134, 0.9)",
                    border: "1px solid rgba(2, 145, 181, 0.4)",
                    borderRadius: "20px",
                    padding: "3px 10px",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#0291B5",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                    fontFamily: "'DM Sans', sans-serif",
                    backdropFilter: "blur(8px)",
                  }}>
                    Available
                  </div>
                </div>

                {/* Book Info */}
                <div style={{ padding: "16px 18px 20px" }}>
                  <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#e2e8f0",
                    marginBottom: "5px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {book?.title || "Book Title"}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(148, 163, 184, 0.65)",
                    marginBottom: "16px",
                  }}>
                    {book?.author || "Author Name"}
                  </div>
                  <button style={{
                    width: "100%",
                    background: "rgba(2, 145, 181, 0.1)",
                    border: "1px solid rgba(2, 145, 181, 0.25)",
                    borderRadius: "8px",
                    color: "#0291B5",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "8px 0",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.03em",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(2, 145, 181, 0.2)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(2, 145, 181, 0.1)";
                    }}
                  >
                    Request to Borrow
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;