'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Sparkles, CheckCircle2, ArrowRight, Zap, Target, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
  onSkipToPaywall: () => void;
}

export interface UserData {
  name: string;
  email: string;
  age: string;
  mainGoal: string;
  quizScore: number;
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Como você se sente na maior parte do tempo?",
    options: [
      { text: "Energizado e motivado", emoji: "⚡", points: 10 },
      { text: "Equilibrado e tranquilo", emoji: "😌", points: 8 },
      { text: "Cansado e estressado", emoji: "😓", points: 6 },
      { text: "Ansioso e preocupado", emoji: "😰", points: 4 }
    ]
  },
  {
    id: 2,
    question: "Qual é seu maior desafio atualmente?",
    options: [
      { text: "Gerenciar estresse", emoji: "🎯", points: 10 },
      { text: "Melhorar o sono", emoji: "😴", points: 8 },
      { text: "Controlar ansiedade", emoji: "🧘", points: 6 },
      { text: "Aumentar foco", emoji: "🎓", points: 4 }
    ]
  },
  {
    id: 3,
    question: "Quanto tempo você dedica ao autocuidado por dia?",
    options: [
      { text: "Mais de 30 minutos", emoji: "⏰", points: 10 },
      { text: "15-30 minutos", emoji: "⏱️", points: 8 },
      { text: "5-15 minutos", emoji: "⏲️", points: 6 },
      { text: "Quase nada", emoji: "😔", points: 4 }
    ]
  }
];

export default function OnboardingFlow({ onComplete, onSkipToPaywall }: OnboardingFlowProps) {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'demo' | 'signup'>('welcome');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [userData, setUserData] = useState<Partial<UserData>>({});

  const progress = step === 'welcome' ? 0 : step === 'quiz' ? 33 : step === 'demo' ? 66 : 100;

  const handleQuizAnswer = (points: number) => {
    setQuizScore(prev => prev + points);
    setSelectedAnswers(prev => [...prev, points]);
    
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setQuizStep(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setStep('demo');
        toast.success('Quiz completo! Veja o que preparamos para você 🎉');
      }, 500);
    }
  };

  const handleSignup = () => {
    if (!userData.name || !userData.email || !userData.age || !userData.mainGoal) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const completeUserData: UserData = {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      mainGoal: userData.mainGoal,
      quizScore
    };

    onComplete(completeUserData);
  };

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 z-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 sm:p-12 bg-white/95 backdrop-blur-xl shadow-2xl">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-2xl animate-pulse">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Bem-vindo ao MindCare
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Descubra como transformar sua saúde mental em apenas 3 minutos
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 py-6">
              <div className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-2xl">
                <Target className="w-8 h-8 text-purple-600" />
                <p className="text-sm font-semibold text-gray-700">Personalizado</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-pink-50 rounded-2xl">
                <Zap className="w-8 h-8 text-pink-600" />
                <p className="text-sm font-semibold text-gray-700">Rápido</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl">
                <Trophy className="w-8 h-8 text-blue-600" />
                <p className="text-sm font-semibold text-gray-700">Eficaz</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setStep('quiz');
                toast.success('Vamos começar! 🚀');
              }}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 text-lg py-6 shadow-xl"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-gray-500">
              Leva apenas 3 minutos • Sem compromisso
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz Screen
  if (step === 'quiz') {
    const currentQuestion = QUIZ_QUESTIONS[quizStep];
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <Card className="max-w-2xl w-full p-6 sm:p-8 bg-white shadow-2xl">
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-700">Pergunta {quizStep + 1} de {QUIZ_QUESTIONS.length}</span>
                <span className="text-gray-500">{Math.round(((quizStep) / QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <Progress value={((quizStep) / QUIZ_QUESTIONS.length) * 100} className="h-2" />
            </div>

            {/* Question */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {currentQuestion.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleQuizAnswer(option.points)}
                    variant="outline"
                    className="w-full p-6 text-left justify-start hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 hover:scale-105"
                  >
                    <span className="text-3xl mr-4">{option.emoji}</span>
                    <span className="text-lg font-medium">{option.text}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Skip */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setStep('demo');
                  toast.info('Pulando para demonstração...');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Pular quiz
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Demo Screen
  if (step === 'demo') {
    const scorePercentage = (quizScore / 30) * 100;
    const recommendation = scorePercentage >= 80 ? 'Excelente!' : scorePercentage >= 60 ? 'Muito bom!' : 'Precisa de atenção';
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <Card className="max-w-3xl w-full p-6 sm:p-8 bg-white shadow-2xl my-8">
          <div className="space-y-6">
            {/* Results */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {recommendation}
                </h2>
                <p className="text-lg text-gray-600">
                  Sua pontuação: {quizScore}/30 pontos
                </p>
              </div>
            </div>

            {/* Demo Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 text-center">
                Veja o que você terá acesso:
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Brain, title: 'Exercícios Personalizados', desc: 'Baseados no seu perfil' },
                  { icon: Heart, title: 'Acompanhamento Diário', desc: 'Monitore seu progresso' },
                  { icon: Sparkles, title: 'IA Personalizada', desc: 'Suporte 24/7' },
                  { icon: Trophy, title: 'Sistema de Conquistas', desc: 'Mantenha-se motivado' }
                ].map((feature, idx) => (
                  <Card key={idx} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => {
                  setStep('signup');
                  toast.success('Vamos criar sua conta! 🎉');
                }}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 text-lg py-6 shadow-xl"
              >
                Criar Minha Conta Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-gray-600">
                Teste grátis por 7 dias • Cancele quando quiser
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Signup Screen
  if (step === 'signup') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <Card className="max-w-md w-full p-6 sm:p-8 bg-white shadow-2xl my-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Crie sua conta
              </h2>
              <p className="text-gray-600">
                Falta pouco para começar sua jornada
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 text-center">Passo 3 de 3</p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="João Silva"
                  value={userData.name || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@exemplo.com"
                  value={userData.email || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={userData.age || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo principal</Label>
                <select
                  id="goal"
                  value={userData.mainGoal || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, mainGoal: e.target.value }))}
                  className="w-full h-12 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Selecione...</option>
                  <option value="stress">Reduzir estresse</option>
                  <option value="anxiety">Controlar ansiedade</option>
                  <option value="sleep">Melhorar sono</option>
                  <option value="focus">Aumentar foco</option>
                  <option value="mood">Melhorar humor</option>
                </select>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Button
                onClick={handleSignup}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 text-lg py-6 shadow-xl"
              >
                Continuar para Pagamento
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-center text-gray-500">
                Ao continuar, você concorda com nossos Termos de Uso
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
