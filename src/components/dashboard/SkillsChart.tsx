"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Python", value: 85 },
  { name: "React", value: 78 },
  { name: "SQL", value: 65 },
  { name: "ML", value: 45 },
  { name: "Design", value: 30 },
]

export default function SkillsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: -10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 14, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip cursor={{ fill: 'hsl(var(--accent) / 0.3)' }} content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="hsl(var(--primary))" />
            </BarChart>
        </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
