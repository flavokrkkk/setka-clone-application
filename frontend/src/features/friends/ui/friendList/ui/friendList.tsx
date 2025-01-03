import UserBadge from "@/features/user/ui/userBadge/ui/userBadge";
import { Icon } from "@/shared/ui";
import { IconTypes } from "@/shared/ui/icon/lib";

const friendMockList = [
  {
    id: 1,
    name: "Mago",
    status: IconTypes.ONLINE_OUTLINED,
  },
  {
    id: 2,
    name: "Vazorian",
    status: IconTypes.SLEEP_OUTLINED,
  },
  {
    id: 3,
    name: "Flavorkkk",
    status: IconTypes.ONLINE_OUTLINED,
  },
  {
    id: 4,
    name: "Onndy",
    status: IconTypes.OFFLINE_OUTLINED,
  },
];

const FriendList = () => {
  return friendMockList.map((friend) => (
    <div
      key={friend.id}
      className="flex items-center bg-gray-300 justify-between space-x-5 p-2 rounded-lg"
    >
      <UserBadge
        picture="https://github.com/shadcn.png"
        username={friend.name}
      />
      <span>
        <Icon type={friend.status} />
      </span>
    </div>
  ));
};

export default FriendList;
