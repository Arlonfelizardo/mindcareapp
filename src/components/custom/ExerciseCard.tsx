'use client';

import { Exercise } from '@/lib/moodData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Crown, Play, Sparkles } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
  isPremiumUser: boolean;
}

export default function ExerciseCard({ exercise, onStart, isPremiumUser }: ExerciseCardProps) {
  const isLocked = exercise.isPremium && !isPremiumUser;

  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-300
      ${isLocked 
        ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-90' 
        : 'bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 hover:shadow-2xl hover:scale-105'
      }
      border-2 ${isLocked ? 'border-gray-200 dark:border-gray-700' : 'border-purple-200 dark:border-purple-800'}
    `}>
      {/* Premium Badge */}
      {exercise.isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-purple-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto animate-pulse drop-shadow-lg" />
            <p className="text-white font-semibold text-sm">Desbloqueie com Premium</p>
          </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Icon */}
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg
          ${isLocked 
            ? 'bg-gray-300 dark:bg-gray-700' 
            : 'bg-gradient-to-br from-purple-600 to-pink-600'
          }
          transition-transform group-hover:scale-110 duration-300
        `}>
          <span className="text-3xl">{exercise.icon}</span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className={`
            text-lg font-bold
            ${isLocked 
              ? 'text-gray-600 dark:text-gray-400' 
              : 'text-gray-800 dark:text-gray-100'
            }
          `}>
            {exercise.title}
          </h3>
          <p className={`
            text-sm leading-relaxed
            ${isLocked 
              ? 'text-gray-500 dark:text-gray-500' 
              : 'text-gray-600 dark:text-gray-400'
            }
          `}>
            {exercise.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{exercise.duration}</span>
          </div>
          <Badge variant="outline" className={`
            ${isLocked 
              ? 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400' 
              : 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300'
            }
          `}>
            {exercise.category}
          </Badge>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onStart(exercise)}
          className={`
            w-full gap-2 transition-all duration-300
            ${isLocked
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
            }
          `}
        >
          {isLocked ? (
            <>
              <Crown className="w-4 h-4" />
              Desbloquear
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Começar
            </>
          )}
        </Button>
      </div>

      {/* Decorative Elements */}
      {!isLocked && (
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      )}
    </Card>
  );
}
