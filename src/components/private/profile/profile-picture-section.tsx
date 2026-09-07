import { RefreshCwIcon, SparklesIcon, CameraIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { handleRandomArt, handleSwapAvatar } from '@/lib/utils';

interface ProfilePictureSectionProps {
   avatar: string;
   setAvatar: React.Dispatch<React.SetStateAction<string>>;
   name: string;
   fileInputRef: React.RefObject<HTMLInputElement | null>;
   allowedTypes: string;
   onAvatarClick: () => void;
   onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfilePictureSection({
   avatar,
   setAvatar,
   name,
   fileInputRef,
   allowedTypes,
   onAvatarClick,
   onFileChange,
}: ProfilePictureSectionProps) {
   const initials = name
      .split(' ')
      .map((n: string) => n[0])
      .join('');

   return (
      <section className="rounded-xl border border-border p-6 mb-8">
         <h2 className="text-base font-semibold text-foreground mb-4">
            Profile Picture
         </h2>

         <div className="flex flex-col sm:flex-row items-start gap-6">
            <button
               type="button"
               onClick={onAvatarClick}
               className="relative group cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
               <Avatar size="lg" className="size-24 sm:size-28">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
                     {initials}
                  </AvatarFallback>
               </Avatar>
               <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <CameraIcon className="size-6 text-white" />
               </div>
            </button>
            <input
               ref={fileInputRef}
               type="file"
               accept={allowedTypes}
               onChange={onFileChange}
               className="hidden"
            />

            <div className="flex-1">
               <div className="flex flex-wrap gap-3 mb-3">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => handleSwapAvatar(setAvatar)}
                     className="gap-2"
                  >
                     <RefreshCwIcon className="size-4" />
                     Swap Avatar With Random Face
                  </Button>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => handleRandomArt(setAvatar)}
                     className="gap-2"
                  >
                     <SparklesIcon className="size-4" />
                     Random Abstract Art
                  </Button>
               </div>
               <p className="text-xs text-muted-foreground">
                  Click the avatar to upload your own. Max 100KB. Formats: JPG,
                  PNG, WebP, SVG.
               </p>
            </div>
         </div>
      </section>
   );
}
