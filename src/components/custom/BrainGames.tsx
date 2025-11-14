'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Trophy, Star, Timer, Target, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';

interface BrainGamesProps {
  onComplete: (points: number) => void;
}

type GameType = 'memory' | 'math' | 'pattern' | 'word';

const MEMORY_CARDS = ['🧠', '❤️', '⭐', '🎯', '🔥', '💎', '🌟', '🎨'];
const MATH_OPERATIONS = ['+', '-', '×'];
const PATTERNS = [
  ['🔴', '🔵', '🟢', '🟡'],
  ['⭐', '❤️', '💎', '🔥'],
  ['🌙', '☀️', '⚡', '🌈']
];

export default function BrainGames({ onComplete }: BrainGamesProps) {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'failed'>('playing');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Timer
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleGameEnd(false);
    }
  }, [timeLeft, isTimerActive]);

  const startGame = (game: GameType) => {
    setSelectedGame(game);
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setIsTimerActive(true);
    toast.success('Jogo iniciado! Boa sorte! 🎮');
  };

  const handleGameEnd = (success: boolean) => {
    setIsTimerActive(false);
    setGameState(success ? 'completed' : 'failed');
    
    if (success) {
      const points = score * 10;
      onComplete(points);
      toast.success(`Parabéns! Você ganhou ${points} pontos! 🎉`);
    } else {
      toast.error('Tempo esgotado! Tente novamente! ⏰');
    }
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setIsTimerActive(false);
  };

  // Game Selection Screen
  if (!selectedGame) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Jogos Cerebrais
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Treine seu cérebro com jogos divertidos e desafiadores
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200"
            onClick={() => startGame('memory')}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Jogo da Memória
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Encontre os pares correspondentes
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                <Zap className="w-4 h-4" />
                <span>+50 pontos</span>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200"
            onClick={() => startGame('math')}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Desafio Matemático
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Resolva cálculos rapidamente
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Zap className="w-4 h-4" />
                <span>+40 pontos</span>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200"
            onClick={() => startGame('pattern')}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Sequência de Padrões
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Memorize e repita a sequência
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Zap className="w-4 h-4" />
                <span>+60 pontos</span>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200"
            onClick={() => startGame('word')}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Caça-Palavras
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Encontre palavras escondidas
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                <Zap className="w-4 h-4" />
                <span>+45 pontos</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Game Playing/Completed Screen
  return (
    <div className="space-y-6">
      {/* Header with Timer */}
      <Card className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm opacity-90">Pontuação</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm opacity-90">Tempo</p>
              <p className="text-2xl font-bold flex items-center gap-1">
                <Timer className="w-5 h-5" />
                {timeLeft}s
              </p>
            </div>
          </div>
        </div>
        
        <Progress 
          value={(timeLeft / 60) * 100} 
          className="h-2 mt-3 bg-white/20"
        />
      </Card>

      {/* Game Content */}
      {gameState === 'playing' && selectedGame === 'memory' && (
        <MemoryGame 
          onScoreUpdate={(points) => setScore(prev => prev + points)}
          onComplete={() => handleGameEnd(true)}
        />
      )}

      {gameState === 'playing' && selectedGame === 'math' && (
        <MathGame 
          onScoreUpdate={(points) => setScore(prev => prev + points)}
          onComplete={() => handleGameEnd(true)}
        />
      )}

      {gameState === 'playing' && selectedGame === 'pattern' && (
        <PatternGame 
          onScoreUpdate={(points) => setScore(prev => prev + points)}
          onComplete={() => handleGameEnd(true)}
        />
      )}

      {gameState === 'playing' && selectedGame === 'word' && (
        <WordGame 
          onScoreUpdate={(points) => setScore(prev => prev + points)}
          onComplete={() => handleGameEnd(true)}
        />
      )}

      {/* Game Completed */}
      {gameState === 'completed' && (
        <Card className="p-8 text-center space-y-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Parabéns! 🎉
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Você ganhou {score * 10} pontos!
          </p>
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            Jogar Novamente
          </Button>
        </Card>
      )}

      {/* Game Failed */}
      {gameState === 'failed' && (
        <Card className="p-8 text-center space-y-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-xl">
            <X className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Tempo Esgotado! ⏰
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Você fez {score} pontos. Tente novamente!
          </p>
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            Tentar Novamente
          </Button>
        </Card>
      )}

      {/* Exit Button */}
      {gameState === 'playing' && (
        <Button
          onClick={resetGame}
          variant="outline"
          className="w-full"
        >
          Sair do Jogo
        </Button>
      )}
    </div>
  );
}

