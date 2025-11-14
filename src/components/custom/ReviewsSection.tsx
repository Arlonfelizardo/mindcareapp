'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, MessageSquare, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: Date;
  likes: number;
  isLiked: boolean;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Maria Silva',
      avatar: '👩',
      rating: 5,
      comment: 'Aplicativo incrível! Me ajudou muito a controlar minha ansiedade. A IA é super empática e os exercícios são ótimos! 💜',
      date: new Date('2024-01-15'),
      likes: 24,
      isLiked: false
    },
    {
      id: '2',
      userName: 'João Santos',
      avatar: '👨',
      rating: 5,
      comment: 'Melhor app de saúde mental que já usei. O sistema de pontos me motiva a usar todos os dias!',
      date: new Date('2024-01-14'),
      likes: 18,
      isLiked: false
    },
    {
      id: '3',
      userName: 'Ana Costa',
      avatar: '👩‍🦰',
      rating: 4,
      comment: 'Muito bom! As meditações guiadas são maravilhosas. Só gostaria de mais exercícios gratuitos.',
      date: new Date('2024-01-13'),
      likes: 12,
      isLiked: false
    },
    {
      id: '4',
      userName: 'Pedro Lima',
      avatar: '👨‍💼',
      rating: 5,
      comment: 'Transformou minha rotina! Consigo acompanhar meu humor e entender melhor minhas emoções. Recomendo demais! 🌟',
      date: new Date('2024-01-12'),
      likes: 31,
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleLike = (reviewId: string) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          likes: review.isLiked ? review.likes - 1 : review.likes + 1,
          isLiked: !review.isLiked
        };
      }
      return review;
    }));
  };

  const handleSubmitReview = () => {
    if (!newComment.trim()) {
      toast.error('Escreva um comentário antes de enviar');
      return;
    }
    if (newRating === 0) {
      toast.error('Selecione uma avaliação de 1 a 5 estrelas');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: 'Você',
      avatar: '😊',
      rating: newRating,
      comment: newComment,
      date: new Date(),
      likes: 0,
      isLiked: false
    };

    setReviews(prev => [newReview, ...prev]);
    setNewComment('');
    setNewRating(0);
    toast.success('Avaliação enviada com sucesso! 🎉');
  };

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 justify-center sm:justify-start">
              <MessageSquare className="w-6 h-6 text-purple-600" />
              Avaliações dos Usuários
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Veja o que nossos usuários estão dizendo
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-4xl font-bold text-purple-600">{averageRating.toFixed(1)}</span>
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {reviews.length} avaliações
              </p>
            </div>
            
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Formulário de Nova Avaliação */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Deixe sua avaliação
        </h3>
        
        <div className="space-y-4">
          {/* Rating Stars */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Sua avaliação
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || newRating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Seu comentário
            </label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Compartilhe sua experiência com o app..."
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {newComment.length}/500 caracteres
            </p>
          </div>

          <Button
            onClick={handleSubmitReview}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Avaliação
          </Button>
        </div>
      </Card>

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">
                {review.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">
                      {review.userName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {review.date.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  
                  {review.rating === 5 && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      Top Review
                    </Badge>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.comment}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(review.id)}
                    className={`gap-2 ${
                      review.isLiked 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${review.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{review.likes}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
