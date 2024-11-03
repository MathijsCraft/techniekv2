import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StyledGoogleCalendar() {
  return (
    <Card className='mx-auto w-full max-w-full'>
      <CardContent className='pt-4'>
        <div className='relative h-[80svh] max-w-full overflow-hidden rounded-lg border'>
          <iframe
            src='https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAmsterdam&showPrint=0&showTz=0&showTitle=0&src=ZjM5OGRlOTBlYjJlZmM3YjI3ZjEyMDdiYmRjN2FjYzg2NWFiMzM2ODY3MTQwNjcwMGYxNGQ2MDQ0ZDE3ZmMwMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342'
            className='absolute left-0 top-0 h-[80svh] w-full'
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
