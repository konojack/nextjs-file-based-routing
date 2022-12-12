import EventList from '../../components/events/EventList';
import { getAllEvents } from '../../data/dummy-data';

export default function EventsPage() {
  const events = getAllEvents();
  return (
    <div>
      <EventList events={events} />
    </div>
  );
}
