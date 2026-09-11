import SectionHeader from './SectionHeader';

const PREVIEWS = [
   {
      src: 'http://localhost:3000/rabbi',
      title: 'fazlerabbi1343 profile preview',
   },
   {
      src: 'http://localhost:3000/antonio',
      title: 'antonio profile preview',
   },
];

const ThemePreview = () => {
   return (
      <section className="max-body mt-24">
         <SectionHeader
            heading="Designed to look spectacular on any screen"
            paragraph="Explore preset designs configured by other creators around the world."
         />

         <div className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {PREVIEWS.map((preview, i) => (
               <div
                  key={preview.src}
                  className={`relative h-[560px] w-full max-w-[280px] overflow-hidden rounded-4xl border-16 border-black bg-background ring-2 ring-violet-400/70 transition-transform duration-300 hover:rotate-0 ${i === 0 ? '-rotate-3' : 'rotate-3'}`}
               >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 z-10 w-28 -translate-x-1/2 rounded-full bg-black px-2 py-1"></div>

                  <iframe
                     src={preview.src}
                     title={preview.title}
                     loading="lazy"
                     className="h-full w-full border-0"
                  />
               </div>
            ))}
         </div>
      </section>
   );
};

export default ThemePreview;
