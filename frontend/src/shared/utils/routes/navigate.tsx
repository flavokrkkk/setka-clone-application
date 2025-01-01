import { INavigate } from "@/shared/types/navigatePath";
import {
  FileText,
  Users,
  MessageCircleMore,
  UserPen,
  UserRoundCog,
} from "lucide-react";
import { ERouteNames } from "./path";
export const pathNavigate: Array<INavigate> = [
  {
    id: 2,
    title: "Профиль",
    path: ERouteNames.PROFILE,
    icon: <UserPen className="h-4 w-5" />,
  },
  {
    id: 3,
    title: "Лента",
    path: ERouteNames.DASHBOARD,
    icon: <FileText className="h-4 w-5" />,
  },
  {
    id: 4,
    title: "Мессенджер",
    path: ERouteNames.MESSANGER,
    icon: <MessageCircleMore className="h-4 w-5" />,
  },
  {
    id: 5,
    title: "Сообщества",
    path: ERouteNames.COMMUNITIES,
    icon: <Users className="h-4 w-5" />,
  },
  {
    id: 6,
    title: "Настройки",
    path: ERouteNames.SETTINGS,
    icon: <UserRoundCog className="h-4 w-5" />,
  },
];
