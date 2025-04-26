import { IconNames } from 'assets/icons/Icons';

import AdminPage from 'components/admin/AdminPage';
import BookDetails from 'components/book/BookDetails';
import Catalog from 'components/catalog/Catalog';
import CatalogNavigator from 'components/catalog/CatalogNavigator';
import Homepage from 'components/homepage/Homepage';
import User from 'components/user/User';

import RouteNames from 'utils/routes';

export const screens = {
	[RouteNames.Homepage]: {
		name: RouteNames.Homepage,
		component: Homepage,
		options: {
			title: 'home:title',
			icon: IconNames.menu, //house
		},
	},
	[RouteNames.CatalogNavigator]: {
		name: RouteNames.CatalogNavigator,
		component: CatalogNavigator,
		options: {
			title: 'catalog:title',
			icon: IconNames.book,
		},
	},
	[RouteNames.User]: {
		name: RouteNames.User,
		component: User,
		options: {
			title: 'user:title',
			icon: IconNames.user,
		},
	},
	[RouteNames.Admin]: {
		name: RouteNames.Admin,
		component: AdminPage,
		options: {
			title: 'admin:title',
			icon: IconNames.userCheck, //lock
		},
	},
} as const;

export const routesArray = Object.values(screens);
export type screensType = typeof screens;

export const routesCatalog = {
	[RouteNames.Catalog]: {
		name: RouteNames.Catalog,
		component: Catalog,
		options: {
			title: 'catalog:title',
		},
	},
	[RouteNames.Details]: {
		name: RouteNames.Details,
		component: BookDetails,
		options: {
			title: 'details:title',
		},
	},
} as const;

export const routesCatalogArray = Object.values(routesCatalog);
export type routesCatalogType = typeof routesCatalog;

export type ApiSchedules = {
	id: number;
	title: string; //"Monday";
	dayNumber: number; //1-7
	closingTime: {
		hours: number;
		minutes: number;
	};
	openingTime: {
		hours: number;
		minutes: number;
	};
	createdAt: string; //ISO8601
	updatedAt: string;
};
