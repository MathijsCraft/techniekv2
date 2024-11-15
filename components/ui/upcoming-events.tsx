'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ICAL from 'ical.js';

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
  isAllDay: boolean;
  isMultiDay: boolean;
};

const ICAL_URL =
  'https://calendar.google.com/calendar/ical/f398de90eb2efc7b27f1207bbdc7acc865ab3368671406700f14d6044d17fc02%40group.calendar.google.com/private-5b580a353f359745cf2c018ad7738354/basic.ics';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch(
          `/api/fetch-ical?url=${encodeURIComponent(ICAL_URL)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch iCal data');
        }

        const data = await response.json();
        const parsedEvents = parseICalData(data.icalData);

        // Filter and sort events
        const now = new Date();
        const upcomingEvents = parsedEvents.filter((event) => event.end >= now); // Only include events that haven't ended
        upcomingEvents.sort((a, b) => a.start.getTime() - b.start.getTime()); // Sort by start date

        setEvents(upcomingEvents);
      } catch (error) {
        setError('Error fetching iCal events');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  function parseICalData(icalData: string): Event[] {
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const events: Event[] = vevents.map((vevent) => {
      const event = new ICAL.Event(vevent);
      const start = event.startDate.toJSDate();
      const end = event.endDate.toJSDate();

      // If the event ends on the next day, subtract one day to ensure it ends on the correct day
      if (end.getHours() === 0 && end.getMinutes() === 0) {
        end.setDate(end.getDate() - 1);
      }

      // Ensure the dates are valid JavaScript Date objects
      if (!(start instanceof Date) || isNaN(start.getTime())) {
        console.error('Invalid start date:', start);
      }
      if (!(end instanceof Date) || isNaN(end.getTime())) {
        console.error('Invalid end date:', end);
      }

      // Determine if the event is an all-day event
      const isAllDay =
        start.getHours() === 0 &&
        end.getHours() === 0 &&
        start.getDate() === end.getDate() - 1;

      // Determine if it's a multi-day event by checking if the end date is different
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

    return events;
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('nl-NL', options);
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return date.toLocaleTimeString('nl-NL', options);
  };

  // Format multi-day events correctly
  const formatMultiDayEvent = (start: Date, end: Date): string => {
    const startDate = formatDate(start);
    const endDate = formatDate(end);

    // If the event ends on the same day, just return the start date
    if (startDate === endDate) {
      return startDate;
    }

    // Special handling for multi-day events where the end date might be the next day
    const startMonth = start.getMonth();
    const startYear = start.getFullYear();
    const endMonth = end.getMonth();
    const endYear = end.getFullYear();

    // If the event is in the same month and year, we show the range
    if (startMonth === endMonth && startYear === endYear) {
      return `${startDate} - ${endDate}`;
    }

    // Otherwise, ensure we don't incorrectly add an extra day
    return `${startDate} - ${endDate}`;
  };

  if (loading) {
    return (
      <Card className='mx-auto w-full max-w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Aankomende Evenementen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px]'>Evenement</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Tijd</TableHead>
                <TableHead>Locatie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Skeleton Loader Rows */}
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className='h-4 w-3/4 rounded bg-gray-200' />
                  </TableCell>
                  <TableCell>
                    <div className='h-4 w-2/3 rounded bg-gray-200' />
                  </TableCell>
                  <TableCell>
                    <div className='h-4 w-1/2 rounded bg-gray-200' />
                  </TableCell>
                  <TableCell>
                    <div className='h-4 w-1/2 rounded bg-gray-200' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className='mx-auto w-full max-w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Aankomende Evenementen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Evenement</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Tijd</TableHead>
              <TableHead>Locatie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className='font-medium'>{event.title}</TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4' />
                    {event.isAllDay
                      ? formatDate(event.start)
                      : event.isMultiDay
                        ? formatMultiDayEvent(event.start, event.end)
                        : formatDate(event.start)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Clock className='mr-2 h-4 w-4' />
                    {event.isAllDay ||
                    (event.start.getHours() === 0 && event.end.getHours() === 0)
                      ? 'Hele Dag'
                      : `${formatTime(event.start)} - ${formatTime(event.end)}`}
                  </div>
                </TableCell>
                <TableCell>{event.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
