import { EAuthModes } from "@/features/auth/lib/utils/mode";
import AuthWrapper from "@/features/auth/ui/authWrapper";
import { Button } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { RegisterSchema, TypeRegisterSchema } from "@features/auth/schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input/input";
import { CircleAlert } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form/form";
import clsx from "clsx";
import { useRegisterMutation } from "@/entities/auth/hooks/useQueryMutate";

const RegisterForm = () => {
  const { register, isLoadingRegister } = useRegisterMutation();

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onFormSubmit = (values: TypeRegisterSchema) => {
    register({ values });
    reset();
  };

  return (
    <AuthWrapper mode={EAuthModes.REGISTER}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <section className="space-y-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1 relative">
                  <FormControl>
                    <Input
                      disabled={isLoadingRegister}
                      type="name"
                      id="name"
                      placeholder="Имя"
                      className={clsx(errors.name && "border-red-600")}
                      {...field}
                    />
                  </FormControl>
                  {errors.name && (
                    <span className="absolute right-2 top-4 transform -translate-y-1/2 text-red-600">
                      <CircleAlert className="w-5 h-5" />
                    </span>
                  )}
                  <FormMessage className="text-xs font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1 relative">
                  <FormControl>
                    <Input
                      disabled={isLoadingRegister}
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
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1 relative">
                  <FormControl>
                    <Input
                      disabled={isLoadingRegister}
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
            <FormField
              control={control}
              name="passwordRepeat"
              render={({ field }) => (
                <FormItem className="space-y-1 relative">
                  <FormControl>
                    <Input
                      disabled={isLoadingRegister}
                      type="password"
                      id="password-repeat"
                      placeholder="Повторите пароль"
                      className={clsx(
                        errors.passwordRepeat && "border-red-600",
                      )}
                      {...field}
                    />
                  </FormControl>
                  {errors.passwordRepeat && (
                    <span className="absolute right-2 top-4 transform -translate-y-1/2 text-red-600">
                      <CircleAlert className="w-5 h-5" />
                    </span>
                  )}
                  <FormMessage className="text-xs font-light" />
                </FormItem>
              )}
            />
          </section>
          <Button disabled={isLoadingRegister} className="w-full mt-5">
            Зарегистрироваться
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default RegisterForm;
