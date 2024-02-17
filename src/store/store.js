import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import matchPartsSlice from './matchPartsSlice/matchPartsSlice';

const persistConfig = {
  key: 'root',
  storage,
  // other configuration options, if needed
};

const persistedReducer = persistReducer(persistConfig, matchPartsSlice);

const store = configureStore({
  reducer: {
    matches: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;