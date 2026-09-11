'use client';

import { useEffect, useRef } from 'react';
import { ImageIcon, SmileIcon, XIcon } from 'lucide-react';

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CUSTOM_LINK_ICON_ACCEPT } from '@/constants/links';
import {
   EmojiPicker,
   EmojiPickerSearch,
   EmojiPickerContent,
   EmojiPickerFooter,
} from '@/components/ui/emoji-picker';
import { useCustomLinkForm } from './use-custom-link-form';
import type { CustomLink, CustomLinkSaveHandler } from '@/@types/links';

interface CustomLinkFormModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   initialData?: CustomLink | null;
   onSave: CustomLinkSaveHandler;
}

export function CustomLinkFormModal({
   open,
   onOpenChange,
   initialData,
   onSave,
}: CustomLinkFormModalProps) {
   const {
      title,
      setTitle,
      url,
      setUrl,
      saving,
      emojiPickerOpen,
      setEmojiPickerOpen,
      fileInputRef,
      urlInputRef,
      displayIcon,
      iconFile,
      handleFileChange,
      handleEmojiSelect,
      removeIcon,
      handleSave,
      reset,
   } = useCustomLinkForm(onSave, initialData);

   const emojiPickerRef = useRef<HTMLDivElement>(null);
   const emojiButtonRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
      if (!emojiPickerOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
         const target = e.target as Node;
         if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(target) &&
            emojiButtonRef.current &&
            !emojiButtonRef.current.contains(target)
         ) {
            setEmojiPickerOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         return document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [emojiPickerOpen]);

   const handleOpenChange = (nextOpen: boolean) => {
      if (saving) return;
      // when modal is being closed, reset the form to initial state, so that when user open it again, it will be empty or with initial data
      if (!nextOpen) reset();
      // than call the parent closer function to close the modal (aka: dialog controlling from parent)
      onOpenChange(nextOpen);
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>
                  {initialData ? 'Edit Custom Link' : 'Add Custom Link'}
               </DialogTitle>
               <DialogDescription>
                  {initialData
                     ? 'Update your custom link details.'
                     : 'Create a custom link with a title, URL, and optional icon.'}
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
               <div className="space-y-2">
                  <Label htmlFor="custom-title">Title</Label>
                  <Input
                     id="custom-title"
                     placeholder="e.g. My Portfolio"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                           e.preventDefault();
                           urlInputRef.current?.focus();
                        }
                     }}
                     disabled={saving}
                     maxLength={50}
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="custom-url">URL</Label>
                  <Input
                     ref={urlInputRef}
                     id="custom-url"
                     placeholder="https://example.com"
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     onKeyDown={async (e) => {
                        if (
                           e.key === 'Enter' &&
                           title.trim() &&
                           url.trim() &&
                           !saving
                        ) {
                           e.preventDefault();
                           await handleSave();
                           onOpenChange(false);
                        }
                     }}
                     disabled={saving}
                  />
               </div>

               <div className="space-y-2">
                  <Label>Icon (optional)</Label>
                  <div className="flex items-center gap-2">
                     {displayIcon ? (
                        <div className="relative size-10 rounded-lg border border-border flex items-center justify-center overflow-hidden bg-muted">
                           {(iconFile && displayIcon.startsWith('blob:')) ||
                           displayIcon.startsWith('http') ? (
                              <img
                                 src={displayIcon}
                                 alt="Icon preview"
                                 className="size-full object-cover"
                              />
                           ) : (
                              <span className="text-2xl">{displayIcon}</span>
                           )}
                           <button
                              type="button"
                              onClick={removeIcon}
                              className="absolute -top-1 -right-1 size-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center cursor-pointer"
                           >
                              <XIcon className="size-2.5" />
                           </button>
                        </div>
                     ) : (
                        <>
                           {/* Upload Button */}
                           <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              className="gap-1.5"
                           >
                              <ImageIcon className="size-4" />
                              Upload
                           </Button>

                           {/* Emoji Picker */}
                           <Button
                              ref={emojiButtonRef}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-1.5"
                              onClick={() => setEmojiPickerOpen(true)}
                           >
                              <SmileIcon className="size-4" />
                              Emoji
                           </Button>

                           {emojiPickerOpen && (
                              <div
                                 ref={emojiPickerRef}
                                 className="absolute z-50 top-0 mt-2 shadow"
                              >
                                 <EmojiPicker
                                    className="h-[342px]"
                                    onEmojiSelect={({ emoji }) => {
                                       handleEmojiSelect(emoji);
                                    }}
                                 >
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       className="mb-1"
                                       onClick={() => setEmojiPickerOpen(false)}
                                    >
                                       Close
                                    </Button>
                                    <EmojiPickerSearch />
                                    <EmojiPickerContent />
                                    <EmojiPickerFooter />
                                 </EmojiPicker>
                              </div>
                           )}
                        </>
                     )}
                  </div>
                  <input
                     ref={fileInputRef}
                     type="file"
                     accept={CUSTOM_LINK_ICON_ACCEPT}
                     onChange={handleFileChange}
                     className="hidden"
                  />
               </div>
            </div>

            <DialogFooter>
               <Button
                  onClick={async () => {
                     await handleSave();
                     onOpenChange(false);
                  }}
                  disabled={!title.trim() || !url.trim() || saving}
                  className="w-full sm:w-auto"
               >
                  {saving && <Spinner className="mr-1.5" />}
                  {saving ? 'Saving...' : 'Save'}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
