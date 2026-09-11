'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldError } from '@/components/ui/field';
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from '@/components/ui/input-group';
import {
   profileSchema,
   type ProfileFormData,
} from '@/validations/profile.validation';
import { FetchedUserSuccessResponse } from '@/@types/auth';
import { updateUser } from '@/lib/api/auth';
import logger from '@/lib/logger';
import { useAvatarUpload } from '@/hooks/use-avatar-upload';
import { ProfilePictureSection } from '@/components/private/profile/profile-picture-section';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppearanceStore } from '@/store/useAppearanceStore';
import { cn } from '@/lib/utils';
import { publishProfile } from '@/lib/api/profile';

const MAX_BIO_LENGTH = 200;

const ProfileClient = ({
   userData,
}: {
   userData: FetchedUserSuccessResponse['data'];
}) => {
   const { user, profile } = userData;
   const {
      avatar,
      setAvatar,
      setAvatarFile,
      avatarFile,
      fileInputRef,
      handleAvatarClick,
      handleFileChange,
      allowedTypes,
   } = useAvatarUpload(user?.avatar);
   const setAuth = useAuthStore((state) => state.setAuth);
   const showPreview = useAppearanceStore((s) => s.showPreview);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting, isDirty },
   } = useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      mode: 'onTouched',
      defaultValues: {
         name: user.name || '',
         username: user.username || '',
         bio: profile.bio || '',
      },
   });

   const nameField = register('name');
   const usernameField = register('username');
   const bioField = register('bio');

   const usernameRef = useRef<HTMLInputElement>(null);
   const bioRef = useRef<HTMLTextAreaElement>(null);
   const bioValue = watch('bio') ?? '';
   const isPublished = useAuthStore((s) => s.profile?.isPublished ?? false);

   const handlePublishProfile = async () => {
      try {
         const { body } = await publishProfile();

         if (body.success) {
            toast.success(
               isPublished ? 'Profile unpublished' : 'Profile published',
            );
            setAuth({ profile: { ...profile, isPublished: !isPublished } });
         } else throw new Error(body.message);
      } catch (error) {
         logger.error('ProfileClient: error while publishing profile:', error);
         if (error instanceof Error) toast.error(error.message);
      }
   };

   // ============= UPDATE PROFILE =============
   const updateProfile = async (data: ProfileFormData) => {
      try {
         let body: FormData | ProfileFormData;

         if (avatarFile) {
            const formData = new FormData();
            formData.append('name', data.name || '');
            formData.append('username', data.username || '');
            formData.append('bio', data.bio || '');
            formData.append('avatar', avatarFile);
            body = formData;
         } else {
            body = data;
            if (avatar) body.avatarUrl = avatar;
         }

         // for profile page: profile update means: user info + profile info update and happens on the same request to one single route
         const { body: res } = await updateUser(body);

         if (res.success) {
            toast.success('Profile updated successfully');

            setAvatarFile(null);

            // update state
            // IMPORTANT: on user+profile update for profile page -> returned res.data == { user: { userInfo, profile }}
            setAuth({
               user: res.data.user,
               // @ts-expect-error: res.data.user.profile is of type Profile | null; we know it will be present after a successful update
               profile: res.data.user.profile,
            });
         } else throw new Error(res.message);
      } catch (error) {
         logger.error('ProfileClient: error while updating profile:', error);
         if (error instanceof Error) toast.error(error.message);
      }
   };

   const submit = handleSubmit(updateProfile);

   return (
      <div
         className={cn(
            'pb-10',
            showPreview &&
               'lg:grid lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px] lg:gap-2',
         )}
      >
         <div className="">
            <ProfilePictureSection
               avatar={avatar}
               setAvatar={setAvatar}
               name={user.name}
               fileInputRef={fileInputRef}
               allowedTypes={allowedTypes}
               onAvatarClick={handleAvatarClick}
               onFileChange={handleFileChange}
            />

            <form onSubmit={submit} className="space-y-6">
               <div>
                  <label className="block text-xs font-semibold text-foreground tracking-wider mb-2">
                     DISPLAY NAME
                  </label>
                  <Input
                     {...nameField}
                     placeholder="Enter your display name"
                     className="h-12"
                     aria-invalid={!!errors.name}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                           e.preventDefault();
                           usernameRef.current?.focus();
                        }
                     }}
                  />
                  <FieldError className="mt-2">
                     {errors.name?.message}
                  </FieldError>
               </div>

               <div>
                  <label className="block text-xs font-semibold text-foreground tracking-wider mb-2">
                     USERNAME / HANDLE
                  </label>
                  <InputGroup className="h-12" aria-invalid={!!errors.username}>
                     <InputGroupAddon
                        align="inline-start"
                        className="text-muted-foreground pl-3"
                     >
                        leaf.app/
                     </InputGroupAddon>
                     <InputGroupInput
                        {...usernameField}
                        ref={(el) => {
                           usernameField.ref(el);
                           usernameRef.current = el;
                        }}
                        placeholder="username"
                        className="font-medium"
                        aria-invalid={!!errors.username}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault();
                              bioRef.current?.focus();
                           }
                        }}
                     />
                  </InputGroup>
                  <FieldError className="mt-2">
                     {errors.username?.message}
                  </FieldError>
               </div>

               <div>
                  <div className="flex items-center justify-between mb-2">
                     <label className="flex items-center gap-2 text-xs font-semibold text-foreground tracking-wider">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="14"
                           height="14"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        >
                           <line x1="3" x2="21" y1="6" y2="6" />
                           <line x1="3" x2="21" y1="12" y2="12" />
                           <line x1="3" x2="15" y1="18" y2="18" />
                        </svg>
                        SHORT BIO
                     </label>
                     <span className="text-xs text-muted-foreground">
                        {bioValue.length} / {MAX_BIO_LENGTH}
                     </span>
                  </div>
                  <Textarea
                     {...bioField}
                     ref={(el) => {
                        bioField.ref(el);
                        bioRef.current = el;
                     }}
                     placeholder="Tell us about yourself..."
                     className="min-h-[100px] resize-none"
                     maxLength={MAX_BIO_LENGTH}
                     aria-invalid={!!errors.bio}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault();
                           submit();
                        }
                     }}
                  />
                  <FieldError className="mt-2">
                     {errors.bio?.message}
                  </FieldError>
               </div>

               <div className="pt-4 flex flex-wrap gap-3">
                  <Button
                     suppressHydrationWarning
                     type="submit"
                     className="w-full sm:w-auto px-8"
                     disabled={isSubmitting || !isDirty}
                  >
                     {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                     type="button"
                     variant={isPublished ? 'destructive' : 'outline'}
                     className="w-full sm:w-auto px-8 cursor-pointer"
                     onClick={handlePublishProfile}
                  >
                     {isPublished ? 'Unpublish profile' : '🎉 Publish profile'}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProfileClient;
