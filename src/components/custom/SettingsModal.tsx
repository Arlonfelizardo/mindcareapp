'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  X, 
  Bell, 
  Moon, 
  Volume2, 
  Shield, 
  Trash2,
  Download,
  Settings as SettingsIcon,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      dailyReminder: true,
      exerciseReminder: true,
      reminderTime: '09:00'
    },
    appearance: {
      darkMode: false,
      fontSize: 16
    },
    audio: {
      enabled: true,
      volume: 70
    },
    privacy: {
      shareData: false,
      analytics: true
    }
  });

  const handleToggle = (category: keyof typeof settings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !(prev[category] as any)[key]
      }
    }));
    toast.success('Configuração atualizada!');
  };

  const handleVolumeChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      audio: {
        ...prev.audio,
        volume: value[0]
      }
    }));
  };

  const handleFontSizeChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        fontSize: value[0]
      }
    }));
  };

  const handleSaveSettings = () => {
    toast.success('Todas as configurações foram salvas! ✅');
    onClose();
  };

  const handleExportData = () => {
    toast.success('Seus dados foram exportados com sucesso! 📥');
  };

  const handleDeleteAccount = () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      toast.error('Conta excluída. Sentiremos sua falta! 😢');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8 bg-white dark:bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Configurações</h2>
              <p className="text-sm text-purple-100">Personalize sua experiência</p>
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

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Notificações */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Notificações
              </h3>
            </div>

            <div className="space-y-4 pl-7">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="push" className="font-medium text-gray-800 dark:text-gray-100">
                    Notificações Push
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receba lembretes e atualizações no seu dispositivo
                  </p>
                </div>
                <Switch
                  id="push"
                  checked={settings.notifications.push}
                  onCheckedChange={() => handleToggle('notifications', 'push')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="email" className="font-medium text-gray-800 dark:text-gray-100">
                    Notificações por E-mail
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receba resumos semanais e novidades
                  </p>
                </div>
                <Switch
                  id="email"
                  checked={settings.notifications.email}
                  onCheckedChange={() => handleToggle('notifications', 'email')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="daily" className="font-medium text-gray-800 dark:text-gray-100">
                    Lembrete Diário
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lembre-me de registrar meu humor todos os dias
                  </p>
                </div>
                <Switch
                  id="daily"
                  checked={settings.notifications.dailyReminder}
                  onCheckedChange={() => handleToggle('notifications', 'dailyReminder')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="exercise" className="font-medium text-gray-800 dark:text-gray-100">
                    Lembrete de Exercícios
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sugestões de exercícios baseados no seu humor
                  </p>
                </div>
                <Switch
                  id="exercise"
                  checked={settings.notifications.exerciseReminder}
                  onCheckedChange={() => handleToggle('notifications', 'exerciseReminder')}
                />
              </div>
            </div>
          </section>

          {/* Aparência */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Aparência
              </h3>
            </div>

            <div className="space-y-4 pl-7">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="darkMode" className="font-medium text-gray-800 dark:text-gray-100">
                    Modo Escuro
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ative o tema escuro para reduzir cansaço visual
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={() => handleToggle('appearance', 'darkMode')}
                />
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium text-gray-800 dark:text-gray-100">
                    Tamanho da Fonte
                  </Label>
                  <span className="text-sm font-medium text-purple-600">
                    {settings.appearance.fontSize}px
                  </span>
                </div>
                <Slider
                  value={[settings.appearance.fontSize]}
                  onValueChange={handleFontSizeChange}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Ajuste o tamanho do texto para melhor legibilidade
                </p>
              </div>
            </div>
          </section>

          {/* Áudio */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Áudio
              </h3>
            </div>

            <div className="space-y-4 pl-7">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="audio" className="font-medium text-gray-800 dark:text-gray-100">
                    Áudio Habilitado
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sons e músicas nas meditações
                  </p>
                </div>
                <Switch
                  id="audio"
                  checked={settings.audio.enabled}
                  onCheckedChange={() => handleToggle('audio', 'enabled')}
                />
              </div>

              {settings.audio.enabled && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-gray-800 dark:text-gray-100">
                      Volume
                    </Label>
                    <span className="text-sm font-medium text-purple-600">
                      {settings.audio.volume}%
                    </span>
                  </div>
                  <Slider
                    value={[settings.audio.volume]}
                    onValueChange={handleVolumeChange}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Privacidade */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Privacidade e Dados
              </h3>
            </div>

            <div className="space-y-4 pl-7">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="share" className="font-medium text-gray-800 dark:text-gray-100">
                    Compartilhar Dados
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ajude-nos a melhorar compartilhando dados anônimos
                  </p>
                </div>
                <Switch
                  id="share"
                  checked={settings.privacy.shareData}
                  onCheckedChange={() => handleToggle('privacy', 'shareData')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="analytics" className="font-medium text-gray-800 dark:text-gray-100">
                    Analytics
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permitir coleta de dados de uso do app
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.privacy.analytics}
                  onCheckedChange={() => handleToggle('privacy', 'analytics')}
                />
              </div>

              <Button
                onClick={handleExportData}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar Meus Dados
              </Button>
            </div>
          </section>

          {/* Zona de Perigo */}
          <section className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
                Zona de Perigo
              </h3>
            </div>

            <div className="pl-7">
              <Button
                onClick={handleDeleteAccount}
                variant="destructive"
                className="w-full justify-start gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Excluir Conta Permanentemente
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Esta ação não pode ser desfeita. Todos os seus dados serão perdidos.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 border-t bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
