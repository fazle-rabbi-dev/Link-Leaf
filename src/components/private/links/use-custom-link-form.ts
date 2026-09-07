import { useState, useRef } from 'react';
import { toast } from 'sonner';

import { CUSTOM_LINK_ICON_MAX_SIZE } from '@/constants/links';
import type {
   CustomLink,
   CustomLinkIcon,
   CustomLinkSaveHandler,
} from '@/@types/links';

function getInitialIcon(
   initialData?: CustomLink | null,
): CustomLinkIcon | null {
   return initialData?.icon ?? null;
}

function getInitialIconPreview(initialData?: CustomLink | null): string | null {
   const icon = initialData?.icon;
   if (icon && ['emoji', 'gif'].includes(icon.kind)) return icon.value;
   return null;
}

export function useCustomLinkForm(
   onSave: CustomLinkSaveHandler,
   initialData?: CustomLink | null,
) {
   const [title, setTitle] = useState(initialData?.title ?? '');
   const [url, setUrl] = useState(initialData?.url ?? '');
   const [icon, setIcon] = useState<CustomLinkIcon | null>(
      getInitialIcon(initialData),
   );
   const [iconPreview, setIconPreview] = useState<string | null>(
      getInitialIconPreview(initialData),
   );
   const [iconFile, setIconFile] = useState<File | null>(null);
   const [saving, setSaving] = useState(false);
   const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
   const [shouldRemoveIcon, setShouldRemoveIcon] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const urlInputRef = useRef<HTMLInputElement>(null);

   const reset = () => {
      setTitle('');
      setUrl('');
      setIcon(null);
      setIconPreview(null);
      setIconFile(null);
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > CUSTOM_LINK_ICON_MAX_SIZE) {
         toast.error('Icon must be less than 50KB');
         return;
      }

      setIconFile(file);
      setIcon(null);
      setIconPreview(URL.createObjectURL(file));
      setShouldRemoveIcon(false);
   };

   const handleEmojiSelect = (emoji: string) => {
      setIcon({ kind: 'emoji', value: emoji });
      setIconFile(null);
      setIconPreview(null);
      setEmojiPickerOpen(false);
      setShouldRemoveIcon(false);
   };

   const removeIcon = () => {
      setIcon(null);
      setIconPreview(null);
      setIconFile(null);
      // only make it true when user edit the link
      if (initialData) setShouldRemoveIcon(true);
   };

   const handleSave = async () => {
      if (!title.trim() || !url.trim()) return;
      setSaving(true);

      const link = {
         ...(initialData ? { _id: initialData._id } : {}),
         title: title.trim(),
         url: url.trim(),
         ...(icon ? { icon } : {}),
      };

      await onSave(link, iconFile ?? undefined, shouldRemoveIcon);
      setSaving(false);
      reset();
   };

   const displayIcon = iconFile ? iconPreview : icon?.value;

   return {
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
   };
}
