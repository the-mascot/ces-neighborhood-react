export type SettingsType = {
  themeMode: 'light' | 'dark';
};

export type SettingContextType = {
  themeMode: 'light' | 'dark';
  onUpdate: (name: string, value: string | boolean) => void;
  onReset: () => void;
  toggleColorMode: () => void;
};
