import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  data: Array<{ name: string; perc: number }>
  barLabels: Array<{ label: string; fill: string }>
}

export function CustomBarChart({ data, barLabels }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {barLabels.map((barLabel) => (
          <Bar dataKey={barLabel.label} fill={barLabel.fill} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
