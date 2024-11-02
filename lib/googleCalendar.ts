import ICAL from "ical.js"

// Function to fetch and parse iCal data through the Next.js API route
export async function fetchICalEvents(icalUrl: string) {
  const response = await fetch(`/api/fetch-ical?url=${encodeURIComponent(icalUrl)}`)
  if (!response.ok) {
    throw new Error("Failed to fetch iCal events")
  }
  
  const icalData = await response.text()
  const jcalData = ICAL.parse(icalData)
  const comp = new ICAL.Component(jcalData)
  const vevents = comp.getAllSubcomponents("vevent")

  const events = vevents.map((vevent) => {
    const event = new ICAL.Event(vevent)
    return {
      id: event.uid,
      title: event.summary,
      start: event.startDate.toJSDate(),
      end: event.endDate.toJSDate(),
      location: event.location || "Penta Jacob van Liesveldt",
    }
  })

  return events
}