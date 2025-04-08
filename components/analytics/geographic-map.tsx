"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GeographicMapProps {
  data: { name: string; value: number }[]
  title: string
  description?: string
  className?: string
}

export function GeographicMap({ data, title, description, className }: GeographicMapProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((country, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 flex-shrink-0">
                <span className="text-sm">{country.name}</span>
              </div>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${country.value}%` }} />
              </div>
              <div className="w-12 text-right">
                <span className="text-sm font-medium">{country.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
