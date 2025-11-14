// Tipos e dados para o app de saúde mental

export type MoodType = 'excelente' | 'bom' | 'neutro' | 'ruim' | 'pessimo';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  date: Date;
  note?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // em minutos
  category: 'respiracao' | 'meditacao' | 'movimento' | 'escrita' | 'audio';
  moodTarget: MoodType[];
  isPremium: boolean;
}

export interface UserProgress {
  streak: number;
  totalDays: number;
  points: number;
  level: number;
}

// Exercícios personalizados baseados no humor
export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Respiração 4-7-8',
    description: 'Técnica de respiração para acalmar a mente e reduzir ansiedade',
    duration: 5,
    category: 'respiracao',
    moodTarget: ['ruim', 'pessimo', 'neutro'],
    isPremium: false
  },
  {
    id: '2',
    title: 'Meditação Guiada: Gratidão',
    description: 'Conecte-se com sentimentos de gratidão e abundância',
    duration: 10,
    category: 'meditacao',
    moodTarget: ['neutro', 'bom', 'excelente'],
    isPremium: false
  },
  {
    id: '3',
    title: 'Alongamento Consciente',
    description: 'Movimentos suaves para liberar tensões do corpo',
    duration: 8,
    category: 'movimento',
    moodTarget: ['ruim', 'neutro'],
    isPremium: false
  },
  {
    id: '4',
    title: 'Diário de Emoções',
    description: 'Escreva sobre seus sentimentos e ganhe clareza mental',
    duration: 15,
    category: 'escrita',
    moodTarget: ['ruim', 'pessimo', 'neutro'],
    isPremium: true
  },
  {
    id: '5',
    title: 'Meditação do Sono',
    description: 'Relaxamento profundo para uma noite tranquila',
    duration: 20,
    category: 'audio',
    moodTarget: ['ruim', 'neutro', 'bom'],
    isPremium: true
  },
  {
    id: '6',
    title: 'Visualização Positiva',
    description: 'Crie imagens mentais de paz e bem-estar',
    duration: 12,
    category: 'meditacao',
    moodTarget: ['neutro', 'bom', 'excelente'],
    isPremium: true
  },
  {
    id: '7',
    title: 'Caminhada Mindful',
    description: 'Atenção plena durante uma caminhada relaxante',
    duration: 15,
    category: 'movimento',
    moodTarget: ['neutro', 'bom'],
    isPremium: true
  },
  {
    id: '8',
    title: 'Escaneamento Corporal',
    description: 'Identifique e libere tensões em todo o corpo',
    duration: 10,
    category: 'meditacao',
    moodTarget: ['ruim', 'pessimo', 'neutro'],
    isPremium: false
  }
];

// Emojis e cores para cada humor
export const moodConfig = {
  excelente: { emoji: '😄', color: 'from-green-400 to-emerald-500', label: 'Excelente' },
  bom: { emoji: '😊', color: 'from-blue-400 to-cyan-500', label: 'Bom' },
  neutro: { emoji: '😐', color: 'from-yellow-400 to-amber-500', label: 'Neutro' },
  ruim: { emoji: '😔', color: 'from-orange-400 to-red-500', label: 'Ruim' },
  pessimo: { emoji: '😢', color: 'from-red-500 to-pink-600', label: 'Péssimo' }
};

// Mensagens motivacionais baseadas no humor
export const motivationalMessages: Record<MoodType, string[]> = {
  excelente: [
    'Que dia incrível! Continue assim! 🌟',
    'Sua energia está contagiante! ✨',
    'Você está brilhando hoje! 💫'
  ],
  bom: [
    'Ótimo trabalho! Mantenha o ritmo! 👏',
    'Você está no caminho certo! 🎯',
    'Cada dia é uma vitória! 🏆'
  ],
  neutro: [
    'Tudo bem ter dias assim. Vamos juntos! 🤝',
    'Pequenos passos também contam! 👣',
    'Respire fundo, você consegue! 💙'
  ],
  ruim: [
    'Estou aqui com você. Vamos melhorar! 💚',
    'Dias difíceis passam. Você é forte! 💪',
    'Um exercício pode ajudar. Que tal tentar? 🌱'
  ],
  pessimo: [
    'Você não está sozinho. Estamos juntos! 🫂',
    'Seja gentil consigo mesmo hoje. 💜',
    'Vamos começar com algo pequeno? 🌸'
  ]
};

// Função para calcular nível baseado em pontos
export function calculateLevel(points: number): number {
  return Math.floor(points / 100) + 1;
}

// Função para obter exercícios recomendados
export function getRecommendedExercises(mood: MoodType, isPremium: boolean = false): Exercise[] {
  return exercises
    .filter(ex => ex.moodTarget.includes(mood))
    .filter(ex => isPremium || !ex.isPremium)
    .slice(0, 3);
}

// Função para gerar dados de exemplo do histórico
export function generateMockHistory(days: number = 7): MoodEntry[] {
  const moods: MoodType[] = ['excelente', 'bom', 'neutro', 'ruim', 'pessimo'];
  const entries: MoodEntry[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    entries.push({
      id: `entry-${i}`,
      mood: moods[Math.floor(Math.random() * moods.length)],
      date
    });
  }
  
  return entries;
}
