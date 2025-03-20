import menu from "assets/icons/menu.svg";
import mapPin from "assets/icons/map-pin.svg";
import user from "assets/icons/user.svg";
import search from "assets/icons/search.svg";

const Icons = {
  menu: menu,
  "map-pin": mapPin,
  user: user,
  search: search,
  none: () => null,
};
export type iconType = keyof typeof Icons;

interface IconProps {
  iconName?: iconType;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const Icon = ({
  iconName = "none",
  width = 30,
  height = 30,
  stroke = "black",
  strokeWidth = 2,
}: IconProps) => {
  return Icons[iconName]({ width, height, stroke, strokeWidth });
};
export default Icon;
