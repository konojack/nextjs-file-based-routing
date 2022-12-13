import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents, getAllEvents } from '../../utils/eventsUtil';

export async function getStaticProps(context) {
  const filters = context.params.slug;

  const year = +filters[0];
  const month = +filters[1];

  const filteredEvents = await getFilteredEvents({
    year: year,
    month: month,
  });

  console.log(filteredEvents);
  return {
    props: {
      filteredEvents,
      year,
      month,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: ['2021', '05'] } }],
    fallback: true,
  };
}

export default function EventSlugPage({ filteredEvents, year, month }) {
  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2022 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        <div className="center">
          <ErrorAlert>
            <p>Invalid filter!</p>
          </ErrorAlert>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </div>
      </>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <div>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList events={filteredEvents} />
    </div>
  );
}
