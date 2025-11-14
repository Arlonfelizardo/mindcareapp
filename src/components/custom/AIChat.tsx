'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, X, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentMood?: string;
}

export default function AIChat({ isOpen, onClose, currentMood }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! 👋 Sou sua assistente de bem-estar mental. Como posso te ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Respostas contextuais baseadas no humor atual
    if (currentMood === 'feliz' && (lowerMessage.includes('feliz') || lowerMessage.includes('bem'))) {
      return 'Que maravilha ver você tão bem! 🌟 Para manter esse estado positivo, que tal uma meditação de gratidão ou um exercício de respiração energizante?';
    }

    if (currentMood === 'triste' && (lowerMessage.includes('triste') || lowerMessage.includes('mal'))) {
      return 'Entendo que você está passando por um momento difícil. 💙 Lembre-se: sentimentos são temporários. Posso sugerir alguns exercícios de respiração profunda ou uma meditação guiada para acalmar a mente?';
    }

    if (currentMood === 'ansioso' && (lowerMessage.includes('ansioso') || lowerMessage.includes('preocupado'))) {
      return 'A ansiedade pode ser desafiadora, mas você não está sozinho. 🌸 Vamos tentar técnicas de grounding: respire fundo, identifique 5 coisas que você vê, 4 que você toca, 3 que você ouve. Isso ajuda muito!';
    }

    // Respostas sobre funcionalidades
    if (lowerMessage.includes('exercício') || lowerMessage.includes('atividade')) {
      return 'Temos vários exercícios personalizados! 🧘‍♀️ Meditações guiadas, respiração consciente, journaling e muito mais. Baseio minhas recomendações no seu humor atual. Quer experimentar algum agora?';
    }

    if (lowerMessage.includes('premium') || lowerMessage.includes('plano')) {
      return 'Com o Premium você desbloqueia: ✨ Exercícios exclusivos, análises avançadas de humor, meditações longas, suporte prioritário e muito mais! Vale super a pena para quem quer cuidar da saúde mental de forma completa.';
    }

    if (lowerMessage.includes('como funciona') || lowerMessage.includes('ajuda')) {
      return 'É simples! 😊 Registre seu humor diariamente, complete exercícios personalizados, acompanhe seu progresso e ganhe pontos. Quanto mais você usa, melhor eu te conheço e mais personalizadas ficam as recomendações!';
    }

    if (lowerMessage.includes('dormir') || lowerMessage.includes('sono')) {
      return 'Sono de qualidade é essencial! 😴 Recomendo: evite telas 1h antes de dormir, faça uma meditação relaxante, mantenha o quarto escuro e fresco. Temos exercícios específicos para melhorar o sono no app!';
    }

    if (lowerMessage.includes('estresse') || lowerMessage.includes('estressado')) {
      return 'O estresse é comum, mas podemos gerenciá-lo juntos! 💪 Técnicas que funcionam: respiração 4-7-8, caminhadas curtas, pausas regulares, e mindfulness. Quer que eu te guie em um exercício rápido?';
    }

    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada')) {
      return 'Por nada! 💜 Estou aqui sempre que precisar. Cuidar da saúde mental é um ato de coragem e você está no caminho certo!';
    }

    // Resposta padrão empática
    const defaultResponses = [
      'Entendo sua preocupação. Conte-me mais sobre como você está se sentindo? 🌟',
      'Estou aqui para te apoiar! Que tal começarmos com um exercício de respiração? 🌸',
      'Sua saúde mental é importante. Vamos trabalhar nisso juntos, passo a passo. 💙',
      'Fico feliz que você esteja aqui! Como posso te ajudar especificamente hoje? ✨',
      'Cada dia é uma nova oportunidade de cuidar de si mesmo. O que você precisa agora? 🌺'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular delay de digitação da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <Card className="w-full sm:max-w-2xl h-[100vh] sm:h-[600px] flex flex-col bg-white dark:bg-gray-900 sm:rounded-2xl rounded-none shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600 sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                Assistente IA
                <Sparkles className="w-4 h-4" />
              </h3>
              <p className="text-xs text-purple-100">
                {isTyping ? 'Digitando...' : 'Online'}
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-800/50 sm:rounded-b-2xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Assistente IA para suporte emocional e dúvidas
          </p>
        </div>
      </Card>
    </div>
  );
}
