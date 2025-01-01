import { useLoginMutation } from "@/entities/auth/hooks/useQueryMutate";
import { useForm } from "react-hook-form";
import { TypeLoginSchema } from "../../../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui";
import AuthWrapper from "../../authWrapper/ui/authWrapper";
import { EAuthModes } from "../../../lib/utils/mode";
import clsx from "clsx";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { authSelector } from "@/entities/auth/model";
import { CodeSchema, TypeCodeSchema } from "../../../schemes/codeSchema";

const TwoFactorForm = () => {
  const { login, isLoadingLogin } = useLoginMutation();
  const { authorizeData } = useAppSelector(authSelector);
  const form = useForm<TypeCodeSchema>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onFormSubmit = (values: TypeCodeSchema) => {
    if (!authorizeData) return;

    const loginTwoFactorData: TypeLoginSchema = {
      ...authorizeData,
      code: values.code,
    };
    login({ values: loginTwoFactorData });
  };

  return (
    <AuthWrapper
      mode={EAuthModes.TWO_FACTOR}
      isBack
      title={"Двухфакторная аутентификация"}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <section className="space-y-3">
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

export default TwoFactorForm;
