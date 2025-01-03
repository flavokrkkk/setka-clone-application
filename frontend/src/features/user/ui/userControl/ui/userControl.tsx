import { userSelector } from "@/entities/user/model/store/selectors";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import UserBadge from "../../userBadge/ui/userBadge";
import { Icon, Loader } from "@/shared/ui";
import { IconTypes } from "@/shared/ui/icon/lib";

const UserControl = () => {
  const { user } = useAppSelector(userSelector);

  if (!user) return <Loader />;

  return (
    <div className="flex justify-between items-center w-full">
      <UserBadge picture={user?.picture} username={user?.username} />
      <span className="bg-gray-400 p-1 rounded-md">
        <Icon type={IconTypes.SLEEP_OUTLINED} />
      </span>
    </div>
  );
};

export default UserControl;
