declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        expand: () => void;
        ready: () => void;
      };
    };
  }
}

export function getTelegramInitData(): string | null {
  try {
    return import.meta.env.DEV ? 'mock_init_data' : window.Telegram?.WebApp?.initData || null;
  } catch (error) {
    // Not running inside telegram
  }
  return import.meta.env.DEV ? 'mock_init_data' : null;
}
