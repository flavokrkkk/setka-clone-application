import { EAuthModes } from "@/features/auth/lib/utils/mode";
import AuthWrapper from "@/features/auth/ui/authWrapper";
import { Button } from "@/shared/ui";
import { IconTypes } from "@/shared/ui/icon/lib";
import { Icon } from "@/shared/ui/icon/ui/icon";
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

      <div className="w-full space-y-2">
        <Button className="w-full">Войти</Button>
        <Button className="w-full " type="button" variant={"outline"}>
          <Icon type={IconTypes.YANDEX_OUTLINED} className="font-bold" /> Войти
          через Яндекс
        </Button>
        <Button className="w-full" type="button" variant={"outline"}>
          <Icon type={IconTypes.GOOGLE_OUTLINED} /> Войти через Google
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default RegisterPage;
