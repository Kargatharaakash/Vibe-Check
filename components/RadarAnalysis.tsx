import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface Props {
  metrics: {
    innovation: number;
    walkability: number;
    safety: number;
    community: number;
    affluence: number;
  };
}

export const RadarAnalysis: React.FC<Props> = ({ metrics }) => {
  const data = [
    { subject: 'Innovation', A: metrics.innovation, fullMark: 100 },
    { subject: 'Walkability', A: metrics.walkability, fullMark: 100 },
    { subject: 'Safety', A: metrics.safety, fullMark: 100 },
    { subject: 'Community', A: metrics.community, fullMark: 100 },
    { subject: 'Affluence', A: metrics.affluence, fullMark: 100 },
  ];

  return (
    <div className="h-64 w-full font-mono text-[10px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#888', fontSize: 10 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Vibe Metrics"
            dataKey="A"
            stroke="#00cc66"
            strokeWidth={2}
            fill="#00cc66"
            fillOpacity={0.2}
          />
          <Tooltip 
             contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff', fontSize: '12px' }}
             itemStyle={{ color: '#00cc66' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};