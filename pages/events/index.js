import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../utils/eventsUtil';

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
}

export default function EventsPage({ allEvents }) {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={allEvents} />
    </div>
  );
}
