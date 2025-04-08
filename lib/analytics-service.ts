// This is a mock service for analytics data
// In a real application, this would connect to a backend API

export interface AnalyticsData {
  totalVisitors: number
  activeUsers: number
  responseRate: number
  averageTime: string
  bounceRate: number
  topCountries: { name: string; value: number }[]
  deviceTypes: { name: string; value: number }[]
  dailyVisitors: { date: string; visitors: number }[]
  responses: { date: string; count: number }[]
  recentResponses: {
    id: number
    name: string
    email: string
    message: string
    time: string
  }[]
}

export async function fetchAnalyticsData(timeRange = "7d"): Promise<AnalyticsData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data - in a real app, this would come from your backend
  return {
    totalVisitors: 12847,
    activeUsers: 342,
    responseRate: 68.4,
    averageTime: "3m 24s",
    bounceRate: 32.1,
    topCountries: [
      { name: "United States", value: 42.3 },
      { name: "Egypt", value: 18.7 },
      { name: "United Kingdom", value: 9.2 },
      { name: "Germany", value: 7.5 },
      { name: "Canada", value: 5.8 },
    ],
    deviceTypes: [
      { name: "Mobile", value: 64 },
      { name: "Desktop", value: 28 },
      { name: "Tablet", value: 8 },
    ],
    dailyVisitors: [
      { date: "Mon", visitors: 1245 },
      { date: "Tue", visitors: 1380 },
      { date: "Wed", visitors: 1520 },
      { date: "Thu", visitors: 1350 },
      { date: "Fri", visitors: 1650 },
      { date: "Sat", visitors: 1420 },
      { date: "Sun", visitors: 1280 },
    ],
    responses: [
      { date: "Mon", count: 87 },
      { date: "Tue", count: 93 },
      { date: "Wed", count: 105 },
      { date: "Thu", count: 91 },
      { date: "Fri", count: 112 },
      { date: "Sat", count: 97 },
      { date: "Sun", count: 85 },
    ],
    recentResponses: [
      {
        id: 1,
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        message: "Great website! I'd like to discuss a potential collaboration.",
        time: "2 minutes ago",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        message: "I'm interested in your health informatics projects. Can we schedule a call?",
        time: "15 minutes ago",
      },
      {
        id: 3,
        name: "Mohamed Ali",
        email: "mali@example.com",
        message: "Your portfolio is impressive. I have a project that might interest you.",
        time: "42 minutes ago",
      },
      {
        id: 4,
        name: "Jessica Williams",
        email: "jwilliams@example.com",
        message: "I'd like to learn more about your data analysis services.",
        time: "1 hour ago",
      },
      {
        id: 5,
        name: "Omar Hassan",
        email: "ohassan@example.com",
        message: "Are you available for consulting work? I need help with a healthcare data project.",
        time: "3 hours ago",
      },
    ],
  }
}

export async function fetchVisitorsByCountry(): Promise<{ country: string; visitors: number }[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    { country: "United States", visitors: 5432 },
    { country: "Egypt", visitors: 2403 },
    { country: "United Kingdom", visitors: 1182 },
    { country: "Germany", visitors: 963 },
    { country: "Canada", visitors: 745 },
    { country: "France", visitors: 612 },
    { country: "Australia", visitors: 589 },
    { country: "Japan", visitors: 421 },
    { country: "Brazil", visitors: 387 },
    { country: "India", visitors: 342 },
  ]
}

export async function fetchResponseMetrics(): Promise<{
  totalResponses: number
  responseRate: number
  averageResponseTime: string
}> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    totalResponses: 670,
    responseRate: 68.4,
    averageResponseTime: "3.2 hours",
  }
}
