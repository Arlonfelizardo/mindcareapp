'use client';

import { MoodEntry, moodConfig } from '@/lib/moodData';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface MoodChartProps {
  entries: MoodEntry[];
}

const moodToValue = {
  pessimo: 1,
  ruim: 2,
  neutro: 3,
  bom: 4,
  excelente: 5
};

export default function MoodChart({ entries }: MoodChartProps) {
  const chartData = entries.map(entry => ({
    date: entry.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    value: moodToValue[entry.mood],
    mood: entry.mood,
    emoji: moodConfig[entry.mood].emoji
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
          <p className="text-sm font-medium">{data.date}</p>
          <p className="text-lg">{data.emoji} {moodConfig[data.mood].label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Seu Progresso Emocional
        </h2>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="#888888"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 6]}
              ticks={[1, 2, 3, 4, 5]}
              stroke="#888888"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#a855f7" 
              strokeWidth={3}
              fill="url(#colorMood)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {Object.entries(moodConfig).map(([mood, config]) => (
          <div key={mood} className="text-center">
            <span className="text-2xl">{config.emoji}</span>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {config.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
