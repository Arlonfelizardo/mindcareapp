// Configurações de pagamento para o app
export interface PaymentConfig {
  pixKey: string;
  stripeAccountId?: string;
  mercadoPagoAccountId?: string;
  bankAccount?: {
    bank: string;
    agency: string;
    account: string;
  };
}

// Simular salvamento de configuração de pagamento
export function savePaymentConfig(config: PaymentConfig): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aqui você integraria com seu backend
      localStorage.setItem('payment_config', JSON.stringify(config));
      resolve(true);
    }, 1000);
  });
}

// Recuperar configuração de pagamento
export function getPaymentConfig(): PaymentConfig | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('payment_config');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Validar chave PIX
export function validatePixKey(key: string): boolean {
  if (!key) return false;
  
  // CPF: 11 dígitos
  if (/^\d{11}$/.test(key.replace(/\D/g, ''))) return true;
  
  // CNPJ: 14 dígitos
  if (/^\d{14}$/.test(key.replace(/\D/g, ''))) return true;
  
  // Email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) return true;
  
  // Telefone: +55 + DDD + número
  if (/^\+?55\d{10,11}$/.test(key.replace(/\D/g, ''))) return true;
  
  // Chave aleatória (UUID)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key)) return true;
  
  return false;
}

// Formatar valor em reais
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Calcular comissão da plataforma (exemplo: 5%)
export function calculatePlatformFee(amount: number, feePercentage: number = 5): number {
  return amount * (feePercentage / 100);
}

// Calcular valor líquido que o vendedor receberá
export function calculateNetAmount(amount: number, feePercentage: number = 5): number {
  return amount - calculatePlatformFee(amount, feePercentage);
}
