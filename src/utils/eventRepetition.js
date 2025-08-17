/**
 * Generates recurring events based on repetition settings
 * @param {Object} event - The base event
 * @param {Date} startDate - Start date for generation
 * @param {Date} endDate - End date for generation
 * @returns {Array} Array of generated events
 */
export const generateRecurringEvents = (event, startDate, endDate) => {
  if (!event.repeat || !event.repeat.type || event.repeat.type === 'Does not repeat') {
    return [event];
  }

  const events = [];
  const baseDate = new Date(event.date);
  let currentDate = new Date(baseDate);

  while (currentDate <= endDate) {
    if (currentDate >= startDate) {
      const newEvent = {
        ...event,
        id: `${event.id}_${currentDate.toISOString().split('T')[0]}`,
        date: currentDate.toISOString().split('T')[0],
        originalEventId: event.id
      };
      events.push(newEvent);
    }

    switch (event.repeat.type) {
      case 'Daily':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'Weekly on':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'Monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'Annually on':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        return [event];
    }
  }

  return events;
};

/**
 * Gets events for a specific date range including recurring events
 * @param {Array} events - Array of all events
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Array of events for the date range
 */
export const getEventsForDateRange = (events, startDate, endDate) => {
  const allEvents = [];
  
  const normalizedStartDate = new Date(startDate);
  normalizedStartDate.setHours(0, 0, 0, 0);
  
  const normalizedEndDate = new Date(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);
  
  events.forEach(event => {
    if (event.repeat && event.repeat.type && event.repeat.type !== 'Does not repeat') {
      const recurringEvents = generateRecurringEvents(event, normalizedStartDate, normalizedEndDate);
      allEvents.push(...recurringEvents);
    } else {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      
      if (eventDate >= normalizedStartDate && eventDate <= normalizedEndDate) {
        allEvents.push(event);
      }
    }
  });

  return allEvents;
};

/**
 * Checks if an event repeats
 * @param {Object} event - The event to check
 * @returns {boolean} True if event repeats
 */
export const isRecurringEvent = (event) => {
  return event.repeat && event.repeat.type && event.repeat.type !== 'Does not repeat';
};

/**
 * Gets repetition display text
 * @param {Object} event - The event
 * @returns {string} Display text for repetition
 */
export const getRepetitionDisplayText = (event) => {
  if (!isRecurringEvent(event)) {
    return 'Does not repeat';
  }
  return event.repeat.type;
};
