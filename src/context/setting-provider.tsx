import { useCallback, useEffect, useMemo, useState } from 'react';
import { SettingContextType, SettingsType } from 'src/types/theme.type';
import { SettingContext } from 'src/context/setting-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';

const defaultSettings: SettingsType = {
  themeMode: 'light'
};

type Props = {
  children: React.ReactNode;
};

export default function SettingProvider({ children }: Props) {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  /*settings 값 업데이트 function*/
  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
      setSettings((prevState: SettingsType) => ({
        ...prevState,
        [name]: value
      }));
    },
    [setSettings]
  );

  /*settings 값 reset*/
  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [defaultSettings, setSettings]);

  /*theme color 변경*/
  const toggleColorMode = useCallback(() => {
    setSettings((prevState: SettingsType) => ({
      ...prevState,
      themeMode: prevState.themeMode === 'dark' ? 'light' : 'dark'
    }));
  }, [setSettings]);

  /*Setting Context 값 memozation*/
  const memoizedValue = useMemo<SettingContextType>(
    () => ({
      ...settings,
      onUpdate,
      onReset,
      toggleColorMode
    }),
    [settings, onUpdate, onReset, toggleColorMode]
  );

  return <SettingContext.Provider value={memoizedValue}>{children}</SettingContext.Provider>;
}
