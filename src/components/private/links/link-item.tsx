'use client';

import { Button } from '@/components/ui/button';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2Icon, GripVerticalIcon, PencilIcon } from 'lucide-react';

import { getSocialPlatformByKey } from '@/constants/links';
import type { SocialLink, CustomLink } from '@/@types/links';
import { toggleLinkActive } from '@/lib/api/links';
import { toast } from 'sonner';
import { useLinksStore } from '@/store/useLinksStore';
import { useTheme } from 'next-themes';

interface LinkItemProps {
   link: SocialLink | CustomLink;
   type: 'social' | 'custom';
   onDelete: (id: string) => void;
   onEdit: () => void;
}

export function LinkItem({ link, type, onDelete, onEdit }: LinkItemProps) {
   const updateSocialLinkToStore = useLinksStore(
      (state) => state.updateSocialLinkToStore,
   );
   const updateCustomLinkToStore = useLinksStore(
      (state) => state.updateCustomLinkToStore,
   );
   const { resolvedTheme } = useTheme();

   const title =
      type === 'social'
         ? (getSocialPlatformByKey((link as SocialLink).platform)?.label ??
           (link as SocialLink).platform)
         : (link as CustomLink).title;

   // get social link icon
   const socialLinkIcon =
      (type === 'social' &&
         getSocialPlatformByKey((link as SocialLink).platform)?.icon) ||
      '';

   const url = link.url;
   const isActive = link.isActive;

   const handleToggleActiveState = async () => {
      try {
         const { body } = await toggleLinkActive(link._id as string, type);
         if (body.success) {
            toast.success(body.message);
            if (type === 'social') {
               updateSocialLinkToStore(body.data.link as SocialLink);
            } else {
               updateCustomLinkToStore(body.data.link as CustomLink);
            }
         }
      } catch (error) {
         toast.error(
            error instanceof Error
               ? error.message
               : 'An error occurred while toggling the link state.',
         );
      }
   };

   return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:shadow-sm">
         <GripVerticalIcon className="size-4 shrink-0 text-muted-foreground cursor-grab" />

         <div className="flex-1 min-w-0">
            <p className="flex items-center gap-1.5 font-semibold text-sm truncate">
               {'icon' in link && link.icon?.value ? (
                  link.icon.kind === 'emoji' ? (
                     <span className="shrink-0 text-base leading-none">
                        {link.icon.value}
                     </span>
                  ) : (
                     <img
                        src={link.icon.value}
                        alt=""
                        className="size-5 shrink-0 rounded object-cover"
                     />
                  )
               ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                     src={`${socialLinkIcon}?color=${encodeURIComponent(resolvedTheme === 'dark' ? '#fff' : '#000')}`}
                     alt={title}
                     width="24"
                     height="24"
                     className="size-5 shrink-0"
                  />
               )}

               <span className="truncate">{title}</span>
            </p>
            <p className="text-xs text-muted-foreground truncate">{url}</p>
         </div>

         <div className="flex items-center gap-1.5 shrink-0">
            <button
               onClick={handleToggleActiveState}
               className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
               {isActive ? 'Active' : 'Inactive'}
            </button>
            <Button
               variant="ghost"
               size="icon-sm"
               onClick={onEdit}
               className="text-muted-foreground hover:text-foreground"
            >
               <PencilIcon className="size-4" />
            </Button>
            <AlertDialog>
               <AlertDialogTrigger asChild>
                  <Button
                     variant="ghost"
                     size="icon-sm"
                     className="text-muted-foreground hover:text-destructive"
                  >
                     <Trash2Icon className="size-4" />
                  </Button>
               </AlertDialogTrigger>
               <AlertDialogContent size="default">
                  <AlertDialogHeader>
                     <AlertDialogTitle>Delete link?</AlertDialogTitle>
                     <AlertDialogDescription>
                        Are you sure you want to delete “{title}”? This action
                        cannot be undone.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel>Cancel</AlertDialogCancel>
                     <AlertDialogAction
                        variant="destructive"
                        onClick={() => link._id && onDelete(link._id)}
                     >
                        Delete
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </div>
      </div>
   );
}
