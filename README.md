## Web Calendar

### Project Description
This is a comprehensive web calendar application built with React and Redux. The project demonstrates the creation of a full-featured calendar system with event management, multiple calendar support, and recurring events functionality.

### Technologies Used

**Core Technologies:**
- **React 19.1.0** - main library for user interface
- **Redux Toolkit 2.8.2** - state management
- **Redux Persist 6.0.0** - data persistence in localStorage
- **React Day Picker 9.7.0** - calendar component library
- **FontAwesome** - icon library integration

**Architecture & Structure:**
- **Feature-Sliced Design (FSD)** - organized by entities and features
- **Redux Store** - centralized state management
- **LocalStorage Persistence** - data persistence between sessions

### Key Features

**Calendar Management:**
- **Multiple Calendars** - create, edit, and manage multiple calendars
- **Calendar Visibility** - toggle calendar visibility
- **Color Coding** - each calendar has its own color
- **Default Calendar** - system with default calendar creation

**Event Management:**
- **Event Creation** - add new events with detailed information
- **Event Editing** - modify existing events
- **Event Deletion** - remove events with confirmation
- **Recurring Events** - support for daily, weekly, monthly, and annual repetition
- **Event Details** - comprehensive event information display

**View Modes:**
- **Week View** - 7-day calendar view with hourly slots
- **Day View** - detailed single-day schedule
- **Navigation** - previous/next week/day navigation
- **Today Button** - quick navigation to current date

**Advanced Features:**
- **Current Time Indicator** - real-time position indicator
- **Event Modals** - detailed event creation and editing
- **Calendar Modals** - calendar management interface
- **Toast Notifications** - user feedback system
- **Responsive Design** - mobile-friendly interface

### Project Structure
```
src/
├── entities/           # Business logic entities
│   ├── events/        # Event management
│   └── calendars/     # Calendar management
├── pages/             # Page components
│   └── CalendarView/  # Main calendar interface
├── app/               # Application configuration
├── ui-kit/            # Reusable UI components
├── utils/             # Utility functions
└── components/        # Calendar-specific components
```

### Implementation Highlights
- **Redux Persist** - automatic data persistence
- **Event Repetition Logic** - sophisticated recurring event generation
- **Date Range Management** - efficient event filtering by date
- **Modal System** - comprehensive modal management
- **Real-time Updates** - live calendar updates
- **Accessibility** - keyboard navigation and ARIA support

This project demonstrates the creation of a professional calendar application with advanced event management capabilities, multiple calendar support, and a robust state management system suitable for production use.
