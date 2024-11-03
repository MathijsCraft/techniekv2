import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import UpcomingEvents from '@/components/ui/upcoming-events';
import Link from 'next/link';

export default function Page2() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/dashboard/'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Start</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <UpcomingEvents />
          <div>
            <h2 className='text-2xl font-bold'>Meldingen</h2>
            <Alert variant='destructive' className='my-3'>
              <TriangleAlert className='h-4 w-4' />
              <AlertTitle>!! Let Op !!</AlertTitle>
              <AlertDescription>
                Er zijn nog steeds defecte fixtures. Dien zo snel mogelijk een
                reparatieverzoek in.
              </AlertDescription>
            </Alert>
            <Alert variant='default' className='my-3'>
              <TriangleAlert className='h-4 w-4' />
              <AlertTitle>Nieuw Evenement</AlertTitle>
              <AlertDescription>
                Er is een nieuw evenement aangevraagd! Bekijk het formulier bij{' '}
                <Link className='font-bold' href='/dashboard/berichten/'>
                  Berichten
                </Link>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
