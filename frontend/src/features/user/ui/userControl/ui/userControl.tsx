import { userSelector } from "@/entities/user/model/store/selectors";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import UserBadge from "../../userBadge/ui/userBadge";
import { Loader } from "@/shared/ui";

const UserControl = () => {
  const { user } = useAppSelector(userSelector);

  if (!user) return <Loader />;

  return <UserBadge picture={user?.picture} username={user?.username} />;
};

export default UserControl;
