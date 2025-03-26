import { View } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ChooseLanguage from 'localization/ChooseLanguage';

const DrawerContentCustom = (props) => {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<ChooseLanguage />
		</DrawerContentScrollView>
	);
};
export default DrawerContentCustom;
