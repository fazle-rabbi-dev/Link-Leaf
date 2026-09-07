import type { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Settings',
};

const Settings = () => {
   return (
      <main className="max-body">
         <h1 className="heading-1">Settings</h1>
         <code>
            Upcoming: settings page with options to change your profile
            information, email, password, etc.
         </code>
      </main>
   );
};

export default Settings;
