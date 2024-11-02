"use client"

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
  isAllDay: boolean
  isMultiDay: boolean
}

const ICAL_URL = "https://calendar.google.com/calendar/ical/f398de90eb2efc7b27f1207bbdc7acc865ab3368671406700f14d6044d17fc02%40group.calendar.google.com/private-5b580a353f359745cf2c018ad7738354/basic.ics"

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function loadEvents() {
      try {
        const fetchedEvents = await fetchICalEvents(ICAL_URL)
        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Error fetching iCal events:", error)
      }
    }

    loadEvents()
  }, [])

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" }
    const formattedDate = date.toLocaleDateString("nl-NL", options)
    
    // Capitalize the first letter of each word
    return formattedDate.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false }
    return date.toLocaleTimeString("nl-NL", options)
  }

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Aankomende Evenementen</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Evenement</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Tijd</TableHead>
              <TableHead>Locatie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.isAllDay ? (
                      formatDate(event.start) // Show only the start date for all-day events
                    ) : event.isMultiDay ? (
                      `${formatDate(event.start)} - ${formatDate(event.end)}`
                    ) : (
                      formatDate(event.start)
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {event.isAllDay || (event.start.getHours() === 0 && event.end.getHours() === 0) ? (
                      "Hele Dag" // Show "Hele Dag" for all-day events and those from 00:00 to 00:00
                    ) : (
                      `${formatTime(event.start)} - ${formatTime(event.end)}`
                    )}
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
