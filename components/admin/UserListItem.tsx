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
	setSignup?: (signup: boolean) => void;
}

const UserListItem = ({ userId, setSignup }: Props) => {
	const { t } = useTranslation();
	const [details, setDetails] = React.useState(false);

	const currentUser = useStoreMap(StoreAdmin.store, (store) => store.users).find(
		(user) => user.id === userId,
	);
	const token = useStoreMap(StoreUser.store, (store) => store.token);

	const [canBorrow, setCanBorrow] = React.useState(currentUser.canBorrow);
	const [isAdmin, setIsAdmin] = React.useState(currentUser.role === Role.admin);

	const returnAllBooks = (userId: number): boolean => {
		// return all books
		currentUser.books.forEach((book) => {
			api.books
				?.booksControllerReturn(book.id, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					Logger.info('return book user ', currentUser.books);
				})
				.catch((error) => {
					Logger.warn('Error return book: ', error);
				});
		});
		if (currentUser.books.length === 0) {
			return true;
		}
	};

	const deleteUser = (userId) => {
		// return all books of the user
		// alert that all books will be returned
		if (currentUser.books.length > 0) {
			return renderAlert(
				t('user:deleteAccount'),
				t('user:deleteAccountAndBooksInfo'),
				t('user:cancel'),
				{
					text: t('user:deleteAccountAndBooks'),
					onPress: () => {
						if (returnAllBooks(userId)) {
							// delete user
							api.admin?.adminControllerDeleteUser(userId, {
								headers: { Authorization: `Bearer ${token}` },
							});
							StoreAdmin.actions.deleteUser(userId);
						} else {
							renderAlert(
								t('user:deleteAccount'),
								t('user:deleteAccountAndBooksError'),
								t('user:cancel'),
							);
						}
					},
				},
			);
		}

		// alert to ask if delete
		return renderAlert(t('user:deleteAccount'), t('user:deleteAccountConfirm'), t('user:cancel'), {
			text: t('user:delete'),
			onPress: () => {
				api.admin?.adminControllerDeleteUser(userId, {
					headers: { Authorization: `Bearer ${token}` },
				});
				StoreAdmin.actions.deleteUser(userId);
			},
		});
	};

	const updateCanBorrow = (canBorrow: boolean) => {
		api.admin
			?.adminControllerUpdateUser(
				currentUser.id,
				{
					canBorrow: canBorrow,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
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
				currentUser.id,
				{
					role: isAdmin ? Role.admin : Role.customer,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
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
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				setDetails(!details);
				setSignup(false);
			}}
		>
			<ContainerZone>
				<ViewListItem>
					<ViewSide>
						<TextBold>{currentUser.firstName + ' ' + currentUser.lastName}</TextBold>
						<TextContent>{currentUser.email}</TextContent>
						<TextContent>
							{t('dates:month-year-long', { val: new Date(currentUser.createdAt) })}
						</TextContent>
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

								<UpdateUser userId={userId} userProp={currentUser} admin />
							</>
						)}
					</ViewSide>
					<ViewAbsolute>
						<Button
							iconName={IconNames.x}
							onPress={() => {
								deleteUser(currentUser.id);
							}}
						/>
					</ViewAbsolute>
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
const ViewAbsolute = styled(View)`
	position: absolute;
	right: 0;
	top: 0;
`;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
