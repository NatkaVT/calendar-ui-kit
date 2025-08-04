import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import calendarsReducer from '../entities/calendars/calendarsSlice';
import eventsReducer from '../entities/events/eventsSlice';

const rootReducer = combineReducers({
  calendars: calendarsReducer,
  events: eventsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['calendars', 'events'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
