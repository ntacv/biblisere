import { View } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ChooseLanguage from 'localization/ChooseLanguage';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import useNav from 'utils/navigation';

const DrawerContentCustom = (props) => {
	const navigation = useNav();

	return (
		<DrawerContentScrollView {...props}>
			<ViewDrawer>
				<DrawerItemList {...props} drawerItemStyle={{ borderRadius: sizes.radius.in }} />
				<Line></Line>
				<ChooseLanguage />
			</ViewDrawer>
		</DrawerContentScrollView>
	);
};
export default DrawerContentCustom;

const ViewDrawer = styled(View)`
	gap: ${sizes.padding.main}px;
`;

const Line = styled(View)`
	border: 1px solid ${colors.locked};
	width: 100%;
	margin: ${sizes.padding.main}px 0;
`;
