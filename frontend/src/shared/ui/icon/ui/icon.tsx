import { FC, memo } from "react";
import {
  IconDictionary,
  IconRotation,
  IconRotationClasses,
  IconTypes,
  IResponsiveSizes,
} from "../lib";

export interface IconProps {
  type: IconTypes;
  rotate?: IconRotation;
  size?: IResponsiveSizes;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export const Icon: FC<IconProps> = ({
  type,
  className,
  rotate,
  size,
  onClick = () => {},
  ariaLabel = "icon",
}) => {
  const SvgIcon = IconDictionary[type];
  const MemoizedSvgIcon = memo(SvgIcon);
  return (
    <MemoizedSvgIcon
      onClick={onClick}
      className={`text-current ${size} ${className} ${rotate ? IconRotationClasses[rotate] : ""} ${
        rotate ? "transition-transform duration-300" : ""
      }`}
      strokeWidth="currentStroke"
      role="img"
      aria-label={ariaLabel}
    />
  );
};
