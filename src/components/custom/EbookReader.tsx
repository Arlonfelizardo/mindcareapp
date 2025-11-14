'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronLeft, ChevronRight, Heart, Brain, Wind, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface EbookReaderProps {
  onComplete: (points: number) => void;
}

const ebookContent = [
  {
    chapter: 1,
    title: 'Entendendo a Ansiedade',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    content: `A ansiedade é uma resposta natural do corpo a situações de estresse ou perigo. É uma emoção que todos experimentamos em algum momento da vida.

**O que é ansiedade?**
A ansiedade é caracterizada por sentimentos de preocupação, nervosismo ou medo sobre eventos futuros. Quando controlada, pode até ser benéfica, nos mantendo alertas e preparados.

**Sintomas comuns:**
• Coração acelerado
• Respiração rápida
• Tensão muscular
• Dificuldade de concentração
• Pensamentos acelerados
• Sudorese e tremores

**Quando se torna um problema?**
A ansiedade se torna problemática quando é excessiva, persistente e interfere nas atividades diárias, relacionamentos e qualidade de vida.`,
    exercise: 'Respire fundo 3 vezes agora. Inspire por 4 segundos, segure por 4, expire por 6.'
  },
  {
    chapter: 2,
    title: 'Técnicas de Respiração',
    icon: Wind,
    color: 'from-blue-500 to-cyan-500',
    content: `A respiração é uma ferramenta poderosa para controlar a ansiedade. Quando estamos ansiosos, nossa respiração fica rápida e superficial.

**Respiração Diafragmática:**
1. Sente-se confortavelmente
2. Coloque uma mão no peito e outra na barriga
3. Inspire profundamente pelo nariz (4 segundos)
4. Sinta sua barriga expandir
5. Expire lentamente pela boca (6 segundos)
6. Repita 5-10 vezes

**Técnica 4-7-8:**
• Inspire pelo nariz contando até 4
• Segure a respiração contando até 7
• Expire pela boca contando até 8
• Repita 4 ciclos

**Benefícios:**
✓ Reduz frequência cardíaca
✓ Diminui pressão arterial
✓ Acalma o sistema nervoso
✓ Melhora foco e clareza mental`,
    exercise: 'Pratique a técnica 4-7-8 agora mesmo. Faça 3 ciclos completos.'
  },
  {
    chapter: 3,
    title: 'Mindfulness e Atenção Plena',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-500',
    content: `Mindfulness é a prática de estar presente no momento atual, sem julgamentos. É uma das ferramentas mais eficazes contra a ansiedade.

**O que é Mindfulness?**
É prestar atenção ao momento presente de forma intencional e sem julgamento. Observar pensamentos, sentimentos e sensações como eles são.

**Como praticar:**

**1. Meditação dos 5 Sentidos:**
• O que você VÊ? (5 coisas)
• O que você OUVE? (4 sons)
• O que você SENTE? (3 texturas)
• O que você CHEIRA? (2 aromas)
• O que você PROVA? (1 sabor)

**2. Escaneamento Corporal:**
• Deite-se confortavelmente
• Foque atenção nos pés
• Suba gradualmente pelo corpo
• Observe sensações sem julgar
• Relaxe cada parte conscientemente

**Benefícios comprovados:**
✓ Reduz sintomas de ansiedade
✓ Melhora qualidade do sono
✓ Aumenta autoconsciência
✓ Fortalece resiliência emocional`,
    exercise: 'Faça o exercício dos 5 sentidos agora. Liste mentalmente cada item.'
  },
  {
    chapter: 4,
    title: 'Reestruturação de Pensamentos',
    icon: Brain,
    color: 'from-yellow-500 to-orange-500',
    content: `Nossos pensamentos influenciam diretamente nossas emoções. Aprender a identificar e modificar pensamentos negativos é fundamental.

**Pensamentos Automáticos Negativos:**
São pensamentos que surgem automaticamente e geralmente são distorcidos ou exagerados.

**Tipos comuns:**
• Catastrofização: "Vai ser terrível!"
• Leitura mental: "Todos me julgam"
• Generalização: "Nunca consigo nada"
• Filtro negativo: Ignorar o positivo

**Técnica de Reestruturação:**

**1. Identifique o pensamento**
Exemplo: "Vou fracassar na apresentação"

**2. Questione a evidência**
• Isso é um fato ou opinião?
• Quais evidências apoiam isso?
• Quais evidências contradizem?

**3. Crie pensamento alternativo**
"Estou preparado e farei o meu melhor"

**4. Teste o novo pensamento**
Como você se sente agora?

**Perguntas úteis:**
• Isso é realmente verdade?
• Qual a pior coisa que pode acontecer?
• Como eu veria isso daqui a 5 anos?
• O que eu diria a um amigo nessa situação?`,
    exercise: 'Identifique um pensamento ansioso que você teve hoje e questione-o.'
  },
  {
    chapter: 5,
    title: 'Hábitos Saudáveis',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    content: `Seu estilo de vida tem impacto direto nos níveis de ansiedade. Pequenas mudanças podem fazer grande diferença.

**1. Exercício Físico Regular**
• 30 minutos diários
• Libera endorfinas naturais
• Reduz tensão muscular
• Melhora qualidade do sono

**2. Alimentação Equilibrada**
• Evite excesso de cafeína
• Reduza açúcar e processados
• Aumente ômega-3 (peixes, nozes)
• Mantenha-se hidratado

**3. Sono de Qualidade**
• 7-9 horas por noite
• Rotina regular de sono
• Ambiente escuro e fresco
• Evite telas antes de dormir

**4. Conexões Sociais**
• Mantenha contato com amigos
• Compartilhe sentimentos
• Participe de grupos
• Busque apoio quando necessário

**5. Limite Estressores**
• Aprenda a dizer não
• Estabeleça limites saudáveis
• Organize seu tempo
• Faça pausas regulares

**Dica de Ouro:**
Crie uma rotina matinal relaxante. Os primeiros 30 minutos do dia definem o tom para o resto dele.`,
    exercise: 'Escolha um hábito para implementar esta semana. Comece pequeno!'
  },
  {
    chapter: 6,
    title: 'Plano de Ação Pessoal',
    icon: Star,
    color: 'from-indigo-500 to-purple-500',
    content: `Agora é hora de criar seu plano personalizado para gerenciar a ansiedade no dia a dia.

**Seu Kit de Ferramentas Anti-Ansiedade:**

**Técnicas Rápidas (1-5 min):**
✓ Respiração 4-7-8
✓ Exercício dos 5 sentidos
✓ Alongamento rápido
✓ Música relaxante

**Práticas Diárias (10-20 min):**
✓ Meditação matinal
✓ Diário de gratidão
✓ Caminhada ao ar livre
✓ Exercício físico

**Estratégias de Longo Prazo:**
✓ Terapia profissional
✓ Grupos de apoio
✓ Hobbies e interesses
✓ Desenvolvimento pessoal

**Seu Plano de Emergência:**
Quando sentir ansiedade intensa:

1. **PARE** - Interrompa o que está fazendo
2. **RESPIRE** - 3 respirações profundas
3. **OBSERVE** - Identifique o gatilho
4. **QUESTIONE** - É real ou percepção?
5. **ESCOLHA** - Qual técnica usar agora?

**Lembre-se:**
• Progresso, não perfeição
• Seja gentil consigo mesmo
• Celebre pequenas vitórias
• Busque ajuda quando necessário

**Recursos Profissionais:**
Se a ansiedade está impactando significativamente sua vida, considere buscar ajuda de um psicólogo ou psiquiatra. Não há vergonha em pedir ajuda!`,
    exercise: 'Crie seu plano de ação pessoal. Escolha 3 técnicas para usar esta semana.'
  }
];

