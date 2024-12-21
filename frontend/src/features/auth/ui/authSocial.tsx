import { Button } from "@/shared/ui";
import { IconTypes } from "@/shared/ui/icon/lib";
import { Icon } from "@/shared/ui/icon/ui/icon";

const AuthSocial = () => {
  return (
    <div className="mt-2 space-y-2">
      <Button className="w-full " type="button" variant={"secondary"}>
        <Icon type={IconTypes.YANDEX_OUTLINED} className="font-bold" />
        Войти через Яндекс
      </Button>
      <Button className="w-full" type="button" variant={"secondary"}>
        <Icon type={IconTypes.GOOGLE_OUTLINED} />
        Войти через Google
      </Button>
    </div>
  );
};

export default AuthSocial;
