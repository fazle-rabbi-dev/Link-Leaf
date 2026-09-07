import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/ui/field';
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from '@/components/ui/input-group';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, type FormField } from '@/constants/authform';

interface FormFieldProps {
   field: FormField;
   register: any;
   error?: string;
   disabled?: boolean;
}

export const FormInputField = ({
   field,
   register,
   error,
   disabled,
}: FormFieldProps) => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <div className="space-y-2">
         <Label htmlFor={field.name} className="font-semibold">
            {field.label}
         </Label>
         {field.prefix ? (
            <div className="flex h-8 w-full items-center">
               <span className="flex h-full items-center rounded-l-lg bg-muted px-3 text-sm text-muted-foreground">
                  {field.prefix}
               </span>
               <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  className="h-full rounded-l-none placeholder:text-xs"
                  disabled={disabled}
                  aria-invalid={!!error}
                  {...register(field.name)}
               />
            </div>
         ) : (
            <InputGroup aria-invalid={!!error}>
               <InputGroupAddon align="inline-start">
                  {field.icon && <field.icon />}
               </InputGroupAddon>
               <InputGroupInput
                  id={field.name}
                  type={
                     field.isPassword && showPassword
                        ? 'text'
                        : (field.type ?? 'text')
                  }
                  placeholder={field.placeholder}
                  className="placeholder:text-xs"
                  disabled={disabled}
                  {...register(field.name)}
               />
               {field.isPassword && (
                  <InputGroupAddon align="inline-end">
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground"
                     >
                        {showPassword ? (
                           <EyeOffIcon className="size-4" />
                        ) : (
                           <EyeIcon className="size-4" />
                        )}
                     </button>
                  </InputGroupAddon>
               )}
            </InputGroup>
         )}
         <FieldError>{error}</FieldError>
      </div>
   );
};
