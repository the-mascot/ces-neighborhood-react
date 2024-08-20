import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from 'src/redux/persisted-reducer';

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'] // redux-persist 관련 액션 무시
      }
    });
  }
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
