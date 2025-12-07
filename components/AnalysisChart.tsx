import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface Props {
  data: { label: string; percentage: number; description: string }[];
}

export const AnalysisChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-64 w-full font-mono text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
           <XAxis type="number" hide />
           <YAxis 
            dataKey="label" 
            type="category" 
            width={100}
            tick={{fill: '#666', fontSize: 10}}
            axisLine={false}
            tickLine={false}
           />
           <Tooltip 
            cursor={{fill: '#1a1a1a'}}
            contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff' }}
           />
           <Bar dataKey="percentage" barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ff4d00' : '#333'} />
              ))}
           </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};