import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StyledGoogleCalendar() {
  return (
    <Card className="w-full max-w-full mx-auto">
      <CardContent className="pt-4">
        <div className="relative overflow-hidden max-w-full h-[80svh] rounded-lg border">
          <iframe 
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAmsterdam&showPrint=0&showTz=0&showTitle=0&src=ZjM5OGRlOTBlYjJlZmM3YjI3ZjEyMDdiYmRjN2FjYzg2NWFiMzM2ODY3MTQwNjcwMGYxNGQ2MDQ0ZDE3ZmMwMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342" 
            className="absolute top-0 left-0 w-full h-[80svh]"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}