
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2020', value: 40 },
  { year: '2021', value: 45 },
  { year: '2022', value: 55 },
  { year: '2023', value: 70 },
  { year: '2024', value: 88 }, // Current
  { year: '2025', value: 92 }, // Projected
  { year: '2026', value: 96 },
];

export const TrendChart: React.FC = () => {
  return (
    <div className="h-40 w-full font-mono text-[10px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ff4d00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="year" hide />
          <YAxis hide domain={[0, 100]} />
          <Tooltip 
             contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff', fontSize: '10px' }}
             itemStyle={{ color: '#ff4d00' }}
             labelStyle={{ display: 'none' }}
             formatter={(value: number) => [`${value}/100`, 'Gentrification Index']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#ff4d00" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
