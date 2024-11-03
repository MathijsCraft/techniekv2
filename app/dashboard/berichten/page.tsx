'use client';

import * as React from 'react';
import {
  AlertCircle,
  Download,
  FileText,
  Mail,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface EquipmentData {
  id: string;
  number: string;
  type: string;
  status: string;
}

interface Message {
  id: number;
  type: 'alert' | 'request';
  sender: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  equipmentData?: EquipmentData[];
}

const messages: Message[] = [
  {
    id: 1,
    type: 'alert',
    sender: 'Quality Control',
    subject: 'Item XYZ123 Marked as Defective',
    preview: 'The item XYZ123 has been flagged as defective...',
    content:
      'The item XYZ123 has been flagged as defective during our latest quality check. This item was previously marked as non-defective. Please review the attached report for more details and take necessary actions.',
    time: '10:30 AM',
    equipmentData: [
      { id: 'XYZ123', number: '001', type: 'Laptop', status: 'Defective' },
    ],
  },
  {
    id: 2,
    type: 'request',
    sender: 'John Doe',
    subject: 'New Equipment Request',
    preview: 'Requesting approval for new laptop...',
    content:
      'I am requesting approval for a new laptop to replace my current one, which is over 5 years old and no longer meeting performance requirements. The specifications for the requested laptop are as follows: [specs here]. Please review and approve at your earliest convenience.',
    time: '11:45 AM',
  },
  {
    id: 3,
    type: 'alert',
    sender: 'Quality Control',
    subject: 'Item ABC789 Marked as Defective',
    preview: 'The item ABC789 has been flagged as defective...',
    content:
      'The item ABC789 has been flagged as defective during our latest quality check. This item was previously marked as non-defective. Please review the attached report for more details and take necessary actions.',
    time: '1:15 PM',
    equipmentData: [
      { id: 'ABC789', number: '002', type: 'Monitor', status: 'Defective' },
    ],
  },
  {
    id: 4,
    type: 'request',
    sender: 'Jane Smith',
    subject: 'Software License Request',
    preview: 'Requesting approval for new design software...',
    content:
      "I am requesting approval for a new design software license to improve our team's productivity. The software in question is [software name] and the cost is [cost]. This will greatly enhance our ability to create high-quality designs efficiently.",
    time: '2:30 PM',
  },
];

function DefectiveEquipmentTable({ data }: { data: EquipmentData[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nummer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.number}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(
    null
  );

  const downloadPDF = (message: Message) => {
    // In a real application, this would generate and download a PDF
    console.log(`Downloading PDF for message: ${message.id}`);
    alert('PDF download started (simulated)');
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col overflow-hidden">
        <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
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
                  <BreadcrumbPage>Berichten</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 overflow-hidden'>
          <div className='w-full border-r md:w-1/3 flex flex-col'>
            <div className='p-4'>
              <form>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input placeholder='Zoeken naar berichten' className='pl-8' />
                </div>
              </form>
            </div>
            <ScrollArea className='flex-1'>
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className='cursor-pointer rounded-none'
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className='p-4'>
                    <div className='mb-2 flex items-center justify-between'>
                      <h3 className='flex items-center font-semibold'>
                        {message.type === 'alert' ? (
                          <AlertCircle className='mr-2 h-4 w-4 text-red-500' />
                        ) : (
                          <FileText className='mr-2 h-4 w-4 text-blue-500' />
                        )}
                        {message.sender}
                      </h3>
                      <span className='text-sm text-muted-foreground'>
                        {message.time}
                      </span>
                    </div>
                    <h4 className='mb-1 font-medium'>{message.subject}</h4>
                    <p className='truncate text-sm text-muted-foreground'>
                      {message.preview}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
          <div className='hidden flex-col p-4 md:flex md:w-2/3 overflow-auto'>
            {selectedMessage ? (
              <>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-2xl font-bold'>
                    {selectedMessage.subject}
                  </h2>
                  {selectedMessage.type === 'request' && (
                    <Button onClick={() => downloadPDF(selectedMessage)}>
                      <Download className='mr-2 h-4 w-4' />
                      Download PDF
                    </Button>
                  )}
                </div>
                <div className='mb-4 flex items-center justify-between'>
                  <span className='font-semibold'>
                    {selectedMessage.sender}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {selectedMessage.time}
                  </span>
                </div>
                <Separator className='my-4' />
                <p className='mb-4'>{selectedMessage.content}</p>
                {selectedMessage.type === 'alert' && selectedMessage.equipmentData && (
                  <div className='mt-4'>
                    <h3 className='text-lg font-semibold mb-2'>Defecte Apparatuur Details</h3>
                    <DefectiveEquipmentTable data={selectedMessage.equipmentData} />
                  </div>
                )}
              </>
            ) : (
              <div className='flex h-full items-center justify-center text-muted-foreground'>
                Klik op een bericht om het te openen
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='fixed bottom-4 right-4 md:hidden'
          >
            <Mail className='mr-2 h-4 w-4' />
            Bekijk bericht
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  {selectedMessage.sender} - {selectedMessage.time}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className='h-[300px] mt-4'>
                <p className='mb-4'>{selectedMessage.content}</p>
                {selectedMessage.type === 'alert' && selectedMessage.equipmentData && (
                  <div className='mt-4'>
                    <h3 className='text-lg font-semibold mb-2'>Defecte Apparatuur Details</h3>
                    <DefectiveEquipmentTable data={selectedMessage.equipmentData} />
                  </div>
                )}
              </ScrollArea>
              {selectedMessage.type === 'request' && (
                <Button
                  onClick={() => downloadPDF(selectedMessage)}
                  className='w-full mt-4'
                >
                  <Download className='mr-2 h-4 w-4' />
                  Download PDF
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}