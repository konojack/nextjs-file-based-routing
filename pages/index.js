import { getFeaturedEvents } from '../data/dummy-data';
import EventList from '../components/events/EventList';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>Featured Events</h1>
      <EventList events={featuredEvents} />
    </div>
  );
}
