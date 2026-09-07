'use client';

import { useState } from 'react';
import { PlusIcon, LinkIcon, UserIcon } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { SocialLinksModal } from '@/components/private/links/social-links-modal';
import { SocialLinkFormModal } from '@/components/private/links/social-link-form-modal';
import { CustomLinkFormModal } from '@/components/private/links/custom-link-form-modal';
import { LinkItem } from '@/components/private/links/link-item';
import type { CustomLinkSaveHandler, SaveSocialLink } from '@/@types/links';
import { SOCIAL_PLATFORMS, type SocialPlatform } from '@/constants/links';
import { Spinner } from '@/components/ui/spinner';
import {
   addCustomLink,
   addSocialLink,
   deleteCustomLink,
   deleteSocialLink,
   updateCustomLink,
   updateSocialLink,
} from '@/lib/api/links';
import { toast } from 'sonner';
import { useLinksStore } from '@/store/useLinksStore';
import { cn } from '@/lib/utils';
import { useAppearanceStore } from '@/store/useAppearanceStore';

const LinksClient = () => {
   // -----------------------------------------------------------------------------
   // Zustand state
   // -----------------------------------------------------------------------------
   const isLoading = useAuthStore((state) => state.isLoading);
   const {
      socialLinks,
      customLinks,
      addSocialLinkToStore,
      updateSocialLinkToStore,
      deleteSocialLinkToStore,

      addCustomLinkToStore,
      updateCustomLinkToStore,
      deleteCustomLinkToStore,
   } = useLinksStore(
      useShallow((state) => ({
         socialLinks: state.socialLinks,
         customLinks: state.customLinks,
         addSocialLinkToStore: state.addSocialLinkToStore,
         updateSocialLinkToStore: state.updateSocialLinkToStore,
         deleteSocialLinkToStore: state.deleteSocialLinkToStore,

         addCustomLinkToStore: state.addCustomLinkToStore,
         updateCustomLinkToStore: state.updateCustomLinkToStore,
         deleteCustomLinkToStore: state.deleteCustomLinkToStore,
      })),
   );
   const showPreview = useAppearanceStore((s) => s.showPreview);

   // Modal state
   const [socialPickerOpen, setSocialPickerOpen] = useState(false);
   const [socialFormOpen, setSocialFormOpen] = useState(false);
   const [customFormOpen, setCustomFormOpen] = useState(false);
   const [selectedPlatform, setSelectedPlatform] =
      useState<SocialPlatform | null>(null);

   // Edit state
   const [editSocialIndex, setEditSocialIndex] = useState<number | null>(null);
   const [editCustomIndex, setEditCustomIndex] = useState<number | null>(null);

   // -----------------------------------------------------------------------------
   // Crud Handler Functions: add + edit inside save
   // -----------------------------------------------------------------------------
   // ---------------- Social Links ----------------
   const handleSocialSave = async (link: SaveSocialLink) => {
      const shouldUpdate = editSocialIndex !== null;

      if (shouldUpdate) {
         try {
            const { body } = await updateSocialLink(
               link._id as string,
               link.platform,
               link.url,
            );

            if (body.success) {
               toast.success(body.message);
               updateSocialLinkToStore(body.data.link);
            } else {
               throw body.message;
            }
         } catch (error) {
            if (error instanceof Error)
               return toast.error('You might have no internet connection');

            toast.error(error as string);
         }
         return;
      }

      // new link add
      try {
         const { body } = await addSocialLink(link.platform, link.url);

         if (body.success) {
            toast.success(body.message);
            addSocialLinkToStore(body.data.link);
         } else {
            throw body.message;
         }
      } catch (error) {
         if (error instanceof Error)
            return toast.error('You might have no internet connection');

         toast.error(error as string);
      }
   };

   const handleDeleteSocial = async (id: string) => {
      try {
         const { body } = await deleteSocialLink(id);
         if (body.success) {
            toast.success(body.message);
            deleteSocialLinkToStore(id);
         } else {
            throw body.message;
         }
      } catch (error) {
         if (error instanceof Error)
            return toast.error('You might have no internet connection');

         toast.error(error as string);
      }
   };

   // ---------------- Custom Links ----------------
   const handleCustomSave: CustomLinkSaveHandler = async (
      link,
      iconFile,
      shouldRemoveIcon,
   ) => {
      // URL validation
      try {
         const parsed = new URL(link.url);
         if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
      } catch {
         toast.error('Please enter a valid URL (https://example.com)');
         return;
      }

      const shouldUpdate = editCustomIndex !== null;

      if (shouldUpdate) {
         try {
            const { body } = await updateCustomLink({
               id: link._id as string,
               title: link.title,
               url: link.url,
               icon: link.icon,
               iconFile,
               shouldRemoveIcon,
            });

            if (body.success) {
               toast.success(body.message);
               updateCustomLinkToStore(body.data.link);
            } else {
               throw body.message;
            }
         } catch (error) {
            if (error instanceof Error)
               return toast.error('You might have no internet connection');

            toast.error(error as string);
         }
         return;
      }

      //  new link add
      // when icon and iconFile not present than values are undefined
      try {
         const { body } = await addCustomLink({
            title: link.title,
            url: link.url,
            icon: link.icon,
            iconFile,
         });

         if (body.success) {
            toast.success(body.message);
            addCustomLinkToStore(body.data.link);
         } else {
            throw body.message;
         }
      } catch (error) {
         if (error instanceof Error)
            return toast.error('You might have no internet connection');

         toast.error(error as string);
      }
   };

   const handleDeleteCustom = async (id: string) => {
      try {
         const { body } = await deleteCustomLink(id);
         if (body.success) {
            toast.success(body.message);
            deleteCustomLinkToStore(id);
         } else {
            throw body.message;
         }
      } catch (error) {
         if (error instanceof Error)
            return toast.error('You might have no internet connection');

         toast.error(error as string);
      }
   };

   // -----------------------------------------------------------------------------
   // Helper Functions
   // -----------------------------------------------------------------------------

   // fire: when user click on the social platform from modal
   const handleSocialPlatformSelect = (platform: SocialPlatform) => {
      setSelectedPlatform(platform);
      setSocialPickerOpen(false);
      setEditSocialIndex(null);
      setSocialFormOpen(true);
   };

   // fire: when user click on edit button of displayed linkItem
   const handleEditSocial = (index: number) => {
      const link = socialLinks[index];
      const platform = SOCIAL_PLATFORMS.find((p) => p.key === link.platform);
      if (!platform) return;
      setSelectedPlatform(platform);
      // ^ when editing, selected platform need to pass to theb social-form-modal to auto populate useState value
      setEditSocialIndex(index);
      setSocialFormOpen(true);
   };

   const handleEditCustom = (index: number) => {
      setEditCustomIndex(index);
      setCustomFormOpen(true);
   };

   // fire: when user close the modal by clicking on close button or outside the modal area
   const handleSocialFormClose = (open: boolean) => {
      setSocialFormOpen(open);
      if (!open) setEditSocialIndex(null);
   };

   const handleCustomFormClose = (open: boolean) => {
      setCustomFormOpen(open);
      if (!open) setEditCustomIndex(null);
   };

   // to display the links and "no link yet" message
   const hasLinks = socialLinks.length > 0 || customLinks.length > 0;

   return (
      <main
         className={cn(
            'max-body',
            showPreview &&
               'lg:grid lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px] lg:gap-2',
         )}
      >
         <div>
            <section className="mb-8">
               <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                     <LinkIcon className="size-8 text-foreground" />
                     <h1 className="heading-1">Manage Links</h1>
                  </div>

                  <div className="flex items-center gap-2">
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSocialPickerOpen(true)}
                        className="gap-1.5"
                     >
                        <UserIcon className="size-4" />
                        <span className="hidden sm:inline">Social</span>
                     </Button>
                     <Button
                        size="sm"
                        onClick={() => {
                           setEditCustomIndex(null);
                           setCustomFormOpen(true);
                        }}
                        className="gap-1.5"
                     >
                        <PlusIcon className="size-4" />
                        <span className="hidden sm:inline">Add Link</span>
                     </Button>
                  </div>
               </div>
               <p className="text-sm text-muted-foreground">
                  Add, edit, toggle, or reorder your BioLink elements instantly.
               </p>
            </section>

            {isLoading && <Spinner className="size-8 text-primary mx-auto" />}

            {!isLoading && !hasLinks && (
               <section className="rounded-xl border border-dashed border-border p-12 text-center">
                  <LinkIcon className="mx-auto size-10 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">
                     No links yet. Add your first social or custom link above.
                  </p>
               </section>
            )}

            {!isLoading && hasLinks && (
               <section className="space-y-6">
                  {socialLinks.length > 0 && (
                     <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                           Social Links
                        </h2>
                        <div className="space-y-2">
                           {socialLinks.map((link, i) => (
                              <LinkItem
                                 key={link._id ?? `${link.platform}-${i}`}
                                 link={link}
                                 type="social"
                                 onDelete={handleDeleteSocial}
                                 onEdit={() => handleEditSocial(i)}
                              />
                           ))}
                        </div>
                     </div>
                  )}

                  {customLinks.length > 0 && (
                     <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                           Custom Links
                        </h2>
                        <div className="space-y-2">
                           {customLinks.map((link, i) => (
                              <LinkItem
                                 key={link._id ?? `${link.title}-${i}`}
                                 link={link}
                                 type="custom"
                                 onDelete={handleDeleteCustom}
                                 onEdit={() => handleEditCustom(i)}
                              />
                           ))}
                        </div>
                     </div>
                  )}
               </section>
            )}

            <SocialLinksModal
               open={socialPickerOpen}
               onOpenChange={setSocialPickerOpen}
               onSelect={handleSocialPlatformSelect}
            />

            <SocialLinkFormModal
               key={editSocialIndex ?? 'social-form-modal'}
               open={socialFormOpen}
               onOpenChange={handleSocialFormClose}
               platform={selectedPlatform}
               initialData={
                  editSocialIndex !== null ? socialLinks[editSocialIndex] : null
               }
               onSave={handleSocialSave}
            />

            <CustomLinkFormModal
               key={editCustomIndex ?? 'custom-form-modal'}
               open={customFormOpen}
               onOpenChange={handleCustomFormClose}
               initialData={
                  editCustomIndex !== null ? customLinks[editCustomIndex] : null
               }
               onSave={handleCustomSave}
            />
         </div>
      </main>
   );
};

export default LinksClient;
