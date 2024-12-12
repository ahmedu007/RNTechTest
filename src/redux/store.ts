import { MMKV } from 'react-native-mmkv';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore, Storage } from 'redux-persist';
import promise from 'redux-promise-middleware';

import rootReducer from './reducers';

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['user'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Create the store
const store = createStore(persistedReducer, applyMiddleware(promise));

// Create a persistor for the store
const persistor = persistStore(store);

export { store, persistor };
