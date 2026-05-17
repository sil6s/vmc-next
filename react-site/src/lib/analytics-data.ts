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
  metrics: [],
  traffic: [],
  ctaClicks: [],
  topPages: [],
  sources: [],
  devices: [],
  health: {
    uptime: "No data",
    responseTime: "No data",
    seoScore: "No data",
    deployment: "No data"
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
