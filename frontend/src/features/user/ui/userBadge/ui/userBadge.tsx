import { AvatarFallback, Avatar, AvatarImage } from "@/shared/ui";
import { FC } from "react";

interface IUserBadge {
  picture: string;
  username: string;
}
const UserBadge: FC<IUserBadge> = ({ picture, username }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={picture} alt="@shadcn" className="cursor-pointer" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h2 className="text-sm">{username}</h2>
    </div>
  );
};

export default UserBadge;
