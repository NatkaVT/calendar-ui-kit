import { configureStore } from '@reduxjs/toolkit';
import calendarsReducer from '../entities/calendars/calendarsSlice';
import eventsReducer from '../entities/events/eventsSlice';

export const store = configureStore({
  reducer: {
    calendars: calendarsReducer,
    events: eventsReducer,
  },
});
