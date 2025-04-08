"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, TrendingUp, RefreshCw, Download, Filter, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data for analytics
const analyticsData = {
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

export default function AnalyticsDashboard() {
  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // For demo purposes, set to true

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // Toggle language
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Check for dark mode preference on component mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }
  }, [])

  // Simple bar chart component
  const BarChart = ({ data, maxHeight = 150 }: { data: any[]; maxHeight: number }) => {
    const maxValue = Math.max(...data.map((item) => item.visitors || item.count))

    return (
      <div className="flex items-end h-[150px] gap-2 mt-4">
        {data.map((item, index) => {
          const value = item.visitors || item.count
          const height = (value / maxValue) * maxHeight

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-primary/80 hover:bg-primary transition-colors rounded-t-sm"
                style={{ height: `${height}px` }}
              ></div>
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">{item.date}</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Simple pie chart component
  const PieChart = ({ data }: { data: any[] }) => {
    let cumulativePercentage = 0

    return (
      <div className="relative w-[150px] h-[150px] mx-auto mt-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const startAngle = cumulativePercentage * 3.6
            cumulativePercentage += item.value
            const endAngle = cumulativePercentage * 3.6

            const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180)
            const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180)
            const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180)
            const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180)

            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

            const colors = ["#1c1268", "#3730a3", "#6366f1", "#818cf8", "#a5b4fc"]

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="0.5"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  // If not authenticated, redirect to login (in a real app)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>{isEnglish ? "Authentication Required" : "مطلوب المصادقة"}</CardTitle>
            <CardDescription>
              {isEnglish
                ? "You need to be logged in to view the analytics dashboard."
                : "تحتاج إلى تسجيل الدخول لعرض لوحة التحليلات."}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">{isEnglish ? "Login" : "تسجيل الدخول"}</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">
                {isEnglish ? "Analytics Dashboard" : "لوحة التحليلات"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading} className="gap-2">
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                {isEnglish ? "Refresh" : "تحديث"}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                {isEnglish ? "عربي" : "English"}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Dashboard Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {isEnglish ? "Site Analytics" : "تحليلات الموقع"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {isEnglish ? "Track your website performance and visitor engagement" : "تتبع أداء موقعك ومشاركة الزوار"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={isEnglish ? "Time Range" : "النطاق الزمني"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">{isEnglish ? "Last 24 Hours" : "آخر 24 ساعة"}</SelectItem>
                  <SelectItem value="7d">{isEnglish ? "Last 7 Days" : "آخر 7 أيام"}</SelectItem>
                  <SelectItem value="30d">{isEnglish ? "Last 30 Days" : "آخر 30 يوم"}</SelectItem>
                  <SelectItem value="90d">{isEnglish ? "Last 90 Days" : "آخر 90 يوم"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {isEnglish ? "Filters" : "تصفية"}
            </Button>

            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {isEnglish ? "Export" : "تصدير"}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{isEnglish ? "Total Visitors" : "إجمالي الزوار"}</CardDescription>
              <CardTitle className="text-3xl flex items-center">
                {analyticsData.totalVisitors.toLocaleString()}
                <Badge variant="outline" className="ml-2 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  8.2%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "vs previous period" : "مقارنة بالفترة السابقة"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{isEnglish ? "Active Users" : "المستخدمون النشطون"}</CardDescription>
              <CardTitle className="text-3xl">{analyticsData.activeUsers}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Currently online" : "متصل حاليًا"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{isEnglish ? "Response Rate" : "معدل الاستجابة"}</CardDescription>
              <CardTitle className="text-3xl">{analyticsData.responseRate}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Form submissions / visitors" : "تقديمات النموذج / الزوار"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{isEnglish ? "Avg. Session Time" : "متوسط وقت الجلسة"}</CardDescription>
              <CardTitle className="text-3xl">{analyticsData.averageTime}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Time spent on site" : "الوقت المستغرق على الموقع"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Visitor Trends */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isEnglish ? "Visitor Trends" : "اتجاهات الزوار"}</CardTitle>
              <CardDescription>
                {isEnglish ? "Daily visitor count for the past week" : "عدد الزوار اليومي للأسبوع الماضي"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={analyticsData.dailyVisitors} maxHeight={150} />
            </CardContent>
          </Card>

          {/* Device Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>{isEnglish ? "Device Types" : "أنواع الأجهزة"}</CardTitle>
              <CardDescription>{isEnglish ? "Visitors by device category" : "الزوار حسب فئة الجهاز"}</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart data={analyticsData.deviceTypes} />
              <div className="mt-4 space-y-2">
                {analyticsData.deviceTypes.map((device, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: ["#1c1268", "#3730a3", "#6366f1"][index] }}
                      ></div>
                      <span className="text-sm">{device.name}</span>
                    </div>
                    <span className="text-sm font-medium">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Responses and Geographic Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Response Trends */}
          <Card>
            <CardHeader>
              <CardTitle>{isEnglish ? "Response Trends" : "اتجاهات الاستجابة"}</CardTitle>
              <CardDescription>{isEnglish ? "Daily form submissions" : "تقديمات النموذج اليومية"}</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={analyticsData.responses} maxHeight={150} />
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{isEnglish ? "Geographic Distribution" : "التوزيع الجغرافي"}</CardTitle>
              <CardDescription>
                {isEnglish ? "Top countries by visitor count" : "أهم البلدان حسب عدد الزوار"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 flex-shrink-0">
                      <span className="text-sm">{country.name}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${country.value}%` }}></div>
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-sm font-medium">{country.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Responses */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{isEnglish ? "Recent Responses" : "الاستجابات الأخيرة"}</CardTitle>
                <CardDescription>
                  {isEnglish ? "Latest form submissions from visitors" : "أحدث تقديمات النموذج من الزوار"}
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input placeholder={isEnglish ? "Search responses..." : "البحث في الاستجابات..."} className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      {isEnglish ? "Name" : "الاسم"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      {isEnglish ? "Email" : "البريد الإلكتروني"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      {isEnglish ? "Message" : "الرسالة"}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      {isEnglish ? "Time" : "الوقت"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.recentResponses.map((response) => (
                    <tr
                      key={response.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4">{response.name}</td>
                      <td className="py-3 px-4">{response.email}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{response.message}</td>
                      <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{response.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">{isEnglish ? "Previous" : "السابق"}</Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">{isEnglish ? "Page 1 of 3" : "صفحة 1 من 3"}</div>
            <Button>{isEnglish ? "Next" : "التالي"}</Button>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isEnglish
                ? "© 2024 Dr. Hout Analytics Dashboard. All rights reserved."
                : "© 2024 لوحة تحليلات د. حوت. جميع الحقوق محفوظة."}
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Privacy Policy" : "سياسة الخصوصية"}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Terms of Service" : "شروط الخدمة"}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Help & Support" : "المساعدة والدعم"}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
