import { getFeaturedEvents } from '../utils/eventsUtil';
import EventList from '../components/events/EventList';
import NewsletterRegistration from '../components/input/newsletter-registration';

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default function HomePage({ featuredEvents }) {
  return (
    <div>
      <h1>Featured Events</h1>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </div>
  );
}
