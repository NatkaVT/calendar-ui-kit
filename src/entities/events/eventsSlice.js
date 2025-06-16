import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: {
      reducer(state, action) {
        state.events.push(action.payload);
      },
      prepare(event) {
        return {
          payload: {
            id: nanoid(),
            ...event,
          },
        };
      },
    },
    editEvent(state, action) {
      const { id, updates } = action.payload;
      const event = state.events.find((e) => e.id === id);
      if (event) {
        Object.assign(event, updates);
      }
    },
    deleteEvent(state, action) {
      const id = action.payload;
      state.events = state.events.filter((e) => e.id !== id);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