export default function EbookReader({ onComplete }: EbookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [showExercise, setShowExercise] = useState(false);

  const currentChapter = ebookContent[currentPage];
  const Icon = currentChapter.icon;
  const progress = ((currentPage + 1) / ebookContent.length) * 100;

  const handleNext = () => {
    if (currentPage < ebookContent.length - 1) {
      if (!completedChapters.includes(currentPage)) {
        setCompletedChapters([...completedChapters, currentPage]);
        toast.success('Capítulo concluído! +10 pontos 📚');
        onComplete(10);
      }
      setCurrentPage(currentPage + 1);
      setShowExercise(false);
    } else {
      if (!completedChapters.includes(currentPage)) {
        setCompletedChapters([...completedChapters, currentPage]);
        toast.success('Ebook completo! +50 pontos de bônus! 🎉');
        onComplete(60);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowExercise(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className={`p-6 bg-gradient-to-r ${currentChapter.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Capítulo {currentChapter.chapter} de {ebookContent.length}</p>
              <h2 className="text-xl font-bold">{currentChapter.title}</h2>
            </div>
          </div>
          <div className="text-right">
            <BookOpen className="w-8 h-8 mb-1" />
            <p className="text-xs opacity-90">{Math.round(progress)}%</p>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-4 bg-white/20" />
      </Card>

      {/* Content */}
      <Card className="p-8 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 min-h-[400px]">
        <div className="prose prose-purple dark:prose-invert max-w-none">
          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
            {currentChapter.content}
          </div>
        </div>

        {/* Exercise Section */}
        {!showExercise ? (
          <div className="mt-8 pt-6 border-t border-purple-200 dark:border-purple-800">
            <Button
              onClick={() => setShowExercise(true)}
              className={`w-full bg-gradient-to-r ${currentChapter.color} hover:opacity-90 text-white`}
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Ver Exercício Prático
            </Button>
          </div>
        ) : (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Exercício Prático
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentChapter.exercise}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Anterior
        </Button>

        <div className="flex items-center gap-2">
          {ebookContent.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentPage
                  ? 'w-8 bg-purple-600'
                  : completedChapters.includes(idx)
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          className={`flex-1 bg-gradient-to-r ${currentChapter.color} hover:opacity-90 text-white`}
        >
          {currentPage === ebookContent.length - 1 ? (
            <>
              Finalizar
              <CheckCircle2 className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Próximo
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Progress Summary */}
      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Capítulos Concluídos: {completedChapters.length}/{ebookContent.length}
            </span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            +{completedChapters.length * 10} pontos
          </span>
        </div>
      </Card>
    </div>
  );
}
