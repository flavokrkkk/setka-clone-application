import { useOAuthMutation } from "@/entities/auth/hooks/useQueryMutate";
import { Button } from "@/shared/ui";
import { IconTypes } from "@/shared/ui/icon/lib";
import { Icon } from "@/shared/ui/icon/ui/icon";

const AuthSocial = () => {
  const { mutateAsync } = useOAuthMutation();

  const handleConnectProvider = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const { data } = await mutateAsync(
      event.currentTarget.value as "yandex" | "google",
    );
    window.location.href = data.url;
  };

  return (
    <div className="mt-2 space-y-2">
      <Button
        type="button"
        value={"yandex"}
        className="w-full"
        variant={"ghost"}
        onClick={handleConnectProvider}
      >
        <Icon type={IconTypes.YANDEX_OUTLINED} className="font-bold" />
        Войти через Яндекс
      </Button>
      <Button
        type="button"
        value={"google"}
        className="w-full"
        variant={"ghost"}
        onClick={handleConnectProvider}
      >
        <Icon type={IconTypes.GOOGLE_OUTLINED} />
        Войти через Google
      </Button>
    </div>
  );
};

export default AuthSocial;
