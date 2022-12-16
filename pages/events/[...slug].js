import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../utils/eventsUtil';

export async function getServerSideProps(context) {
  const filters = context.params.slug;

  const year = +filters[0];
  const month = +filters[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2022 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: year,
    month: month,
  });

  return {
    props: {
      filteredEvents,
      date: {
        year,
        month,
      },
    },
  };
}

export default function EventSlugPage({
  filteredEvents,
  date: { year, month },
  hasError,
}) {
  if (hasError) {
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
