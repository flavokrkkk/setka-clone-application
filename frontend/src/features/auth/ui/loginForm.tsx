import { EAuthModes } from "@/features/auth/lib/utils/mode";
import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui";
import { Input } from "@/shared/ui/input/input";
import { useForm } from "react-hook-form";
import { LoginSchema, TypeLoginSchema } from "@features/auth/schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/shared/ui/form/form";
import { CircleAlert } from "lucide-react";
import AuthWrapper from "@/features/auth/ui/authWrapper";
import clsx from "clsx";
import { useLoginMutation } from "@/entities/auth/hooks/useQueryMutate";
import { useState } from "react";

const LoginForm = () => {
  const [isShowTwoFactor, setIsSwowTwoFactor] = useState(false);
  const { login, isLoadingLogin } = useLoginMutation(setIsSwowTwoFactor);
  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onFormSubmit = (values: TypeLoginSchema) => {
    login({ values });
  };

  return (
    <AuthWrapper
      mode={EAuthModes.LOGIN}
      isBack={isShowTwoFactor}
      title={isShowTwoFactor ? "Двухфакторная аутентификация" : ""}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <section className="space-y-3">
            {isShowTwoFactor && (
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-1 relative flex justify-center">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        id="code"
                        disabled={isLoadingLogin}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className={clsx(errors.code && "border-red-600")}
                          />
                          <InputOTPSlot
                            index={1}
                            className={clsx(errors.code && "border-red-600")}
                          />
                          <InputOTPSlot
                            index={2}
                            className={clsx(errors.code && "border-red-600")}
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className={clsx(errors.code && "border-red-600")}
                          />
                          <InputOTPSlot
                            index={4}
                            className={clsx(errors.code && "border-red-600")}
                          />
                          <InputOTPSlot
                            index={5}
                            className={clsx(errors.code && "border-red-600")}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {!isShowTwoFactor && (
              <>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1 relative">
                      <FormControl>
                        <Input
                          disabled={isLoadingLogin}
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
                          disabled={isLoadingLogin}
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
              </>
            )}
          </section>
          <Button
            disabled={isLoadingLogin}
            className="w-full mt-5"
            variant={"outline"}
          >
            Войти
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default LoginForm;
