'use client';

import { useState, useEffect } from 'react';

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
import { sleep } from '@/lib/utils';
import type { SocialPlatform } from '@/constants/links';
import type { SaveSocialLink, SocialLink } from '@/@types/links';
import { useTheme } from 'next-themes';

interface SocialLinkFormModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   platform: SocialPlatform | null;
   initialData?: SocialLink | null;
   onSave: (link: SaveSocialLink) => void;
}

export function SocialLinkFormModal({
   open,
   onOpenChange,
   platform,
   initialData,
   onSave,
}: SocialLinkFormModalProps) {
   const [username, setUsername] = useState(
      initialData && platform
         ? initialData.url.replace(platform.prefix, '')
         : '',
   );
   const { resolvedTheme } = useTheme();

   const [saving, setSaving] = useState(false);

   if (!platform) return null;

   const fullUrl = platform.prefix + username;

   const handleSave = async () => {
      if (!username.trim()) return;
      setSaving(true);
      await onSave({
         _id: initialData?._id,
         platform: platform.key,
         url: fullUrl,
      });
      setSaving(false);
      setUsername('');
      onOpenChange(false);
   };

   const handleOpenChange = (nextOpen: boolean) => {
      if (saving) return;
      if (!nextOpen) setUsername('');
      onOpenChange(nextOpen);
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     src={`${platform.icon}?color=${encodeURIComponent(resolvedTheme === 'dark' ? '#fff' : '#000')}`}
                     alt={platform.label}
                     width="24"
                     height="24"
                     className="size-5 shrink-0"
                  />
                  {platform.label}
               </DialogTitle>
               <DialogDescription>
                  {initialData
                     ? `Edit your ${platform.label} link.`
                     : `Enter your username to add your ${platform.label} link.`}
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
               <div className="space-y-2">
                  <Label htmlFor="social-username">Username</Label>
                  <Input
                     id="social-username"
                     placeholder={`Your ${platform.label} username`}
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                           e.preventDefault();
                           handleSave();
                        }
                     }}
                     disabled={saving}
                  />
               </div>

               {username.trim() && (
                  <p className="text-xs text-muted-foreground break-all">
                     {fullUrl}
                  </p>
               )}
            </div>

            <DialogFooter>
               <Button
                  onClick={handleSave}
                  disabled={!username.trim() || saving}
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
