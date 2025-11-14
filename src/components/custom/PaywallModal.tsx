'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Crown, Check, Sparkles, Zap, Heart, Shield, Star, CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'mensal' | 'anual') => void;
}

export default function PaywallModal({ isOpen, onClose, onSubscribe }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual' | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Não renderizar nada no servidor
  if (!mounted) return null;
  if (!isOpen) return null;

  const benefits = [
    { icon: Sparkles, text: 'Exercícios exclusivos ilimitados', color: 'text-purple-600' },
    { icon: Zap, text: 'Análises avançadas de humor', color: 'text-yellow-600' },
    { icon: Heart, text: 'Suporte prioritário da IA 24/7', color: 'text-pink-600' },
    { icon: Shield, text: 'Meditações guiadas premium', color: 'text-blue-600' },
    { icon: Star, text: 'Conteúdo novo toda semana', color: 'text-orange-600' },
  ];

  const planPrices = {
    mensal: 29.90,
    anual: 179.90
  };

  // Links corretos do Stripe
  const stripeLinks = {
    mensal: 'https://buy.stripe.com/5kQ14m83m0re6U34Oc5Vu01',
    anual: 'https://buy.stripe.com/3cI14m83m3DqemvfsQ5Vu02'
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handlePlanSelect = (plan: 'mensal' | 'anual') => {
    setSelectedPlan(plan);
  };

  const handleContinueToCheckout = () => {
    if (!selectedPlan) {
      toast.error('Selecione um plano primeiro');
      return;
    }
    setShowCheckout(true);
  };

  const handleBackToPlans = () => {
    setShowCheckout(false);
  };

  const handleGoToStripe = () => {
    if (!selectedPlan) return;
    
    const checkoutUrl = stripeLinks[selectedPlan];
    
    // Redirecionar diretamente para o Stripe
    if (typeof window !== 'undefined') {
      window.location.href = checkoutUrl;
    }
  };

  // Renderizar tela de checkout
  if (showCheckout && selectedPlan) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <Card className="w-full max-w-2xl my-8 bg-white dark:bg-gray-900 shadow-2xl">
          <div className="relative">
            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Header com logo e preço */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <Button
                onClick={handleBackToPlans}
                variant="ghost"
                size="sm"
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos planos
              </Button>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      Premium {selectedPlan === 'mensal' ? 'Mensal' : 'Anual'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Assinatura recorrente
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(planPrices[selectedPlan])}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    por {selectedPlan === 'mensal' ? 'mês' : 'ano'}
                  </p>
                </div>
              </div>
            </div>

            {/* Área de formas de pagamento */}
            <div className="p-6 space-y-6">
              {/* Botões de pagamento rápido */}
              <div className="space-y-3">
                <Button
                  onClick={handleGoToStripe}
                  className="w-full bg-black hover:bg-gray-800 text-white py-6 text-base font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Pay
                </Button>

                <Button
                  onClick={handleGoToStripe}
                  className="w-full bg-[#00D66F] hover:bg-[#00C462] text-white py-6 text-base font-semibold rounded-lg"
                >
                  Link
                </Button>
              </div>

              {/* Divisor */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">
                    Ou pague com cartão
                  </span>
                </div>
              </div>

              {/* Formulário de pagamento */}
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-mail
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
                    onClick={handleGoToStripe}
                    readOnly
                  />
                </div>

                {/* Informações do cartão */}
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Informações do cartão
                  </label>
                  <div className="space-y-2">
                    {/* Número do cartão */}
                    <div className="relative">
                      <input
                        id="card-number"
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-t-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
                        onClick={handleGoToStripe}
                        readOnly
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                          <rect width="32" height="20" rx="2" fill="#1434CB"/>
                          <circle cx="12" cy="10" r="5" fill="#EB001B"/>
                          <circle cx="20" cy="10" r="5" fill="#FF5F00"/>
                        </svg>
                        <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                          <rect width="32" height="20" rx="2" fill="#0066B2"/>
                          <path d="M13 6h6v8h-6z" fill="#FFF"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Validade e CVC */}
                    <div className="grid grid-cols-2 gap-0">
                      <input
                        id="card-expiry"
                        type="text"
                        placeholder="MM / AA"
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 border-r-0 rounded-bl-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
                        onClick={handleGoToStripe}
                        readOnly
                      />
                      <input
                        id="card-cvc"
                        type="text"
                        placeholder="CVC"
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-br-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
                        onClick={handleGoToStripe}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Nome do titular */}
                <div>
                  <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome do titular do cartão
                  </label>
                  <input
                    id="card-holder"
                    type="text"
                    placeholder="Nome completo"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
                    onClick={handleGoToStripe}
                    readOnly
                  />
                </div>

                {/* País */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    País ou região
                  </label>
                  <select
                    id="country"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
                    onClick={handleGoToStripe}
                  >
                    <option>Brasil</option>
                  </select>
                </div>
              </div>

              {/* Botão de assinar */}
              <Button
                onClick={handleGoToStripe}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-lg shadow-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Assinar - {formatCurrency(planPrices[selectedPlan])}
              </Button>

              {/* Informações de segurança */}
              <div className="flex items-start gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Pagamento processado de forma segura pelo Stripe. Seus dados são criptografados e protegidos.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Renderizar tela de seleção de planos
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl my-8 bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 shadow-2xl border-2 border-purple-200 dark:border-purple-800">
        <div className="relative">
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 hover:bg-white/50 dark:hover:bg-gray-800/50"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Header */}
          <div className="p-8 sm:p-12 text-center space-y-4 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" />
            <div className="relative z-10">
              <Crown className="w-20 h-20 mx-auto mb-4 animate-pulse drop-shadow-2xl" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Desbloqueie o Premium
              </h2>
              <p className="text-lg text-purple-100">
                Transforme sua jornada de bem-estar mental
              </p>
              <Badge className="mt-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🎉 Oferta Especial - Primeiros Usuários
              </Badge>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-8 sm:p-12 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                O que você ganha com Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tudo que você precisa para cuidar da sua saúde mental
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                      <IconComponent className={`w-5 h-5 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {benefit.text}
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>
                );
              })}
            </div>

            {/* Pricing Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {/* Plano Mensal */}
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPlan === 'mensal' 
                    ? 'bg-purple-50 dark:bg-purple-900/30 border-4 border-purple-600 shadow-2xl' 
                    : 'bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 hover:shadow-2xl'
                }`}
                onClick={() => handlePlanSelect('mensal')}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Mensal
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Flexibilidade total
                      </p>
                    </div>
                    {selectedPlan === 'mensal' && (
                      <Check className="w-8 h-8 text-purple-600" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(planPrices.mensal)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Todos os benefícios Premium
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Cancele quando quiser
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Acesso imediato
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Plano Anual - Destaque */}
              <Card 
                className={`p-6 cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  selectedPlan === 'anual'
                    ? 'bg-gradient-to-br from-purple-700 to-pink-700 text-white border-4 border-yellow-400 shadow-2xl'
                    : 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-2xl'
                }`}
                onClick={() => handlePlanSelect('anual')}
              >
                <Badge className="absolute top-4 right-4 bg-yellow-400 text-gray-900 border-0">
                  🔥 Mais Popular
                </Badge>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold">
                        Anual
                      </h4>
                      <p className="text-sm text-purple-100">
                        Economize 40%
                      </p>
                    </div>
                    {selectedPlan === 'anual' && (
                      <Check className="w-8 h-8" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      {formatCurrency(planPrices.anual)}
                    </span>
                    <span className="text-purple-100">/ano</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-semibold">
                      Apenas R$ 14,99/mês
                    </p>
                    <p className="text-xs text-purple-100">
                      Você economiza R$ 178,90 por ano
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Todos os benefícios Premium
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Conteúdo exclusivo anual
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Suporte prioritário VIP
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" />
                      Acesso vitalício a atualizações
                    </li>
                  </ul>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              </Card>
            </div>

            {/* Continue Button */}
            {selectedPlan && (
              <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          Pagamento 100% Seguro via Stripe
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Seus dados estão protegidos com criptografia de nível bancário. Aceitamos cartão de crédito, débito e mais.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinueToCheckout}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg text-lg py-6"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Continuar para Pagamento
                  </Button>
                </div>
              </Card>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Pagamento 100% seguro</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>Garantia de 7 dias</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Heart className="w-4 h-4 text-pink-600" />
                <span>+10.000 usuários satisfeitos</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
