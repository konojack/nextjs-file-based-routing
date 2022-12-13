import fs from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../utils/eventsUtil';

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const fileContent = await fs.readFile(filePath);
  const data = JSON.parse(fileContent);

  const allEvents = getAllEvents(data.products);

  return {
    props: {
      allEvents,
    },
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