// Memory Game Component
function MemoryGame({ onScoreUpdate, onComplete }: { onScoreUpdate: (points: number) => void; onComplete: () => void }) {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...MEMORY_CARDS, ...MEMORY_CARDS]
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      onComplete();
    }
  }, [matched, cards.length, onComplete]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        onScoreUpdate(1);
        toast.success('Par encontrado! +1 ponto 🎯');
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              flipped.includes(index) || matched.includes(index)
                ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40'
                : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
            }`}
          >
            {(flipped.includes(index) || matched.includes(index)) ? card : '❓'}
          </Card>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Movimentos: {moves} | Pares encontrados: {matched.length / 2}/{cards.length / 2}
      </p>
    </div>
  );
}

// Math Game Component
function MathGame({ onScoreUpdate, onComplete }: { onScoreUpdate: (points: number) => void; onComplete: () => void }) {
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operation: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = MATH_OPERATIONS[Math.floor(Math.random() * MATH_OPERATIONS.length)];
    
    let answer = 0;
    if (operation === '+') answer = num1 + num2;
    else if (operation === '-') answer = num1 - num2;
    else answer = num1 * num2;

    setQuestion({ num1, num2, operation, answer });
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === question.answer) {
      onScoreUpdate(1);
      toast.success('Correto! +1 ponto 🎯');
      setQuestionsAnswered(questionsAnswered + 1);
      
      if (questionsAnswered + 1 >= 10) {
        onComplete();
      } else {
        generateQuestion();
      }
    } else {
      toast.error('Incorreto! Tente novamente ❌');
      setUserAnswer('');
    }
  };

  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Questão {questionsAnswered + 1} de 10
        </p>
        
        <div className="text-5xl font-bold text-gray-800 dark:text-gray-100">
          {question.num1} {question.operation} {question.num2} = ?
        </div>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Sua resposta"
          className="w-full max-w-xs mx-auto h-14 px-4 text-center text-2xl rounded-xl border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
          autoFocus
        />

        <Button
          onClick={handleSubmit}
          disabled={!userAnswer}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          size="lg"
        >
          Verificar Resposta
        </Button>
      </div>
    </Card>
  );
}

// Pattern Game Component
function PatternGame({ onScoreUpdate, onComplete }: { onScoreUpdate: (points: number) => void; onComplete: () => void }) {
  const [pattern, setPattern] = useState<string[]>([]);
  const [userPattern, setUserPattern] = useState<string[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [level, setLevel] = useState(1);
  const [selectedSet] = useState(PATTERNS[Math.floor(Math.random() * PATTERNS.length)]);

  useEffect(() => {
    generatePattern();
  }, [level]);

  useEffect(() => {
    if (showPattern) {
      const timer = setTimeout(() => setShowPattern(false), 2000 + (level * 500));
      return () => clearTimeout(timer);
    }
  }, [showPattern, level]);

  const generatePattern = () => {
    const newPattern = Array.from({ length: 3 + level }, () => 
      selectedSet[Math.floor(Math.random() * selectedSet.length)]
    );
    setPattern(newPattern);
    setUserPattern([]);
    setShowPattern(true);
  };

  const handleSymbolClick = (symbol: string) => {
    if (showPattern) return;

    const newUserPattern = [...userPattern, symbol];
    setUserPattern(newUserPattern);

    if (newUserPattern.length === pattern.length) {
      if (JSON.stringify(newUserPattern) === JSON.stringify(pattern)) {
        onScoreUpdate(level);
        toast.success(`Correto! +${level} pontos 🎯`);
        
        if (level >= 5) {
          onComplete();
        } else {
          setTimeout(() => setLevel(level + 1), 1000);
        }
      } else {
        toast.error('Sequência incorreta! Tente novamente ❌');
        setTimeout(() => generatePattern(), 1000);
      }
    }
  };

  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Nível {level} de 5
        </p>

        {showPattern ? (
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Memorize a sequência:
            </p>
            <div className="flex justify-center gap-3 text-5xl">
              {pattern.map((symbol, idx) => (
                <span key={idx} className="animate-pulse">
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Repita a sequência:
            </p>
            <div className="flex justify-center gap-3 text-5xl min-h-[60px]">
              {userPattern.map((symbol, idx) => (
                <span key={idx}>{symbol}</span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto pt-4">
          {selectedSet.map((symbol, idx) => (
            <Button
              key={idx}
              onClick={() => handleSymbolClick(symbol)}
              disabled={showPattern}
              className="aspect-square text-4xl p-0 hover:scale-110 transition-transform"
              variant="outline"
            >
              {symbol}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Word Game Component
function WordGame({ onScoreUpdate, onComplete }: { onScoreUpdate: (points: number) => void; onComplete: () => void }) {
  const words = ['CALMA', 'FOCO', 'PAZ', 'AMOR', 'VIDA', 'MENTE', 'SAUDE'];
  const [targetWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [foundLetters, setFoundLetters] = useState<string[]>([]);
  const [wordsFound, setWordsFound] = useState(0);

  const grid = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    )
  );

  // Insert target word horizontally in a random row
  const randomRow = Math.floor(Math.random() * 8);
  const randomCol = Math.floor(Math.random() * (8 - targetWord.length));
  for (let i = 0; i < targetWord.length; i++) {
    grid[randomRow][randomCol + i] = targetWord[i];
  }

  const handleLetterClick = (letter: string, row: number, col: number) => {
    const key = `${row}-${col}`;
    if (foundLetters.includes(key)) return;

    setFoundLetters([...foundLetters, key]);

    if (targetWord.includes(letter)) {
      onScoreUpdate(1);
      
      // Check if word is complete
      const wordPositions = Array.from({ length: targetWord.length }, (_, i) => 
        `${randomRow}-${randomCol + i}`
      );
      
      if (wordPositions.every(pos => [...foundLetters, key].includes(pos))) {
        toast.success('Palavra encontrada! 🎉');
        setWordsFound(wordsFound + 1);
        
        if (wordsFound + 1 >= 3) {
          onComplete();
        }
      }
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Encontre a palavra: <span className="font-bold text-purple-600">{targetWord}</span>
        </p>
        <p className="text-xs text-gray-500">
          Palavras encontradas: {wordsFound}/3
        </p>
      </div>

      <div className="grid grid-cols-8 gap-1">
        {grid.map((row, rowIdx) =>
          row.map((letter, colIdx) => {
            const key = `${rowIdx}-${colIdx}`;
            const isFound = foundLetters.includes(key);
            
            return (
              <Button
                key={key}
                onClick={() => handleLetterClick(letter, rowIdx, colIdx)}
                className={`aspect-square p-0 text-sm font-bold ${
                  isFound
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                variant="outline"
              >
                {letter}
              </Button>
            );
          })
        )}
      </div>
    </Card>
  );
}
