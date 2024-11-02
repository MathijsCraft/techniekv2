'use client'
import { useEffect, useState } from "react"
import { fetchICalEvents } from "@/lib/googleCalendar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

type Event = {
  id: string
  title: string
  start: Date
  end: Date
  location: string
}

const ICAL_URL = "https://calendar.google.com/calendar/ical/f398de90eb2efc7b27f1207bbdc7acc865ab3368671406700f14d6044d17fc02%40group.calendar.google.com/private-5b580a353f359745cf2c018ad7738354/basic.ics"

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function loadEvents() {
      const fetchedEvents = await fetchICalEvents(ICAL_URL)
      setEvents(fetchedEvents)
    }

    loadEvents()
  }, [])

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
    return date.toLocaleTimeString("en-US", options)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Your upcoming events from iCal feed.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(event.start)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </div>
                </TableCell>
                <TableCell>{event.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
