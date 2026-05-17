export type AnalyticsMetric = {
  label: string;
  value: string;
  change: string;
};

export type AnalyticsOverview = {
  rangeLabel: string;
  metrics: AnalyticsMetric[];
  traffic: { label: string; visits: number }[];
  ctaClicks: { label: string; value: number }[];
  topPages: { path: string; views: number }[];
  sources: { source: string; visits: number }[];
  devices: { device: string; percent: number }[];
  health: {
    uptime: string;
    responseTime: string;
    seoScore: string;
    deployment: string;
  };
  usesMockData: boolean;
  shareUrl: string;
};

const fallbackAnalytics: AnalyticsOverview = {
  rangeLabel: "Last 30 days",
  metrics: [
    { label: "Website Visits", value: "18,742", change: "+18.6%" },
    { label: "Appointment Clicks", value: "642", change: "+22.1%" },
    { label: "Chat Conversations", value: "186", change: "+8.3%" },
    { label: "Portal Clicks", value: "512", change: "+15.2%" },
    { label: "Pharmacy Clicks", value: "298", change: "+12.7%" },
    { label: "Form Submissions", value: "73", change: "+9.0%" }
  ],
  traffic: [
    { label: "May 1", visits: 520 },
    { label: "May 6", visits: 820 },
    { label: "May 11", visits: 760 },
    { label: "May 16", visits: 1420 },
    { label: "May 21", visits: 960 },
    { label: "May 26", visits: 1380 },
    { label: "May 31", visits: 1210 }
  ],
  ctaClicks: [
    { label: "Book Appointment", value: 642 },
    { label: "Patient Portal", value: 512 },
    { label: "Online Pharmacy", value: 298 },
    { label: "New Patient Form", value: 73 }
  ],
  topPages: [
    { path: "/", views: 8240 },
    { path: "/services/", views: 3110 },
    { path: "/locations/", views: 2260 },
    { path: "/contact/", views: 1840 }
  ],
  sources: [
    { source: "Google", visits: 9820 },
    { source: "Direct", visits: 4120 },
    { source: "Facebook", visits: 960 },
    { source: "Referrals", visits: 720 }
  ],
  devices: [
    { device: "Mobile", percent: 68 },
    { device: "Desktop", percent: 26 },
    { device: "Tablet", percent: 6 }
  ],
  health: {
    uptime: "99.98%",
    responseTime: "245 ms",
    seoScore: "92",
    deployment: "2h ago"
  },
  usesMockData: true,
  shareUrl: process.env.UMAMI_SHARE_URL || ""
};

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const apiKey = process.env.UMAMI_API_KEY;
  const endpoint = process.env.UMAMI_API_CLIENT_ENDPOINT || "https://cloud.umami.is/api";
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "0813c9dd-6780-4f8b-b077-d436f710d058";

  if (!apiKey) {
    return fallbackAnalytics;
  }

  try {
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000;
    const response = await fetch(`${endpoint}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return fallbackAnalytics;
    }

    const stats = (await response.json()) as {
      pageviews?: { value?: number; change?: number };
      visitors?: { value?: number; change?: number };
      visits?: { value?: number; change?: number };
    };

    return {
      ...fallbackAnalytics,
      metrics: [
        {
          label: "Website Visits",
          value: String(stats.visits?.value ?? stats.pageviews?.value ?? fallbackAnalytics.metrics[0].value),
          change: `${Number(stats.visits?.change ?? stats.pageviews?.change ?? 0).toFixed(1)}%`
        },
        ...fallbackAnalytics.metrics.slice(1)
      ],
      usesMockData: false
    };
  } catch {
    return fallbackAnalytics;
  }
}
