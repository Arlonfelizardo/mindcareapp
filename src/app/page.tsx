'use client';

import { useState, useEffect } from 'react';
import { MoodType, Exercise, UserProgress, generateMockHistory, getRecommendedExercises } from '@/lib/moodData';
import MoodTracker from '@/components/custom/MoodTracker';
import ExerciseCard from '@/components/custom/ExerciseCard';
import MoodChart from '@/components/custom/MoodChart';
import PaywallModal from '@/components/custom/PaywallModal';
import AIChat from '@/components/custom/AIChat';
import ReviewsSection from '@/components/custom/ReviewsSection';
import SettingsModal from '@/components/custom/SettingsModal';
import OnboardingFlow, { UserData } from '@/components/custom/OnboardingFlow';
import PremiumActivities from '@/components/custom/PremiumActivities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Star, Crown, Bell, Settings, MessageCircle, Sparkles, Heart, Brain, Zap, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const [moodHistory, setMoodHistory] = useState(generateMockHistory(14));
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [progress, setProgress] = useState<UserProgress>({
    streak: 7,
    totalDays: 23,
    points: 340,
    level: 4
  });

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger paywall após 3 interações (apenas se não completou onboarding)
  useEffect(() => {
    if (interactionCount === 3 && !isPremium && !showOnboarding && mounted) {
      setTimeout(() => {
        setShowPaywall(true);
        toast.info('Você está adorando! Que tal desbloquear tudo? 🎉');
      }, 1000);
    }
  }, [interactionCount, isPremium, showOnboarding, mounted]);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setShowOnboarding(false);
    setShowPaywall(true);
    toast.success(`Bem-vindo, ${data.name}! Vamos desbloquear todo o potencial 🚀`);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
    setInteractionCount(prev => prev + 1);
    
    // Atualizar histórico
    const newEntry = {
      id: `entry-${Date.now()}`,
      mood,
      date: new Date()
    };
    setMoodHistory(prev => [...prev.slice(-13), newEntry]);
    
    // Atualizar progresso
    setProgress(prev => ({
      ...prev,
      points: prev.points + 10,
      streak: prev.streak + 1
    }));

    toast.success('Humor registrado! +10 pontos 🎯');
  };

  const handleExerciseStart = (exercise: Exercise) => {
    if (exercise.isPremium && !isPremium) {
      setShowPaywall(true);
      toast.info('Este exercício é premium! Desbloqueie agora 👑');
      return;
    }

    setInteractionCount(prev => prev + 1);
    setProgress(prev => ({
      ...prev,
      points: prev.points + 20
    }));

    toast.success(`Iniciando: ${exercise.title} 🧘`);
  };

  const handleSubscribe = (plan: 'mensal' | 'anual') => {
    setIsPremium(true);
    setShowPaywall(false);
    setShowActivities(true);
    toast.success(`Bem-vindo ao Premium ${plan}! Acesso total liberado 🎉👑`);
  };

  const handleActivityComplete = (points: number) => {
    setProgress(prev => ({
      ...prev,
      points: prev.points + points,
      totalDays: prev.totalDays + 1
    }));
  };

  const recommendedExercises = currentMood 
    ? getRecommendedExercises(currentMood, isPremium)
    : [];

  if (!mounted) {
    return null;
  }

  // Mostrar onboarding primeiro
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onSkipToPaywall={() => {
          setShowOnboarding(false);
          setShowPaywall(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header Moderno */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  MindCare
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {userData ? `Olá, ${userData.name.split(' ')[0]}!` : 'Sua jornada de bem-estar'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg hidden sm:flex">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              {userData && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative"
                  onClick={() => toast.info(`Perfil: ${userData.name} | ${userData.age} anos | Objetivo: ${userData.mainGoal}`)}
                >
                  <User className="w-5 h-5" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
                onClick={() => toast.info('Você tem 3 novas notificações! 🔔')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 sm:p-12 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')"
          }} />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-3">
              <Heart className="w-8 h-8 animate-pulse" />
              {userData ? `Bem-vindo de volta, ${userData.name.split(' ')[0]}!` : 'Bem-vindo de volta!'}
            </h2>
            <p className="text-lg text-purple-100 mb-6">
              Continue sua jornada de autocuidado. Você está no dia {progress.streak} da sua sequência! 🎉
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setShowAIChat(true)}
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Conversar com IA
              </Button>
              {isPremium && (
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={() => setShowActivities(!showActivities)}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {showActivities ? 'Voltar ao Dashboard' : 'Ver Atividades Premium'}
                </Button>
              )}
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={() => toast.success('Iniciando exercício rápido de respiração! 🌬️')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Exercício Rápido
              </Button>
            </div>
          </div>
        </div>

        {/* Mostrar Atividades Premium ou Dashboard Normal */}
        {showActivities && isPremium ? (
          <PremiumActivities 
            isPremium={isPremium}
            onActivityComplete={handleActivityComplete}
          />
        ) : (
          <>
            {/* Stats Cards com Animação */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {progress.streak}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Dias seguidos
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {progress.totalDays}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Total de dias
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {progress.points}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Pontos
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Nível {progress.level}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Progresso
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Level Progress */}
            <Card className="p-6 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    Nível {progress.level}
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {progress.points % 100}/100 XP
                  </span>
                </div>
                <Progress value={(progress.points % 100)} className="h-3 bg-gray-200 dark:bg-gray-700" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mais {100 - (progress.points % 100)} XP para o próximo nível!
                </p>
              </div>
            </Card>

            {/* Mood Tracker */}
            <MoodTracker onMoodSelect={handleMoodSelect} currentMood={currentMood} />

            {/* Exercícios Recomendados */}
            {currentMood && recommendedExercises.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    Recomendado para você
                  </h2>
                  {!isPremium && (
                    <Button
                      onClick={() => setShowPaywall(true)}
                      variant="outline"
                      className="gap-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <Crown className="w-4 h-4" />
                      Ver todos
                    </Button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedExercises.map(exercise => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onStart={handleExerciseStart}
                      isPremiumUser={isPremium}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mood Chart */}
            <MoodChart entries={moodHistory} />

            {/* Reviews Section */}
            <ReviewsSection />

            {/* CTA Premium (se não for premium) */}
            {!isPremium && (
              <Card className="p-8 sm:p-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-0 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')"
                }} />
                <div className="relative z-10 text-center space-y-6">
                  <Crown className="w-20 h-20 mx-auto animate-pulse drop-shadow-2xl" />
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Desbloqueie Todo o Potencial
                  </h2>
                  <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                    Acesse exercícios exclusivos, análises avançadas, suporte prioritário da IA e muito mais com o plano Premium
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      onClick={() => setShowPaywall(true)}
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-purple-50 shadow-xl text-lg px-8"
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Começar Agora
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                      onClick={() => toast.info('Veja todos os benefícios Premium acima! 👆')}
                    >
                      Ver Benefícios
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </main>

      {/* Botão Flutuante de Chat IA */}
      <Button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl z-40 animate-bounce"
        size="icon"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </Button>

      {/* Modals */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSubscribe={handleSubscribe}
      />

      <AIChat 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        currentMood={currentMood}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
