import YandexOutlined from "@shared/assets/social/yandex.svg";
import GoogleOutlined from "@shared/assets/social/google.svg";
import OnlineOutlined from "@shared/assets/icons/online.svg";
import OfflineOutlined from "@shared/assets/icons/offline.svg";
import SleepOutlined from "@shared/assets/icons/sleep.svg";

export const enum IconTypes {
  YANDEX_OUTLINED,
  GOOGLE_OUTLINED,
  ONLINE_OUTLINED,
  OFFLINE_OUTLINED,
  SLEEP_OUTLINED,
}

export type IconDictionaryType = {
  [key in IconTypes]: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

export const IconDictionary: IconDictionaryType = {
  [IconTypes.YANDEX_OUTLINED]: YandexOutlined,
  [IconTypes.GOOGLE_OUTLINED]: GoogleOutlined,
  [IconTypes.ONLINE_OUTLINED]: OnlineOutlined,
  [IconTypes.OFFLINE_OUTLINED]: OfflineOutlined,
  [IconTypes.SLEEP_OUTLINED]: SleepOutlined,
};
export const enum IconSizes {
  SMALL,
  MEDIUM,
  LARGE,
}

interface IconSize {
  width: number;
  stroke: number;
}

export const IconSizeValues: Record<IconSizes, IconSize> = {
  [IconSizes.SMALL]: {
    width: 16,
    stroke: 1,
  },
  [IconSizes.MEDIUM]: {
    width: 24,
    stroke: 1.5,
  },
  [IconSizes.LARGE]: {
    width: 36,
    stroke: 2.25,
  },
};

export interface IconSizeWithHeight extends IconSize {
  height?: number;
}

export interface IResponsiveSizes {
  base?: IconSizeWithHeight;
  md?: IconSizeWithHeight;
  lg?: IconSizeWithHeight;
  xl?: IconSizeWithHeight;
  xxl?: IconSizeWithHeight;
}

export const enum IconRotation {
  DEG_0,
  DEG_45,
  DEG_90,
  DEG_180,
  DEG_270,
}

export const IconRotationClasses: Record<IconRotation, string> = {
  [IconRotation.DEG_0]: "rotate-0",
  [IconRotation.DEG_45]: "rotate-45",
  [IconRotation.DEG_90]: "rotate-90",
  [IconRotation.DEG_180]: "rotate-180",
  [IconRotation.DEG_270]: "rotate-270",
};
