import { EAuthModes } from "@/features/auth/lib/utils/mode";
import AuthWrapper from "@/features/auth/ui/authWrapper";
import { Button } from "@/shared/ui";
import { IconTypes } from "@/shared/ui/icon/lib";
import { Icon } from "@/shared/ui/icon/ui/icon";
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

export default LoginPage;
