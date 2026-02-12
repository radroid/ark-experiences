import { v } from "convex/values";
import { internalMutation, action } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const create = internalMutation({
  args: {
    email: v.string(),
  },
  handler: async (
    ctx,
    { email },
  ): Promise<{ alreadySubscribed: boolean; id?: Id<"emailSignups"> }> => {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await ctx.db
      .query("emailSignups")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      return { alreadySubscribed: true };
    }

    const id = await ctx.db.insert("emailSignups", {
      email: normalizedEmail,
    });

    return { alreadySubscribed: false, id };
  },
});

export const subscribeAndNotify = action({
  args: {
    email: v.string(),
    userAgent: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { email, userAgent },
  ): Promise<{
    alreadySubscribed: boolean;
    id?: Id<"emailSignups">;
    emailSent?: boolean;
  }> => {
    const result: { alreadySubscribed: boolean; id?: Id<"emailSignups"> } =
      await ctx.runMutation(internal.emailSignups.create, { email });

    if (result.alreadySubscribed) {
      return { alreadySubscribed: true };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return { ...result, emailSent: false };
    }

    const normalizedEmail = email.toLowerCase().trim();
    const now = new Date();
    const timestamp = formatDate(now);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "ARK Scavenger Hunt <team@funwithark.ca>",
        to: ["team@funwithark.ca"],
        subject: `New signup: ${normalizedEmail}`,
        html: buildNotificationHtml(normalizedEmail, timestamp, userAgent),
      }),
    });

    if (!res.ok) {
      console.error("Email signup notification error:", await res.text());
    }

    return { ...result, emailSent: res.ok };
  },
});

function formatDate(date: Date): string {
  const day = date.toLocaleString("en-CA", {
    day: "numeric",
    timeZone: "America/Toronto",
  });
  const month = date.toLocaleString("en-CA", {
    month: "long",
    timeZone: "America/Toronto",
  });
  const year = date.toLocaleString("en-CA", {
    year: "numeric",
    timeZone: "America/Toronto",
  });
  return `${day} ${month}, ${year}`;
}

function parseUserAgent(ua: string): { browser: string; device: string } {
  let browser = "Unknown browser";
  let device = "Unknown device";

  // Browser detection
  if (ua.includes("Firefox/")) {
    const match = ua.match(/Firefox\/([\d.]+)/);
    browser = `Firefox ${match?.[1] ?? ""}`.trim();
  } else if (ua.includes("Edg/")) {
    const match = ua.match(/Edg\/([\d.]+)/);
    browser = `Microsoft Edge ${match?.[1] ?? ""}`.trim();
  } else if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    const match = ua.match(/Chrome\/([\d.]+)/);
    browser = `Chrome ${match?.[1] ?? ""}`.trim();
  } else if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
    const match = ua.match(/Version\/([\d.]+)/);
    browser = `Safari ${match?.[1] ?? ""}`.trim();
  }

  // OS / device detection
  if (ua.includes("iPhone")) {
    device = "iPhone (iOS)";
  } else if (ua.includes("iPad")) {
    device = "iPad (iPadOS)";
  } else if (ua.includes("Android")) {
    device = "Android device";
  } else if (ua.includes("Macintosh") || ua.includes("Mac OS X")) {
    device = "Mac";
  } else if (ua.includes("Windows")) {
    device = "Windows PC";
  } else if (ua.includes("Linux")) {
    device = "Linux";
  }

  return { browser, device };
}

export function buildNotificationHtml(
  email: string,
  timestamp: string,
  userAgent?: string,
): string {
  const deviceInfo = userAgent ? parseUserAgent(userAgent) : null;

  const deviceSection = deviceInfo
    ? `
                <!-- Divider -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <div style="height: 1px; background-color: #e8eaed;"></div>
                  </td>
                </tr>

                <!-- Browser -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #5f6368; margin: 0 0 6px 0;">
                      Browser
                    </p>
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 15px; color: #181818; margin: 0;">
                      ${deviceInfo.browser}
                    </p>
                  </td>
                </tr>

                <!-- Device -->
                <tr>
                  <td>
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #5f6368; margin: 0 0 6px 0;">
                      Device
                    </p>
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 15px; color: #181818; margin: 0;">
                      ${deviceInfo.device}
                    </p>
                  </td>
                </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Email Signup</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width: 520px; width: 100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img src="https://www.funwithark.ca/ark-logo.webp" alt="ARK" width="72" style="display: block; height: auto; border: 0;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">

              <!-- Accent Bar -->
              <div style="height: 4px; background-color: #0941B3; border-radius: 12px 12px 0 0;"></div>

              <!-- Content -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 36px 32px;">
                <tr>
                  <td>
                    <p style="font-family: 'Google Sans', 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 600; color: #181818; margin: 0 0 8px 0; line-height: 1.3;">
                      New email signup
                    </p>
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; color: #5f6368; margin: 0 0 28px 0; line-height: 1.5;">
                      Someone expressed interest on the ARK website.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <div style="height: 1px; background-color: #e8eaed;"></div>
                  </td>
                </tr>

                <!-- Email Detail -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #0941B3; margin: 0 0 6px 0;">
                      Email Address
                    </p>
                    <a href="mailto:${email}" style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 16px; color: #181818; text-decoration: none; font-weight: 500;">
                      ${email}
                    </a>
                  </td>
                </tr>

                <!-- Timestamp Detail -->
                <tr>
                  <td style="padding-bottom: ${deviceInfo ? "0" : "28px"};">
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #0941B3; margin: 0 0 6px 0;">
                      Signed Up
                    </p>
                    <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 16px; color: #181818; margin: 0; font-weight: 400;">
                      ${timestamp}
                    </p>
                  </td>
                </tr>
                ${deviceSection}

                <!-- Spacer before button -->
                <tr>
                  <td style="padding-top: 28px;">
                    <a href="mailto:${email}?subject=Thanks%20for%20your%20interest%20in%20ARK!" style="display: inline-block; font-family: 'Google Sans', 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; background-color: #0941B3; padding: 12px 28px; border-radius: 8px; text-decoration: none; letter-spacing: 0.2px;">
                      Reply to ${email}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 28px;">
              <p style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 12px; color: #9aa0a6; margin: 0; line-height: 1.6;">
                Captured via <span style="color: #5f6368;">funwithark.ca</span> email signup
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
