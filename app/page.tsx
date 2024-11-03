import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#0066CC] p-4 md:h-52">
        <Image
          src="/penta-jacobvliesveldt-wit.png"
          width={367}
          height={60}
          alt="JL Penta logo"
          className="h-auto w-auto pl-4 object-contain"
        />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Welkom bij het Techniek Team van<br/></strong><a href="https://jl.penta.nl" className="text-[#0066CC]">
              Penta College Jacob van Liesveldt
            </a>
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0080FF] md:text-base"
          >
            <span>Open Dashboard</span> <ArrowRight className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="relative flex items-center justify-center p-6 md:w-3/5">
          {/* First image with slight overlap */}
          <Image
            src="/wolfmix.jpg"
            width={700}
            height={532}
            className="rounded-lg object-cover"
            alt="JL Penta project showcase"
          />
          {/* Second image positioned to overlap the first */}
          <Image
            src="/mengtafel.jpg"
            width={550}
            height={416}
            className="rounded-lg object-cover absolute top-5 left-5 z-10"
            alt="Second project showcase"
          />
        </div>
      </div>
    </main>
  );
}
