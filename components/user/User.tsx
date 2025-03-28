import { Text, TouchableOpacity } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import ViewPage from 'components/ViewPage';

import { useNav } from 'utils/navigation';

const User = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	return (
		<ViewPage header={true}>
			<Text>{t('user:title')}</Text>
			<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
				<Text>{t('menu:title')}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={navigation.goBack}>
				<Text>{t('homepage:title')}</Text>
			</TouchableOpacity>
		</ViewPage>
	);
};
export default User;
