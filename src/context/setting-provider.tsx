import { JSX, useCallback, useMemo } from 'react';

import { SettingContext } from 'src/context/setting-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { SettingContextType, SettingsType } from 'src/types/theme.type';

const defaultSettings: SettingsType = {
  themeMode: 'light'
};

type Props = {
  children: React.ReactNode;
};

export default function SettingProvider({ children }: Props): JSX.Element {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  /*settings 값 업데이트 function*/
  const onUpdate = useCallback(
    (name: string, value: string | boolean): void => {
      setSettings((prevState: any) => ({
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
    setSettings((prevState: any) => ({
      ...prevState,
      themeMode: prevState.themeMode === 'dark' ? 'light' : 'dark'
    }));
  }, [setSettings]);

  /*Setting Context 값 memozation*/
  const memoizedValue = useMemo<SettingContextType>(
    () => ({
      ...settings as SettingContextType,
      onUpdate,
      onReset,
      toggleColorMode
    }),
    [settings, onUpdate, onReset, toggleColorMode]
  );

  return <SettingContext.Provider value={memoizedValue}>{children}</SettingContext.Provider>;
}
