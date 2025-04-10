import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import BouncyCheckbox from 'react-native-bouncy-checkbox/';
import StoreAdmin from 'stores/admin';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import Button from 'components/button/Button';
import renderAlert from 'components/utils/renderAlert';

import useNav from 'utils/navigation';

const api = new Api();

export interface Props {
	userId: number;
}

const UserListItem = ({ userId }: Props) => {
	const { t } = useTranslation();
	const navigation = useNav();
	const [details, setDetails] = React.useState(true);

	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = StoreAdmin.store.getState().users.find((user) => user.id === userId);

	const deleteUser = (userId) => {
		// return all books of the user
		// alert that all books will be returned
		if (StoreAdmin.store.getState().users.find((user) => user.id === userId).books.length > 0) {
			return renderAlert(t('user:deleteAccount'), t('user:deleteAccountError'), t('user:cancel'));
		}

		// alert to ask if delete
		return renderAlert(t('user:deleteAccount'), t('user:deleteAccountConfirm'), t('user:cancel'), {
			text: t('user:delete'),
			onPress: () => {
				api.admin?.adminControllerDeleteUser(userId, {
					headers: { Authorization: `Bearer ${storeUser.token}` },
				});
				StoreAdmin.actions.deleteUser(userId);
			},
		});
	};

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={() => setDetails(!details)}>
			<ContainerZone>
				<ViewListItem>
					<ViewSide>
						<TextBold>{user.firstName + ' ' + user.lastName}</TextBold>
						<TextContent>{user.email}</TextContent>
						<TextContent>
							{t('dates:month-year-long', { val: new Date(user.createdAt) })}
						</TextContent>
						{details && (
							<ViewRow>
								<BouncyCheckbox
									size={20}
									fillColor={colors.primary}
									unFillColor={colors.secondary}
									innerIconStyle={{ borderWidth: 2 }}
									text={t('admin:canBorrow')}
									onPress={(isChecked: boolean) => {
										console.log(isChecked);
									}}
									style={{ flex: 1, padding: 5 }}
									textStyle={{ textDecorationLine: 'none', color: colors.content }}
								/>

								<BouncyCheckbox
									text={t('admin:isAdmin')}
									size={20}
									fillColor={colors.primary}
									unFillColor={colors.secondary}
									innerIconStyle={{ borderWidth: 2 }}
									onPress={(isChecked: boolean) => {
										console.log(isChecked);
									}}
									style={{ flex: 1, padding: 10 }}
									textStyle={{ textDecorationLine: 'none', color: colors.content }}
								/>
							</ViewRow>
						)}
					</ViewSide>
					<View>
						<Button
							iconName={IconNames.x}
							onPress={() => {
								deleteUser(user.id);
							}}
						/>
					</View>
				</ViewListItem>
			</ContainerZone>
		</TouchableOpacity>
	);
};
export default UserListItem;

const ViewListItem = styled(View)`
	flex-direction: row;
	padding-left: ${sizes.padding.main}px;
`;
const ViewSide = styled(View)`
	flex: 1;
`;
const ViewRow = styled(View)`
	flex-direction: row;
	gap: ${sizes.padding.main}px;
`;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
