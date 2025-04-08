"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface VisitorChartProps {
  data: { date: string; visitors: number }[]
  title: string
  description?: string
  className?: string
}

export function VisitorChart({ data, title, description, className }: VisitorChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max value for scaling
    const maxVisitors = Math.max(...data.map((d) => d.visitors))

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw bars
    const barWidth = (chartWidth / data.length) * 0.8
    const barSpacing = (chartWidth / data.length) * 0.2

    data.forEach((item, index) => {
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2
      const barHeight = (item.visitors / maxVisitors) * chartHeight
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = "#1c1268"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw date label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.date, x + barWidth / 2, height - padding + 15)
    })

    // Draw y-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxVisitors * i) / 5)
      const y = height - padding - (chartHeight * i) / 5
      ctx.fillText(value.toString(), padding - 5, y + 3)
    }
  }, [data])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} width={600} height={300} className="w-full h-auto" />
      </CardContent>
    </Card>
  )
}
