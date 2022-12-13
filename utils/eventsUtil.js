export async function getFeaturedEvents(events) {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}

export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-demo-api-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const eventsArray = [];

  for (let key in data) {
    const event = {
      id: key,
      ...data[key],
    };

    eventsArray.push(event);
  }

  return eventsArray;
}

export function getFilteredEvents(events, dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(events, id) {
  return events.find(event => event.id === id);
}
