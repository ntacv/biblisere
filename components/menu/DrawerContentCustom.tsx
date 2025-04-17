import { View } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ChooseLanguage from 'localization/ChooseLanguage';
import styled from 'styled-components/native';
import { sizes } from 'styles/Variables';

import useNav from 'utils/navigation';

const DrawerContentCustom = (props) => {
	const navigation = useNav();

	return (
		<DrawerContentScrollView {...props}>
			<ViewDrawer>
				<DrawerItemList {...props} drawerItemStyle={{ borderRadius: sizes.radius.in }} />
				<ChooseLanguage />
			</ViewDrawer>
		</DrawerContentScrollView>
	);
};
export default DrawerContentCustom;

const ViewDrawer = styled(View)`
	gap: ${sizes.padding.main}px;
`;
