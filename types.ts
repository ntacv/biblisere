import CatalogNavigator from 'components/catalog/CatalogNavigator';
import Homepage from 'components/homepage/Homepage';
import User from 'components/user/User';

export enum RouteNames {
	Homepage = 'Homepage',
	Catalog = 'Catalog',
	User = 'User',
	Admin = 'Admin',
	Details = 'Details',
}

export const routes = {
	[RouteNames.Homepage]: {
		name: RouteNames.Homepage,
		component: Homepage,
		options: {
			title: 'home:title',
		},
	},
	[RouteNames.Catalog]: {
		name: RouteNames.Catalog,
		component: CatalogNavigator,
		options: {
			title: 'catalog:title',
		},
	},
	[RouteNames.User]: {
		name: RouteNames.User,
		component: User,
		options: {
			title: 'user:title',
		},
	},
	[RouteNames.Admin]: {
		name: RouteNames.Admin,
		component: User,
		options: {
			title: 'admin:title',
		},
	},
} as const;

export const routesArray = Object.values(routes);

export type routesType = typeof routes;

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
