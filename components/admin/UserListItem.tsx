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

import { Api, Role, userStore } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import Button from 'components/button/Button';
import UpdateUser from 'components/user/UpdateUser';
import renderAlert from 'components/utils/renderAlert';

import Logger from 'utils/Logger';

const api = new Api();

export interface Props {
	userId: number;
}

const UserListItem = ({ userId }: Props) => {
	const { t } = useTranslation();
	const [details, setDetails] = React.useState(true);

	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = StoreAdmin.store.getState().users.find((user) => user.id === userId);

	const [canBorrow, setCanBorrow] = React.useState(user.canBorrow);
	const [isAdmin, setIsAdmin] = React.useState(user.role === Role.admin);

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

	const updateCanBorrow = (canBorrow: boolean) => {
		api.admin
			?.adminControllerUpdateUser(
				user.id,
				{
					canBorrow: canBorrow,
				},
				{
					headers: { Authorization: `Bearer ${storeUser.token}` },
				},
			)
			.then((response) => {
				Logger.info('update response ', response.data);
				userStore.update();
			})
			.catch((error) => {
				Logger.warn('Error update: ', error);
				if (error.status === 401) {
					alert(t('login:wrongLogin'));
				} else {
					alert(t('login:serverError'));
				}
			});
	};

	const updateAdminRights = (isAdmin: boolean) => {
		return api.admin
			?.adminControllerUpdateUser(
				user.id,
				{
					role: isAdmin ? Role.admin : Role.customer,
				},
				{
					headers: { Authorization: `Bearer ${storeUser.token}` },
				},
			)
			.then((response) => {
				Logger.info('update response ', response.data);
				userStore.update();
			})
			.catch((error) => {
				Logger.warn('Error update: ', error);
				if (error.status === 401) {
					alert(t('login:wrongLogin'));
				} else {
					alert(t('login:serverError'));
				}
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
						<Text>can {canBorrow ? 'true' : 'false'}</Text>
						{details && (
							<>
								<ViewRow>
									<BouncyCheckbox
										size={20}
										fillColor={colors.primary}
										unFillColor={colors.secondary}
										innerIconStyle={{ borderWidth: 2 }}
										text={t('admin:canBorrow')}
										isChecked={canBorrow}
										onPress={(clicked: boolean) => {
											setCanBorrow(clicked);
											updateCanBorrow(clicked);
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
										isChecked={isAdmin}
										onPress={(isChecked: boolean) => {
											setIsAdmin(isChecked);
											updateAdminRights(isChecked);
										}}
										style={{ flex: 1, padding: 10 }}
										textStyle={{ textDecorationLine: 'none', color: colors.content }}
									/>
								</ViewRow>

								<UpdateUser userId={userId} userProp={user} admin />
							</>
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
