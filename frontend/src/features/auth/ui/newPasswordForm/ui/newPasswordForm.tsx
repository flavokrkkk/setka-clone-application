import { EAuthModes } from "@/features/auth/lib/utils/mode";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input/input";
import { useForm } from "react-hook-form";
import {
  NewPasswordSchema,
  TypeNewPasswordSchema,
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
import clsx from "clsx";
import { useNewPasswordMutation } from "@/entities/auth/hooks/useQueryMutate";
import AuthWrapper from "../../authWrapper/ui/authWrapper";

const NewPasswordForm = () => {
  const { newPassword, isLoadingNew } = useNewPasswordMutation();

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onFormSubmit = (values: TypeNewPasswordSchema) => {
    newPassword({ values });
  };

  return (
    <AuthWrapper mode={EAuthModes.NEW} title="Новый пароль" isBack>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <section className="space-y-3">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1 relative">
                  <FormControl>
                    <Input
                      disabled={isLoadingNew}
                      type="password"
                      id="password"
                      placeholder="Пароль"
                      className={clsx(errors.password && "border-red-600")}
                      {...field}
                    />
                  </FormControl>
                  {errors.password && (
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
            disabled={isLoadingNew}
            className="w-full mt-5"
            variant={"outline"}
          >
            Сохранить
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default NewPasswordForm;
