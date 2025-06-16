import { createSlice, nanoid } from '@reduxjs/toolkit';

const defaultCalendarId = nanoid();

const initialState = {
  calendars: [
    {
      id: defaultCalendarId,
      name: 'Calendar 1',
      color: '#1976d2',
      visible: true,
      isDefault: true,
    },
  ],
};

const calendarsSlice = createSlice({
  name: 'calendars',
  initialState,
  reducers: {
    addCalendar: {
      reducer(state, action) {
        state.calendars.push(action.payload);
      },
      prepare(name, color) {
        return {
          payload: {
            id: nanoid(),
            name,
            color,
            visible: true,
            isDefault: false,
          },
        };
      },
    },
    editCalendar(state, action) {
      const { id, name, color } = action.payload;
      const calendar = state.calendars.find((cal) => cal.id === id);
      if (calendar) {
        calendar.name = name;
        calendar.color = color;
      }
    },
    deleteCalendar(state, action) {
      const id = action.payload;
      const calendar = state.calendars.find((cal) => cal.id === id);
      if (calendar && !calendar.isDefault) {
        state.calendars = state.calendars.filter((cal) => cal.id !== id);
      }
    },
    toggleCalendarVisibility(state, action) {
      const id = action.payload;
      const calendar = state.calendars.find((cal) => cal.id === id);
      if (calendar) {
        calendar.visible = !calendar.visible;
      }
    },
  },
});

export const {
  addCalendar,
  editCalendar,
  deleteCalendar,
  toggleCalendarVisibility,
} = calendarsSlice.actions;

export default calendarsSlice.reducer;
export { defaultCalendarId };
