import { EAuthModes } from "@/features/auth/lib/utils/mode";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input/input";
import { useForm } from "react-hook-form";
import {
  ResetPasswordSchema,
  TypeResetPasswordSchema,
} from "@features/auth/schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/shared/ui/form/form";
import { CircleAlert } from "lucide-react";
import AuthWrapper from "../../authWrapper/ui/authWrapper";
import clsx from "clsx";
import { useResetPasswordMutation } from "@/entities/auth/hooks/useQueryMutate";

const ResetPasswordForm = () => {
  const { reset, isLoadingReset } = useResetPasswordMutation();

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onFormSubmit = (values: TypeResetPasswordSchema) => {
    reset({ values });
  };

  return (
    <AuthWrapper mode={EAuthModes.RESET} title="Сбросить пароль" isBack>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <section className="space-y-3">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1 relative">
                  <FormControl>
                    <Input
                      disabled={isLoadingReset}
                      type="email"
                      id="email"
                      placeholder="Email"
                      className={clsx(errors.email && "border-red-600")}
                      {...field}
                    />
                  </FormControl>
                  {errors.email && (
                    <span className="absolute right-2 top-4 transform -translate-y-1/2 text-red-600">
                      <CircleAlert className="w-5 h-5" />
                    </span>
                  )}
                  <FormMessage className="text-xs font-light" />
                </FormItem>
              )}
            />
          </section>

          <Button
            disabled={isLoadingReset}
            className="w-full mt-5"
            variant={"outline"}
          >
            Сбросить
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default ResetPasswordForm;