'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Heart, Wind, BookOpen, Trophy, Target, Zap, 
  Play, Pause, RotateCcw, CheckCircle2, Star, Crown,
  Headphones, Image, Gamepad2, TrendingUp, Music, Smile,
  Coffee, Moon, Sun, Dumbbell, Book, Palette, Volume2,
  Sparkles, MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';
import BrainGames from './BrainGames';
import EbookReader from './EbookReader';

interface PremiumActivitiesProps {
  isPremium: boolean;
  onActivityComplete: (points: number) => void;
}

type ActivityType = 'meditation' | 'breathing' | 'journal' | 'challenge' | 'course' | 'games' | 'ebook' | 'yoga' | 'music' | 'sleep' | 'energy' | 'creativity';

export default function PremiumActivities({ isPremium, onActivityComplete }: PremiumActivitiesProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [completedToday, setCompletedToday] = useState<ActivityType[]>([]);

  const activities = [
    {
      id: 'ebook' as ActivityType,
      title: 'E-book: Como Curar a Ansiedade',
      description: 'Guia completo com técnicas práticas e exercícios',
      icon: Book,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      borderColor: 'border-indigo-200',
      duration: '15-30 min',
      points: 60,
      hasAudio: false,
      hasImages: true,
      featured: true
    },
    {
      id: 'games' as ActivityType,
      title: 'Jogos Cerebrais',
      description: 'Desafios interativos para treinar o cérebro',
      icon: Gamepad2,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      borderColor: 'border-orange-200',
      duration: '5-15 min',
      points: 40,
      hasAudio: true,
      hasImages: true,
      featured: true
    },
    {
      id: 'meditation' as ActivityType,
      title: 'Meditação Guiada',
      description: 'Sessões com áudio profissional e visualizações',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      borderColor: 'border-purple-200',
      duration: '5-20 min',
      points: 30,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'breathing' as ActivityType,
      title: 'Exercícios de Respiração',
      description: 'Técnicas guiadas com animações e sons relaxantes',
      icon: Wind,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200',
      duration: '3-10 min',
      points: 20,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'yoga' as ActivityType,
      title: 'Yoga para Ansiedade',
      description: 'Posturas guiadas com imagens e áudio instrutivo',
      icon: Dumbbell,
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20',
      borderColor: 'border-teal-200',
      duration: '10-20 min',
      points: 35,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'music' as ActivityType,
      title: 'Musicoterapia',
      description: 'Sons relaxantes com paisagens visuais',
      icon: Music,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
      borderColor: 'border-pink-200',
      duration: '10-30 min',
      points: 25,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'journal' as ActivityType,
      title: 'Diário de Gratidão',
      description: 'Registre momentos positivos do seu dia',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200',
      duration: '5 min',
      points: 25,
      hasAudio: false,
      hasImages: true
    },
    {
      id: 'sleep' as ActivityType,
      title: 'Meditação para Dormir',
      description: 'Histórias relaxantes e sons para melhorar o sono',
      icon: Moon,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
      borderColor: 'border-indigo-200',
      duration: '15-30 min',
      points: 30,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'energy' as ActivityType,
      title: 'Boost de Energia',
      description: 'Exercícios rápidos com música energizante',
      icon: Sun,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      borderColor: 'border-yellow-200',
      duration: '5-10 min',
      points: 20,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'creativity' as ActivityType,
      title: 'Arte Terapia',
      description: 'Exercícios criativos para expressão emocional',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      borderColor: 'border-purple-200',
      duration: '10-20 min',
      points: 35,
      hasAudio: true,
      hasImages: true
    },
    {
      id: 'challenge' as ActivityType,
      title: 'Desafios Diários',
      description: 'Metas personalizadas para seu crescimento',
      icon: Target,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
      borderColor: 'border-red-200',
      duration: 'Variável',
      points: 50,
      hasAudio: false,
      hasImages: true
    },
    {
      id: 'course' as ActivityType,
      title: 'Cursos Premium com IA',
      description: 'IA explica técnicas avançadas de bem-estar',
      icon: Trophy,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
      borderColor: 'border-amber-200',
      duration: '10-30 min',
      points: 100,
      hasAudio: true,
      hasImages: true
    }
  ];

  const handleActivityStart = (activityId: ActivityType) => {
    if (!isPremium) {
      toast.error('Esta atividade é exclusiva Premium! 👑');
      return;
    }

    setSelectedActivity(activityId);
    setIsPlaying(true);
    setProgress(0);
    toast.success('Atividade iniciada! Boa prática! 🎯');
  };

  const handleActivityComplete = (activityId: ActivityType, points: number) => {
    setIsPlaying(false);
    setProgress(100);
    
    if (!completedToday.includes(activityId)) {
      setCompletedToday(prev => [...prev, activityId]);
      onActivityComplete(points);
      toast.success(`Parabéns! Você ganhou ${points} pontos! 🎉`);
    }
    
    setTimeout(() => {
      setSelectedActivity(null);
      setProgress(0);
    }, 2000);
  };

  const handleBrainGameComplete = (points: number) => {
    handleActivityComplete('games', points);
  };

  const handleEbookComplete = (points: number) => {
    if (!completedToday.includes('ebook')) {
      setCompletedToday(prev => [...prev, 'ebook']);
      onActivityComplete(points);
      toast.success(`E-book concluído! Você ganhou ${points} pontos! 🎉`);
    }
  };

  // Activity List View
  if (!selectedActivity) {
    const featuredActivities = activities.filter(a => a.featured);
    const regularActivities = activities.filter(a => !a.featured);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Crown className="w-7 h-7 text-yellow-500" />
              Atividades Premium
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Conteúdo exclusivo para transformar sua jornada
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
            <Trophy className="w-4 h-4 mr-1" />
            {dailyStreak} dias seguidos
          </Badge>
        </div>

        {/* Daily Progress */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Progresso Diário
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {completedToday.length}/{activities.length} atividades
              </span>
            </div>
            <Progress 
              value={(completedToday.length / activities.length) * 100} 
              className="h-3 bg-gray-200 dark:bg-gray-700" 
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Complete todas as atividades para ganhar bônus de 100 pontos! 🎁
            </p>
          </div>
        </Card>

        {/* Featured Activities */}
        {featuredActivities.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Em Destaque
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {featuredActivities.map((activity) => {
                const Icon = activity.icon;
                const isCompleted = completedToday.includes(activity.id);
                
                return (
                  <Card
                    key={activity.id}
                    className={`p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${activity.bgColor} ${activity.borderColor} relative overflow-hidden border-2`}
                    onClick={() => handleActivityStart(activity.id)}
                  >
                    {isCompleted && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                    )}

                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-500 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Destaque
                      </Badge>
                    </div>

                    <div className="space-y-4 mt-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {activity.hasAudio && (
                            <Badge variant="outline" className="text-xs">
                              <Headphones className="w-3 h-3 mr-1" />
                              Áudio
                            </Badge>
                          )}
                          {activity.hasImages && (
                            <Badge variant="outline" className="text-xs">
                              <Image className="w-3 h-3 mr-1" />
                              Visual
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.duration}
                        </span>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          +{activity.points}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Activities Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Todas as Atividades
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularActivities.map((activity) => {
              const Icon = activity.icon;
              const isCompleted = completedToday.includes(activity.id);
              
              return (
                <Card
                  key={activity.id}
                  className={`p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${activity.bgColor} ${activity.borderColor} relative overflow-hidden`}
                  onClick={() => handleActivityStart(activity.id)}
                >
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        {activity.hasAudio && (
                          <Badge variant="outline" className="text-xs">
                            <Headphones className="w-3 h-3 mr-1" />
                            Áudio
                          </Badge>
                        )}
                        {activity.hasImages && (
                          <Badge variant="outline" className="text-xs">
                            <Image className="w-3 h-3 mr-1" />
                            Visual
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.duration}
                      </span>
                      <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        +{activity.points}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
                Conquistas Desbloqueadas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Continue praticando para desbloquear mais conquistas e recompensas especiais!
              </p>
            </div>
            <Button
              variant="outline"
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            >
              Ver Todas
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Activity Detail View
  const currentActivity = activities.find(a => a.id === selectedActivity);
  if (!currentActivity) return null;

  const Icon = currentActivity.icon;

  // E-book View
  if (selectedActivity === 'ebook') {
    return (
      <div className="space-y-4">
        <Button
          onClick={() => setSelectedActivity(null)}
          variant="outline"
          className="mb-4"
        >
          ← Voltar às Atividades
        </Button>
        
        <EbookReader onComplete={handleEbookComplete} />
      </div>
    );
  }

  // Brain Games View
  if (selectedActivity === 'games') {
    return (
      <div className="space-y-4">
        <Button
          onClick={() => setSelectedActivity(null)}
          variant="outline"
          className="mb-4"
        >
          ← Voltar às Atividades
        </Button>
        
        <BrainGames onComplete={handleBrainGameComplete} />
      </div>
    );
  }

  // Other Activities View
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setSelectedActivity(null)}
          variant="outline"
        >
          ← Voltar
        </Button>
        <Badge className={`bg-gradient-to-r ${currentActivity.color} text-white border-0`}>
          +{currentActivity.points} pontos
        </Badge>
      </div>

      {/* Activity Card */}
      <Card className={`p-8 bg-gradient-to-br ${currentActivity.bgColor} ${currentActivity.borderColor}`}>
        <div className="space-y-6">
          {/* Icon and Title */}
          <div className="text-center space-y-4">
            <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${currentActivity.color} flex items-center justify-center shadow-2xl`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {currentActivity.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {currentActivity.description}
              </p>
            </div>
          </div>

          {/* Progress */}
          {isPlaying && (
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {progress}% completo
              </p>
            </div>
          )}

          {/* Content Based on Activity Type */}
          {selectedActivity === 'meditation' && (
            <MeditationContent 
              isPlaying={isPlaying}
              progress={progress}
              onProgressUpdate={setProgress}
            />
          )}

          {selectedActivity === 'breathing' && (
            <BreathingContent 
              isPlaying={isPlaying}
              progress={progress}
              onProgressUpdate={setProgress}
            />
          )}

          {selectedActivity === 'yoga' && (
            <YogaContent 
              isPlaying={isPlaying}
              progress={progress}
            />
          )}

          {selectedActivity === 'music' && (
            <MusicTherapyContent 
              isPlaying={isPlaying}
              progress={progress}
            />
          )}

          {selectedActivity === 'sleep' && (
            <SleepMeditationContent 
              isPlaying={isPlaying}
              progress={progress}
            />
          )}

          {selectedActivity === 'energy' && (
            <EnergyBoostContent 
              isPlaying={isPlaying}
              progress={progress}
            />
          )}

          {selectedActivity === 'creativity' && (
            <ArtTherapyContent 
              isPlaying={isPlaying}
              onComplete={() => handleActivityComplete('creativity', currentActivity.points)}
            />
          )}

          {selectedActivity === 'journal' && (
            <JournalContent 
              onComplete={() => handleActivityComplete('journal', currentActivity.points)}
            />
          )}

          {selectedActivity === 'challenge' && (
            <ChallengeContent 
              onComplete={() => handleActivityComplete('challenge', currentActivity.points)}
            />
          )}

          {selectedActivity === 'course' && (
            <CourseContent 
              isPlaying={isPlaying}
              progress={progress}
              onProgressUpdate={setProgress}
            />
          )}

          {/* Controls */}
          {(selectedActivity === 'meditation' || selectedActivity === 'breathing' || selectedActivity === 'course' || selectedActivity === 'yoga' || selectedActivity === 'music' || selectedActivity === 'sleep' || selectedActivity === 'energy') && (
            <div className="flex items-center justify-center gap-4">
              {!isPlaying ? (
                <Button
                  onClick={() => {
                    setIsPlaying(true);
                    const interval = setInterval(() => {
                      setProgress(prev => {
                        if (prev >= 100) {
                          clearInterval(interval);
                          handleActivityComplete(selectedActivity, currentActivity.points);
                          return 100;
                        }
                        return prev + 2;
                      });
                    }, 200);
                  }}
                  size="lg"
                  className={`bg-gradient-to-r ${currentActivity.color} hover:opacity-90 text-white shadow-xl`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setIsPlaying(false)}
                    size="lg"
                    variant="outline"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar
                  </Button>
                  <Button
                    onClick={() => {
                      setIsPlaying(false);
                      setProgress(0);
                    }}
                    size="lg"
                    variant="outline"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reiniciar
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// Meditation Content Component with Visual and Audio
function MeditationContent({ isPlaying, progress }: { isPlaying: boolean; progress: number; onProgressUpdate: (value: number) => void }) {
  const [breathCycle, setBreathCycle] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setBreathCycle(prev => (prev + 1) % 3);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const phases = ['Inspire profundamente...', 'Segure a respiração...', 'Expire lentamente...'];

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 dark:from-purple-800 dark:via-pink-800 dark:to-purple-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated breathing circle */}
            <div className={`w-48 h-48 rounded-full bg-white/30 backdrop-blur-sm transition-all duration-[4000ms] ${
              breathCycle === 0 ? 'scale-100' : breathCycle === 1 ? 'scale-110' : 'scale-75'
            }`} />
            <div className="absolute w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm animate-pulse" />
            <div className="absolute">
              <Sparkles className="w-16 h-16 text-white animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="relative">
              <Headphones className="w-20 h-20 mx-auto text-purple-600 dark:text-purple-400" />
              <Volume2 className="w-8 h-8 absolute -bottom-2 -right-2 text-purple-500 animate-pulse" />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Meditação guiada com áudio profissional
            </p>
          </div>
        )}
      </div>
      
      {isPlaying && (
        <div className="text-center space-y-3 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <Volume2 className="w-5 h-5 text-purple-600 animate-pulse" />
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {phases[breathCycle]}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Concentre-se na sua respiração e relaxe completamente
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Music className="w-4 h-4" />
            <span>Sons relaxantes de natureza tocando...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Breathing Content Component with Animation and Sound
function BreathingContent({ isPlaying }: { isPlaying: boolean; progress: number; onProgressUpdate: (value: number) => void }) {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (isPlaying) {
      const phaseInterval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
        setCount(4);
      }, 4000);

      const countInterval = setInterval(() => {
        setCount(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => {
        clearInterval(phaseInterval);
        clearInterval(countInterval);
      };
    }
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      <div className="aspect-square max-w-sm mx-auto bg-gradient-to-br from-blue-200 via-cyan-200 to-blue-300 dark:from-blue-800 dark:via-cyan-800 dark:to-blue-900 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl">
        {isPlaying ? (
          <>
            {/* Breathing animation circle */}
            <div className={`absolute w-64 h-64 rounded-full bg-white/40 backdrop-blur-sm transition-all duration-[4000ms] ease-in-out ${
              breathPhase === 'inhale' ? 'scale-100' : breathPhase === 'hold' ? 'scale-100' : 'scale-50'
            }`} />
            <div className={`absolute w-48 h-48 rounded-full bg-white/50 backdrop-blur-sm transition-all duration-[4000ms] ease-in-out ${
              breathPhase === 'inhale' ? 'scale-110' : breathPhase === 'hold' ? 'scale-110' : 'scale-60'
            }`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <Wind className="w-16 h-16 text-blue-600 dark:text-blue-300 mb-4" />
              <div className="text-6xl font-bold text-blue-700 dark:text-blue-200">
                {count}
              </div>
            </div>
            {/* Sound indicator */}
            <div className="absolute bottom-4 right-4">
              <Volume2 className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </>
        ) : (
          <div className="text-center space-y-2">
            <Wind className="w-20 h-20 mx-auto text-blue-600 dark:text-blue-400" />
            <Volume2 className="w-8 h-8 mx-auto text-blue-500 animate-pulse" />
          </div>
        )}
      </div>

      {isPlaying && (
        <div className="text-center space-y-3 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600 animate-pulse" />
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {breathPhase === 'inhale' ? 'Inspire' : breathPhase === 'hold' ? 'Segure' : 'Expire'}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Siga o ritmo da animação e do som relaxante
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Music className="w-4 h-4" />
            <span>Sons de ondas do mar tocando...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Yoga Content with Visual Instructions
function YogaContent({ isPlaying, progress }: { isPlaying: boolean; progress: number }) {
  const poses = [
    { name: 'Postura da Montanha', description: 'Fique em pé, pés juntos, braços ao lado do corpo', duration: '30s' },
    { name: 'Postura da Árvore', description: 'Equilibre-se em uma perna, mãos em oração', duration: '45s' },
    { name: 'Postura do Guerreiro', description: 'Perna à frente dobrada, braços estendidos', duration: '60s' },
    { name: 'Postura da Criança', description: 'Ajoelhe-se, sente nos calcanhares, braços à frente', duration: '90s' }
  ];

  const currentPose = poses[Math.floor((progress / 100) * poses.length)] || poses[0];

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gradient-to-br from-teal-200 via-green-200 to-teal-300 dark:from-teal-800 dark:via-green-800 dark:to-teal-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {isPlaying ? (
          <div className="absolute inset-0 p-8">
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              {/* Pose illustration placeholder */}
              <div className="w-48 h-48 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <Dumbbell className="w-24 h-24 text-teal-700 dark:text-teal-300" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {currentPose.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentPose.description}
                </p>
                <Badge className="bg-teal-600 text-white">
                  {currentPose.duration}
                </Badge>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-teal-600 animate-pulse" />
              <span className="text-xs text-gray-700">Instruções em áudio</span>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Dumbbell className="w-20 h-20 mx-auto text-teal-600 dark:text-teal-400" />
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Posturas guiadas com imagens e áudio
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <Volume2 className="w-4 h-4" />
                <span>Instruções em português</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Music Therapy with Visuals
function MusicTherapyContent({ isPlaying, progress }: { isPlaying: boolean; progress: number }) {
  const scenes = [
    { name: 'Floresta Tropical', color: 'from-green-400 to-emerald-600', icon: '🌳' },
    { name: 'Praia ao Pôr do Sol', color: 'from-orange-400 to-pink-500', icon: '🌅' },
    { name: 'Montanhas Nevadas', color: 'from-blue-400 to-cyan-500', icon: '🏔️' },
    { name: 'Jardim Zen', color: 'from-purple-400 to-pink-500', icon: '🌸' }
  ];

  const currentScene = scenes[Math.floor((progress / 100) * scenes.length)] || scenes[0];

  return (
    <div className="space-y-4">
      <div className={`aspect-video bg-gradient-to-br ${currentScene.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        {isPlaying ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-8xl mb-4 animate-pulse">{currentScene.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentScene.name}</h3>
            <div className="flex items-center gap-2 text-white">
              <Music className="w-6 h-6 animate-pulse" />
              <span className="text-sm">Sons relaxantes tocando...</span>
            </div>
            {/* Animated sound waves */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/60 rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 40}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Music className="w-20 h-20 mx-auto text-white" />
            <div className="space-y-2">
              <p className="text-white font-medium">
                Sons relaxantes com paisagens visuais
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                <Volume2 className="w-4 h-4" />
                <span>4 ambientes diferentes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sleep Meditation with Stories
function SleepMeditationContent({ isPlaying, progress }: { isPlaying: boolean; progress: number }) {
  const stories = [
    'Uma caminhada tranquila pela floresta ao entardecer...',
    'Flutuando suavemente em um lago calmo sob as estrelas...',
    'Descansando em uma praia deserta ao som das ondas...',
    'Viajando por nuvens macias em um céu noturno...'
  ];

  const currentStory = stories[Math.floor((progress / 100) * stories.length)] || stories[0];

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {isPlaying ? (
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
            {/* Animated stars */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <Moon className="w-20 h-20 text-yellow-200 mb-6 animate-pulse" />
            <p className="text-lg text-white text-center max-w-md italic">
              "{currentStory}"
            </p>
            <div className="flex items-center gap-2 text-white/80 mt-6">
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Narração suave em andamento...</span>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Moon className="w-20 h-20 mx-auto text-yellow-200" />
            <div className="space-y-2">
              <p className="text-white font-medium">
                Histórias relaxantes para melhorar o sono
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                <Volume2 className="w-4 h-4" />
                <span>Narração profissional + sons da natureza</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Energy Boost with Quick Exercises
function EnergyBoostContent({ isPlaying, progress }: { isPlaying: boolean; progress: number }) {
  const exercises = [
    { name: 'Alongamento de Braços', duration: '20s', icon: '💪' },
    { name: 'Respiração Energizante', duration: '30s', icon: '💨' },
    { name: 'Pulos no Lugar', duration: '30s', icon: '🏃' },
    { name: 'Rotação de Pescoço', duration: '20s', icon: '🔄' }
  ];

  const currentExercise = exercises[Math.floor((progress / 100) * exercises.length)] || exercises[0];

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gradient-to-br from-yellow-300 via-orange-300 to-yellow-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {isPlaying ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-8xl mb-4 animate-bounce">{currentExercise.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentExercise.name}</h3>
            <Badge className="bg-orange-600 text-white text-lg px-4 py-2">
              {currentExercise.duration}
            </Badge>
            <div className="flex items-center gap-2 text-gray-700 mt-4">
              <Music className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Música energizante tocando!</span>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Sun className="w-20 h-20 mx-auto text-orange-600 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="space-y-2">
              <p className="text-gray-800 font-medium">
                Exercícios rápidos com música energizante
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-700 text-sm">
                <Zap className="w-4 h-4" />
                <span>Aumente sua disposição em minutos!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Art Therapy with Creative Exercises
function ArtTherapyContent({ isPlaying, onComplete }: { isPlaying: boolean; onComplete: () => void }) {
  const [selectedColor, setSelectedColor] = useState('#8B5CF6');
  const [drawing, setDrawing] = useState(false);

  const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];
  const prompts = [
    'Desenhe como você está se sentindo agora',
    'Crie um padrão que represente paz',
    'Ilustre um momento feliz recente',
    'Expresse sua gratidão através de formas'
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
            Exercício Criativo
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {prompts[Math.floor(Math.random() * prompts.length)]}
          </p>
        </div>

        {/* Drawing Canvas Placeholder */}
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl border-4 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
          {drawing ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Palette className="w-20 h-20 text-purple-500 animate-pulse" />
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Palette className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-sm text-gray-500">Área de desenho livre</p>
            </div>
          )}
        </div>

        {/* Color Palette */}
        <div className="flex items-center justify-center gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setDrawing(true);
              }}
              className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 ${
                selectedColor === color ? 'ring-4 ring-offset-2 ring-purple-500' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="w-4 h-4" />
          <span>Use as cores para expressar suas emoções</span>
        </div>

        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
          size="lg"
        >
          Concluir Exercício
        </Button>
      </div>
    </div>
  );
}

// Journal Content Component
function JournalContent({ onComplete }: { onComplete: () => void }) {
  const [entries, setEntries] = useState(['', '', '']);

  const prompts = [
    'Pelo que você é grato hoje?',
    'Qual foi o melhor momento do seu dia?',
    'O que você aprendeu hoje?'
  ];

  const handleSubmit = () => {
    if (entries.every(entry => entry.trim())) {
      onComplete();
    } else {
      toast.error('Preencha todas as respostas para continuar');
    }
  };

  return (
    <div className="space-y-4">
      {prompts.map((prompt, idx) => (
        <div key={idx} className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {prompt}
          </label>
          <textarea
            value={entries[idx]}
            onChange={(e) => {
              const newEntries = [...entries];
              newEntries[idx] = e.target.value;
              setEntries(newEntries);
            }}
            className="w-full h-24 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-green-500 focus:outline-none resize-none"
            placeholder="Escreva aqui..."
          />
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white"
        size="lg"
      >
        Salvar Diário
      </Button>
    </div>
  );
}

// Challenge Content Component
function ChallengeContent({ onComplete }: { onComplete: () => void }) {
  const challenges = [
    { id: 1, text: 'Medite por 10 minutos', completed: false },
    { id: 2, text: 'Pratique gratidão', completed: false },
    { id: 3, text: 'Faça exercícios de respiração', completed: false },
    { id: 4, text: 'Escreva 3 coisas positivas', completed: false }
  ];

  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    if (completedChallenges.includes(id)) {
      setCompletedChallenges(completedChallenges.filter(c => c !== id));
    } else {
      const newCompleted = [...completedChallenges, id];
      setCompletedChallenges(newCompleted);
      
      if (newCompleted.length === challenges.length) {
        setTimeout(() => onComplete(), 500);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            onClick={() => handleToggle(challenge.id)}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              completedChallenges.includes(challenge.id)
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                completedChallenges.includes(challenge.id)
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {completedChallenges.includes(challenge.id) && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
              <span className={`flex-1 ${
                completedChallenges.includes(challenge.id)
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800 dark:text-gray-100'
              }`}>
                {challenge.text}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        {completedChallenges.length}/{challenges.length} desafios completos
      </div>
    </div>
  );
}

// Course Content with AI Explanation
function CourseContent({ isPlaying, progress }: { isPlaying: boolean; progress: number; onProgressUpdate: (value: number) => void }) {
  const modules = [
    { title: 'Fundamentos do Mindfulness', ai: 'Aprenda os princípios básicos da atenção plena' },
    { title: 'Técnicas Avançadas de Meditação', ai: 'Explore métodos profundos de meditação' },
    { title: 'Gestão de Estresse e Ansiedade', ai: 'Estratégias comprovadas para controle emocional' },
    { title: 'Construindo Hábitos Saudáveis', ai: 'Como criar rotinas que transformam sua vida' },
    { title: 'Inteligência Emocional', ai: 'Desenvolva sua capacidade de compreender emoções' }
  ];

  const currentModule = modules[Math.floor((progress / 100) * modules.length)] || modules[0];

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {isPlaying ? (
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 max-w-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">IA Assistente</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Explicando agora...</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {currentModule.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentModule.ai}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Narração da IA em andamento...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="relative">
              <Trophy className="w-20 h-20 mx-auto text-indigo-600 dark:text-indigo-400" />
              <MessageCircle className="w-8 h-8 absolute -bottom-2 -right-2 text-purple-500" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                IA explica técnicas avançadas de bem-estar
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>5 módulos com explicações detalhadas</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isPlaying && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Módulo {Math.floor((progress / 100) * modules.length) + 1} de {modules.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
