import Link from "next/link";
import { buildNotificationHtml } from "../../../convex/emailSignups";

export default function EmailPreviewPage() {
  const sampleEmail = "jane.doe@acmecorp.com";
  const sampleTimestamp = "12 February, 2026";
  const sampleUserAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

  const html = buildNotificationHtml(
    sampleEmail,
    sampleTimestamp,
    sampleUserAgent,
  );

  return (
    <main className="blog-page" style={{ height: "auto", overflow: "visible" }}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f1f3f4",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily:
                  "'Google Sans', 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: "#181818",
                margin: 0,
              }}
            >
              Email Preview
            </h1>
            <p
              style={{
                fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: 13,
                color: "#5f6368",
                margin: "4px 0 0",
              }}
            >
              New signup notification &middot; team@funwithark.ca
            </p>
          </div>
          <Link
            href="/"
            style={{
              fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#0941B3",
              textDecoration: "none",
            }}
          >
            &larr; Back to site
          </Link>
        </div>

        {/* Email Frame */}
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Simulated email header bar */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e8eaed",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#0941B3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              A
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#181818",
                  margin: 0,
                }}
              >
                ARK Scavenger Hunt
                <span
                  style={{
                    fontWeight: 400,
                    color: "#5f6368",
                    marginLeft: 6,
                    fontSize: 12,
                  }}
                >
                  &lt;team@funwithark.ca&gt;
                </span>
              </p>
              <p
                style={{
                  fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
                  fontSize: 12,
                  color: "#5f6368",
                  margin: "2px 0 0",
                }}
              >
                to team@funwithark.ca
              </p>
            </div>
          </div>

          {/* Email body rendered via iframe */}
          <div style={{ padding: "16px 24px 24px" }}>
            <iframe
              srcDoc={html}
              title="Email preview"
              style={{
                width: "100%",
                height: 720,
                border: "none",
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
