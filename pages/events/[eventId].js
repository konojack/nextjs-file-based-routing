import fs from 'fs/promises';
import path from 'path';
import EventContent from '../../components/event-detail/EventContent';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventSummary from '../../components/event-detail/EventSummary';
import { getEventById } from '../../utils/eventsUtil';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const fileContent = await fs.readFile(filePath);
  const data = JSON.parse(fileContent);

  const allIds = data.products.map(product => ({
    params: { eventId: product.id },
  }));

  return {
    paths: allIds,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const fileContent = await fs.readFile(filePath);
  const data = JSON.parse(fileContent);

  const eventId = context.params.eventId;

  const event = getEventById(data.products, eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
  };
}

export default function EventIdPage({ event }) {
  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
