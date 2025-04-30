import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface DataCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
  className?: string
}

export function DataCard({ title, value, description, trend, icon, className }: DataCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <Badge
              variant={trend.direction === "up" ? "success" : trend.direction === "down" ? "destructive" : "outline"}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : trend.direction === "down" ? (
                <TrendingDown className="h-3 w-3 mr-1" />
              ) : null}
              {trend.value}%
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
