import menu from "assets/icons/menu.svg";
import mapPin from "assets/icons/map-pin.svg";
import user from "assets/icons/user.svg";
import search from "assets/icons/search.svg";
import book from "assets/icons/book.svg";
import arrowRight from "assets/icons/arrow-right.svg";
import arrowDown from "assets/icons/arrow-down.svg";

const IconSvgs = {
  menu: menu,
  mapPin: mapPin,
  user: user,
  search: search,
  book: book,
  arrowRight: arrowRight,
  arrowDown: arrowDown,
};
export type iconType = keyof typeof IconSvgs;

interface IconProps {
  iconName: iconType;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const Icon = ({
  iconName = "user",
  width = 30,
  height = 30,
  stroke = "black",
  strokeWidth = 2,
}: IconProps) => {
  return IconSvgs[iconName]({ width, height, stroke, strokeWidth });
};
export default Icon;
