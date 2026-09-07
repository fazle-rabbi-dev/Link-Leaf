import { FEATURES } from '@/constants/marketing';
import { Card } from '../../ui/card';
import FeatureDemo from './FeatureDemo';
import SectionHeader from './SectionHeader';

const Features = () => {
   return (
      <section className="max-body mt-24">
         <SectionHeader
            heading="A builder designed for instant gratification"
            paragraph="Interact with the live snippets below to experience how Leaf works before you even sign up."
         />

         {/* Features Grid */}
         <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
               <Card
                  key={feature.title}
                  className="flex flex-col justify-between gap-6 p-4 transition-transform duration-300 ease-in-out hover:scale-101"
               >
                  <div>
                     <div className="flex-center h-12 w-12 justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                     </div>
                     <div className="mt-4 space-y-2">
                        <h3 className="text-lg">{feature.title}</h3>
                        <p className="leading-relaxed text-muted-foreground">
                           {feature.description}
                        </p>
                     </div>
                  </div>

                  {/* Demo Interaction */}
                  <Card className="bg-muted/70">
                     <FeatureDemo name={feature.name} />
                  </Card>
               </Card>
            ))}
         </div>
      </section>
   );
};

export default Features;
