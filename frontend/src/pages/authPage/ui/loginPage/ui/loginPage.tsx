import { EAuthModes } from "@/features/auth/lib/utils/mode";
import AuthWrapper from "@/features/auth/ui/authWrapper";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input/input";

const LoginPage = () => {
  return (
    <AuthWrapper
      mode={EAuthModes.LOGIN}
      title="Пожалуйста, войдите в аккаунт"
      onSubmit={(event) => {
        event.preventDefault();
        console.log("object");
      }}
    >
      <section className="space-y-3">
        <div className="space-y-1">
          <Input type="email" id="email" placeholder="Почта" />
        </div>
        <div className="space-y-1">
          <Input type="email" id="email" placeholder="Пароль" />
        </div>
      </section>
      <Button className="w-full mt-4">Войти</Button>
    </AuthWrapper>
  );
};

export default LoginPage;
