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
import { PartyPopper, TriangleAlert } from 'lucide-react';

export default function Page() {
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
                  <BreadcrumbPage>Inventaris</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <h2 className='ml-4 text-2xl font-bold'>Inventaris Meldingen</h2>
          <div className='grid auto-rows-min grid-cols-2 gap-4'>
            <div>
              <Alert variant='default' className='my-3'>
                <PartyPopper className='h-4 w-4' />
                <AlertTitle>Nieuwe lamp toegevoegd!</AlertTitle>
                <AlertDescription>
                  Er is een nieuwe lamp toegevoegd aan de database!
                </AlertDescription>
              </Alert>
            </div>
            <div>
              <Alert variant='destructive' className='my-3'>
                <TriangleAlert className='h-4 w-4' />
                <AlertTitle>Nieuwe defect melding!</AlertTitle>
                <AlertDescription>Een lamp is defect gemeld!</AlertDescription>
              </Alert>
            </div>
          </div>
          <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
