"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DeviceDistributionProps {
  data: { name: string; value: number }[]
  title: string
  description?: string
  className?: string
}

export function DeviceDistribution({ data, title, description, className }: DeviceDistributionProps) {
  // Colors for the different device types
  const colors = ["#1c1268", "#3730a3", "#6366f1", "#818cf8", "#a5b4fc"]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {data.map((item, index) => {
                // Calculate the start and end angles for the pie slice
                const total = data.reduce((sum, item) => sum + item.value, 0)
                const startAngle = data.slice(0, index).reduce((sum, item) => sum + (item.value / total) * 360, 0)
                const endAngle = startAngle + (item.value / total) * 360

                // Convert angles to radians and calculate coordinates
                const startRad = (startAngle - 90) * (Math.PI / 180)
                const endRad = (endAngle - 90) * (Math.PI / 180)

                const x1 = 50 + 40 * Math.cos(startRad)
                const y1 = 50 + 40 * Math.sin(startRad)
                const x2 = 50 + 40 * Math.cos(endRad)
                const y2 = 50 + 40 * Math.sin(endRad)

                // Determine if the arc should be drawn as a large arc
                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index % colors.length]}
                  />
                )
              })}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
