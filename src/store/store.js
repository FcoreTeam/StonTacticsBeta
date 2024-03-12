import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import matchPartsSlice from './matchPartsSlice/matchPartsSlice';
import userSlice from './userSlice/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  // other configuration options, if needed
};

const persistedReducer = persistReducer(persistConfig, matchPartsSlice);

const store = configureStore({
  reducer: {
    matches: persistedReducer,
    user: userSlice
  },
});

export const persistor = persistStore(store);

export default store;