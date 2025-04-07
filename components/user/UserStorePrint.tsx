import React from 'react';
import { Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUsers from 'stores/user';

const UserStorePrint = () => {
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUsers.store, (store) => store);

	return (
		<View>
			<Text>
				{/* TEST COMPONENT to check login and user data */}
				{t('menu:login') +
					t('config:text:colon') +
					(storeUser.id?.email ? storeUser.id?.email : t('errors:notConnected'))}
			</Text>
			<Text>
				{storeUser.id?.firstName} {storeUser.id?.lastName}
			</Text>

			{!storeUser.id?.canBorrow ? (
				<Text>{t('user:cantBorrow')}</Text>
			) : (
				<>
					<Text>{t('user:borrowed', { val: storeUser.id?.books.length.toString() })}</Text>
					<Text>{t('catalog:books') + t('config:text:colon')}</Text>
					<View>
						{storeUser.id?.books?.map((book) => (
							<Text key={book.id}>
								{book.title} - {book.author}
							</Text>
						))}
					</View>
				</>
			)}
		</View>
	);
};
export default UserStorePrint;
