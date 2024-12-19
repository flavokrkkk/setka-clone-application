import { EAuthModes } from "@/features/auth/lib/utils/mode";
import AuthWrapper from "@/features/auth/ui/authWrapper";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input/input";

const RegisterPage = () => {
  return (
    <AuthWrapper
      mode={EAuthModes.REGISTER}
      title="Пожалуйста, заполните все поля для регистрации"
      onSubmit={() => console.log("submit")}
    >
      <section className="space-y-3">
        <div className="space-y-1">
          <Input type="name" id="name" placeholder="Имя" />
        </div>
        <div className="space-y-1">
          <Input type="email" id="email" placeholder="Почта" />
        </div>
        <div className="space-y-1">
          <Input type="password" id="password" placeholder="Пароль" />
        </div>
        <div className="space-y-1">
          <Input type="password" id="password" placeholder="Повторите пароль" />
        </div>
      </section>
      <Button className="w-full mt-4">Войти</Button>
    </AuthWrapper>
  );
};

export default RegisterPage;
