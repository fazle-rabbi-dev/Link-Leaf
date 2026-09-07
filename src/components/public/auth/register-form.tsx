import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
   registerSchema,
   type RegisterFormData,
} from '@/validations/auth.validation';
import { registerUser } from '@/lib/api/auth';
import { toast } from 'sonner';
import { registerFields } from '@/constants/authform';
import { FormInputField } from '@/components/ui/form-input-field';

type RegisterFormProps = {
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
};

const RegisterForm = ({ isLoading, setIsLoading }: RegisterFormProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
   });

   const onSubmit = async (formData: RegisterFormData) => {
      setIsLoading(true);
      try {
         const { response, body } = await registerUser(formData);
         if (response.ok) {
            toast.success(body.message);
         } else {
            throw new Error(body.message);
         }
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         {registerFields.map((field) => (
            <FormInputField
               key={field.name}
               field={field}
               register={register}
               error={errors[field.name as keyof RegisterFormData]?.message}
               disabled={isLoading}
            />
         ))}

         <Button type="submit" className="w-full" disabled={isLoading}>
            {isSubmitting ? (
               <Spinner className="size-4" />
            ) : (
               'REGISTER AND CLAIM LINK'
            )}
         </Button>
      </form>
   );
};

export default RegisterForm;
