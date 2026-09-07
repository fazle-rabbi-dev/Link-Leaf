import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import type { ComponentType } from 'react';

type IconComponent = ComponentType<{ className?: string }>;

export interface FormField {
   name: string;
   label: string;
   placeholder: string;
   type?: string;
   icon?: IconComponent;
   isPassword?: boolean;
   prefix?: string;
}

export const registerFields: FormField[] = [
   {
      name: 'name',
      label: 'NAME',
      placeholder: 'Maya',
      type: 'text',
      icon: User,
   },
   {
      name: 'username',
      label: 'CHOOSE USERNAME HANDLE',
      placeholder: 'mayadesigns',
      type: 'text',
      icon: User,
      prefix: 'leaf.app/',
   },
   {
      name: 'email',
      label: 'EMAIL ADDRESS',
      placeholder: 'maya@leaf.app',
      type: 'email',
      icon: Mail,
   },
   {
      name: 'password',
      label: 'PASSWORD',
      placeholder: '••••••••',
      type: 'password',
      icon: Lock,
      isPassword: true,
   },
];

export const loginFields: FormField[] = [
   {
      name: 'emailOrUsername',
      label: 'EMAIL OR USERNAME',
      placeholder: 'maya@leaf.app or maya_designs',
      type: 'text',
      icon: User,
   },
   {
      name: 'password',
      label: 'PASSWORD',
      placeholder: '••••••••',
      type: 'password',
      icon: Lock,
      isPassword: true,
   },
];

export interface SocialLoginProvider {
   id: 'google' | 'github';
   label: string;
   icon: string;
}

export const socialLoginButtons: SocialLoginProvider[] = [
   {
      id: 'google',
      label: 'Continue with Google',
      icon: '/google.svg',
   },
   {
      id: 'github',
      label: 'Continue with GitHub',
      icon: '/github.svg',
   },
];

export const EyeIcon = Eye;
export const EyeOffIcon = EyeOff;
