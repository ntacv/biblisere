import arrowDown from 'assets/icons/arrow-down.svg';
import arrowLeft from 'assets/icons/arrow-left.svg';
import arrowRight from 'assets/icons/arrow-right.svg';
import arrowUp from 'assets/icons/arrow-up.svg';
import book from 'assets/icons/book.svg';
import bookmark from 'assets/icons/bookmark.svg';
import editLine from 'assets/icons/edit-line.svg';
import edit from 'assets/icons/edit.svg';
import info from 'assets/icons/info.svg';
import mapPin from 'assets/icons/map-pin.svg';
import menu from 'assets/icons/menu.svg';
import search from 'assets/icons/search.svg';
import userCheck from 'assets/icons/user-check.svg';
import userX from 'assets/icons/user-x.svg';
import user from 'assets/icons/user.svg';
import x from 'assets/icons/x.svg';

export enum IconNames {
	arrowDown = 'arrowDown',
	arrowLeft = 'arrowLeft',
	arrowRight = 'arrowRight',
	arrowUp = 'arrowUp',
	book = 'book',
	bookmark = 'bookmark',
	edit = 'edit',
	editLine = 'editLine',
	info = 'info',
	mapPin = 'mapPin',
	menu = 'menu',
	search = 'search',
	user = 'user',
	userCheck = 'userCheck',
	userX = 'userX',
	x = 'x',
}

const IconSvgs = {
	arrowDown: arrowDown,
	arrowLeft: arrowLeft,
	arrowRight: arrowRight,
	arrowUp: arrowUp,
	book: book,
	bookmark: bookmark,
	edit: edit,
	editLine: editLine,
	info: info,
	mapPin: mapPin,
	menu: menu,
	search: search,
	user: user,
	userCheck: userCheck,
	userX: userX,
	x: x,
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
	iconName = 'user',
	width = 30,
	height = 30,
	stroke = 'black',
	strokeWidth = 2,
}: IconProps) => {
	return IconSvgs[iconName]({ width, height, stroke, strokeWidth });
};
export default Icon;
