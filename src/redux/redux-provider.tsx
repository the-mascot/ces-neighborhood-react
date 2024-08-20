import { Provider } from 'react-redux';
import { persistor, store } from 'src/redux/store';
// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
