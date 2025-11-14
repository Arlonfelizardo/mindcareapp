'use client';

import { useState } from 'react';
import { MoodType, moodConfig, motivationalMessages } from '@/lib/moodData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp } from 'lucide-react';

interface MoodTrackerProps {
  onMoodSelect: (mood: MoodType) => void;
  currentMood?: MoodType;
}

export default function MoodTracker({ onMoodSelect, currentMood }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);
  const [showMessage, setShowMessage] = useState(false);

  const handleMoodClick = (mood: MoodType) => {
    setSelectedMood(mood);
    setShowMessage(true);
    onMoodSelect(mood);
    
    setTimeout(() => setShowMessage(false), 3000);
  };

  const getMessage = () => {
    if (!selectedMood) return '';
    const messages = motivationalMessages[selectedMood];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <Card className="p-6 sm:p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-purple-200 dark:border-purple-800 shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                Como você está se sentindo?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Registre seu humor para recomendações personalizadas
              </p>
            </div>
          </div>
          {selectedMood && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Registrado
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {(Object.keys(moodConfig) as MoodType[]).map((mood) => {
            const config = moodConfig[mood];
            const isSelected = selectedMood === mood;
            
            return (
              <button
                key={mood}
                onClick={() => handleMoodClick(mood)}
                className={`
                  group relative flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl
                  transition-all duration-300 transform
                  ${isSelected 
                    ? 'scale-110 shadow-2xl ring-4 ring-purple-400 dark:ring-purple-600 bg-white dark:bg-gray-700' 
                    : 'hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-4xl sm:text-5xl transition-transform group-hover:scale-110">
                  {config.emoji}
                </span>
                <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                  isSelected 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {config.label}
                </span>
              </button>
            );
          })}
        </div>

        {showMessage && selectedMood && (
          <div className={`
            p-5 rounded-2xl bg-gradient-to-r ${moodConfig[selectedMood].color}
            text-white font-medium text-center shadow-xl
            opacity-0 translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards]
          `}>
            <p className="text-base sm:text-lg">{getMessage()}</p>
          </div>
        )}

        {!selectedMood && (
          <div className="text-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              👆 Selecione um emoji acima para começar sua jornada hoje
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
