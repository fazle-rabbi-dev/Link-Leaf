import type { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Analytics',
};

const Analytics = () => {
   return (
      <main className="max-body">
         <h1 className="heading-1">Analytics</h1>
         <code>
            Upcoming: analytics page with graphs and charts for the LinkLeaf
         </code>
      </main>
   );
};

export default Analytics;
