import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../data/dummy-data';

export default function EventsPage() {
  const events = getAllEvents();
  return (
    <div>
      <EventsSearch />
      <EventList events={events} />
    </div>
  );
}
