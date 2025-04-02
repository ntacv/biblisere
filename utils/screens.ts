import Catalog from 'components/catalog/Catalog';
import Homepage from 'components/homepage/Homepage';
import User from 'components/user/User';

import RouteNames from 'utils/routes';

export const screens = {
	[RouteNames.Homepage]: {
		name: RouteNames.Homepage,
		component: Homepage,
		options: {
			title: 'home:title',
		},
	},
	[RouteNames.Catalog]: {
		name: RouteNames.Catalog,
		component: Catalog,
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

export const routesArray = Object.values(screens);

export type screensType = typeof screens;
