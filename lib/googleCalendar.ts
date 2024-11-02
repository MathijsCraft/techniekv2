import ICAL from 'ical.js';

// Function to fetch and parse iCal data
export async function fetchICalEvents(icalUrl: string) {
  const response = await fetch(
    `/api/fetch-ical?url=${encodeURIComponent(icalUrl)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch iCal events');
  }

  const { icalData } = await response.json();
  const jcalData = ICAL.parse(icalData);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  const events = vevents.map((vevent) => {
    const event = new ICAL.Event(vevent);
    const start = event.startDate.toJSDate();
    const end = event.endDate.toJSDate();

    // Determine if the event is an all-day event
    const isAllDay =
      start.getHours() === 0 &&
      end.getHours() === 0 &&
      start.getDate() === end.getDate() - 1;

    const isMultiDay =
      end.getDate() !== start.getDate() ||
      end.getMonth() !== start.getMonth() ||
      end.getFullYear() !== start.getFullYear();

    return {
      id: event.uid,
      title: event.summary,
      start,
      end,
      location: event.location || 'Penta Jacob van Liesveldt',
      isAllDay,
      isMultiDay,
    };
  });

  // Get current date and time
  const now = new Date();

  // Filter out past events and sort events by start date
  return events
    .filter((event) => event.end >= now) // Only include events that haven't ended
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}
