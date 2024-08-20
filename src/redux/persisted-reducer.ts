import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducer from 'src/redux/root-reducer';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
