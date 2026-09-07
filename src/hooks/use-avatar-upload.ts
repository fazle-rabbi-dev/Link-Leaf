import { useRef, useState } from 'react';
import { toast } from 'sonner';

const MAX_AVATAR_SIZE = 100 * 1024; // 100 KB
const ALLOWED_AVATAR_TYPES = [
   'image/jpeg',
   'image/png',
   'image/webp',
   'image/svg+xml',
];

export function useAvatarUpload(initialAvatar?: string) {
   const [avatar, setAvatar] = useState<string>(initialAvatar || '');
   const [avatarFile, setAvatarFile] = useState<File | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const setAvatarSafe: React.Dispatch<React.SetStateAction<string>> = (
      value,
   ) => {
      setAvatar(value);
   };

   const handleAvatarClick = () => {
      fileInputRef.current?.click();
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
         toast.error('Invalid file type. Allowed: JPG, PNG, WebP, SVG');
         return;
      }

      if (file.size > MAX_AVATAR_SIZE) {
         toast.error(`File too large. Max size: ${MAX_AVATAR_SIZE / 1024}KB`);
         return;
      }

      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));
   };

   return {
      avatar,
      setAvatar: setAvatarSafe,
      setAvatarFile,
      avatarFile,
      fileInputRef,
      handleAvatarClick,
      handleFileChange,
      allowedTypes: ALLOWED_AVATAR_TYPES.join(','),
   };
}
