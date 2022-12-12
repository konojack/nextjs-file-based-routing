import EventItem from './EventItem';

function EventList({ events }) {
  return (
    <ul>
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
