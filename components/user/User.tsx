import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUsers from 'stores/user';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';

import useNav from 'utils/navigation';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const userLogged = useStoreMap(StoreUsers.store, (store) => store);

	return (
		<ViewPage header>
			{!userLogged && <Login />}

			<UserStorePrint></UserStorePrint>
		</ViewPage>
	);
};
export default UserPage;
