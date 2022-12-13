import fs from 'fs/promises';
import path from 'path';
import { getFeaturedEvents } from '../utils/eventsUtil';
import EventList from '../components/events/EventList';

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const fileContent = await fs.readFile(filePath);
  const data = JSON.parse(fileContent);

  const featuredEvents = getFeaturedEvents(data.products);

  return {
    props: {
      featuredEvents,
    },
  };
}

export default function HomePage({ featuredEvents }) {
  return (
    <div>
      <h1>Featured Events</h1>
      <EventList events={featuredEvents} />
    </div>
  );
}
