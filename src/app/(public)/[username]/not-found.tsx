import Link from 'next/link';

export default function NotFound() {
   return (
      <main className="flex-center flex-col gap-6 px-4 py-20 text-center">
         <p className="text-muted-foreground">404</p>
         <h1 className="heading-3">Profile not found</h1>
         <p className="text-muted-foreground max-w-sm">
            The profile you&apos;re looking for doesn&apos;t exist or has been
            removed.
         </p>
         <Link
            href="/"
            className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
         >
            Go home
         </Link>
      </main>
   );
}
