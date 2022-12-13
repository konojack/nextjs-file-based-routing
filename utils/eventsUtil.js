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

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.id === id);
}
